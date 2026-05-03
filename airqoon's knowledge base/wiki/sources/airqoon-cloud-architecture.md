---
title: "Source: Airqoon Cloud Architecture Diagram"
type: source
tags: [architecture, cloud, infrastructure, thingsboard, aws, kubernetes, mqtt, microservices]
created: 2026-05-03
updated: 2026-05-03
sources: ["raw/assets/airqoon-cloud-architecture-diagram.png"]
related:
  - "[[wiki/entities/airqoon|Airqoon]]"
  - "[[wiki/entities/airqoon-lens|Airqoon Lens]]"
  - "[[wiki/entities/airqoon-map|Airqoon Map]]"
  - "[[wiki/sources/claude-programming-memory|Programming Memory]]"
---

# Airqoon Cloud Architecture

This document synthesises the full cloud backend architecture from the company's internal architecture diagram, enriched with details from repository documentation and engineering notes.

![Airqoon Cloud Architecture Diagram (original)|697](raw/assets/airqoon-cloud-architecture-diagram.jpg)

---

## Architecture Overview

Airqoon's backend follows a **microservices architecture** deployed on **DigitalOcean Kubernetes** (namespace: `airqoon`), with legacy components running on **ThingsBoard PE** and serverless workloads on **AWS Lambda**. Data flows from IoT sensor units via MQTT into ThingsBoard, then fan out through message queues (RabbitMQ, AWS SQS) to specialised worker services, APIs, and frontends.

```mermaid
graph TB
    subgraph "IoT Edge Layer"
        UL["Unit L / Unit M<br/>(ESP32 + Sensors)"]
    end

    subgraph "IoT Platform — ThingsBoard"
        TB["airqoon-thingsboard<br/>(ThingsBoard PE 2.5.4 → 3.4.3)"]
        TB_TAB["airqoon-tab-tr-thingsboard<br/>(Turkish Tab Dashboard)"]
        RC_EPA["epa-aqi-calculator-rc"]
        RC_CAQI["caqi-calculator-rc"]
        RC_ALARM["alarm-rule-chains"]
        RC_ANALYTICS["analytics-config-rule-chains"]
    end

    subgraph "Databases"
        PG[("PostgreSQL")]
        MONGO[("MongoDB")]
        CASS[("Cassandra<br/>(TB telemetry)")]
    end

    subgraph "Message Brokers"
        RABBIT["RabbitMQ"]
        SQS_2H["SQS: last-2h-concentrations"]
        SQS_EXIT["SQS: cloud-exit-queue"]
        SQS_24H["SQS: 24h-statistics"]
        SQS_NOW["SQS: nowcast-processing"]
    end

    subgraph "AWS Lambda Functions"
        L_HOURLY["hourly-statistics-worker (1H)"]
        L_DAILY["daily-statistics-worker (24H)"]
        L_NOWCAST["nowcast-calculator"]
        L_WEATHER["weather-collector"]
    end

    subgraph "Backend Microservices (K8s)"
        STATS["statistics-worker"]
        SIM["sim-feeder (app)"]
        BMC["base-map-consumer (app)"]
        BMEP["base-map-external-projection (app)"]
        BMEA["base-map-external-api (API)"]
        BMAP_API["basic-map-api (API)"]
        GEO["geo-location-api (API)"]
        WEATHER_API["weather-api (API)"]
        AR_API["auto-reporter-api"]
        AR_APP["auto-reporter (app)"]
        DC["dc-wrapper-api (API Gateway)"]
    end

    subgraph "Frontend Applications"
        BMAP_UI["base-map-ui (Airqoon Map)"]
        WIDGET["widget-ui (Embeddable)"]
        LENS_UI["Lens UI (Enterprise)"]
    end

    UL -->|"MQTT/TLS :8883"| TB
    TB --> CASS
    TB --> RC_EPA & RC_CAQI & RC_ALARM & RC_ANALYTICS
    RC_EPA & RC_CAQI -->|"Rule chain output"| RABBIT
    TB -->|"Telemetry"| RABBIT
    RABBIT --> STATS
    RABBIT -->|"Alarm streams"| AR_APP

    TB -->|"SQS publish"| SQS_2H & SQS_EXIT & SQS_24H & SQS_NOW
    SQS_2H --> L_HOURLY
    SQS_24H --> L_DAILY
    SQS_NOW --> L_NOWCAST
    L_WEATHER -->|"Fetches external meteo"| WEATHER_API

    BMC -->|"Consumes SQS + RabbitMQ"| MONGO
    BMEP -->|"External data projection"| MONGO
    BMEA -->|"REST API"| MONGO
    BMAP_API --> MONGO
    GEO --> PG

    DC -->|"Routes to services"| BMEA & BMAP_API & AR_API
    BMAP_UI --> BMEA & BMAP_API
    WIDGET --> BMAP_API
    LENS_UI -->|"lens-api (Fastify)"| PG

    L_HOURLY & L_DAILY --> PG
    AR_API --> PG
    STATS --> PG
```

---

## Component Inventory

### IoT Platform — ThingsBoard

| Component | Description | Tech |
|-----------|-------------|------|
| **airqoon-thingsboard** | Core IoT platform. Receives MQTT telemetry from all field units, stores in Cassandra, triggers rule chains. | ThingsBoard PE 2.5.4 (prod) → 3.4.3 (migration target) |
| **airqoon-tab-tr-thingsboard** | Legacy Turkish-language ThingsBoard dashboard tab. | ThingsBoard UI extension |
| **Rule Chains** | `epa-aqi-calculator-rc` (US EPA AQI), `caqi-calculator-rc` (EU CAQI), `alarm-rule-chains`, `analytics-config-rule-chains` | ThingsBoard rule engine |

### Databases

| Database | Purpose | Notes |
|----------|---------|-------|
| **PostgreSQL** | Primary relational DB for Lens, statistics, alarms, reports, geo-location | Prisma ORM |
| **MongoDB** | Map platform data — telemetry snapshots, station configs, external stations | Used by base-map-* services |
| **Cassandra** | ThingsBoard time-series telemetry storage (raw sensor data) | Managed by TB internally |

### Message Brokers & Queues

| Broker | Queue | Consumer |
|--------|-------|----------|
| **RabbitMQ** | Telemetry + AQI streams | `statistics-worker`, `alarm-worker`, `auto-reporter` |
| **AWS SQS** | `last-2h-concentrations-queue` | `hourly-statistics-worker` (Lambda) |
| **AWS SQS** | `24h-statistics-queue` | `daily-statistics-worker` (Lambda) |
| **AWS SQS** | `nowcast-processing-queue` | `nowcast-calculator` (Lambda) |
| **AWS SQS** | `cloud-exit-queue` | External data export |

### AWS Lambda Functions

| Function | Purpose | Schedule |
|----------|---------|----------|
| **hourly-statistics-worker (1H)** | Computes hourly averages from raw telemetry | Triggered by SQS |
| **daily-statistics-worker (24H)** | Computes 24-hour rolling averages | Triggered by SQS |
| **nowcast-calculator** | Real-time NowCast AQI calculations | Triggered by SQS |
| **weather-collector** | Fetches external meteorological data from MGM/OpenWeather | Scheduled (cron) |

### Backend Microservices (Kubernetes)

| Service | Role | Tech Stack |
|---------|------|------------|
| **[[wiki/sources/airqoon-base-map-consumer\|base-map-consumer]]** | Consumes SQS + RabbitMQ telemetry, syncs to MongoDB, publishes to external APIs | Node.js |
| **[[wiki/sources/airqoon-data-external-projection\|base-map-external-projection]]** | Projects/transforms external station data into internal format | Node.js, Prisma |
| **[[wiki/sources/airqoon-base-map-external-api\|base-map-external-api]]** | High-performance REST API aggregating sensor data for the map platform | Node.js |
| **[[wiki/sources/airqoon-basic-map-api\|basic-map-api]]** | Fastify REST API for map services (widgets, station metadata) | Fastify, MongoDB |
| **[[wiki/sources/airqoon-sim-feeder\|sim-feeder]]** | Manages SIM card provisioning and connectivity for field units | Node.js |
| **statistics-worker** | Processes RabbitMQ streams, computes derived statistics | Python |
| **[[wiki/sources/airqoon-autoreporter\|auto-reporter (app)]]** | CLI generating multi-tenant air quality PDF/Markdown reports | Python, PostgreSQL, S3 |
| **auto-reporter-api** | HTTP API triggering auto-reporter jobs | Node.js |
| **dc-wrapper-api** | API Gateway — routes external requests to internal services | Node.js |
| **[[wiki/sources/airqoon-alarm-worker\|alarm-worker]]** | Evaluates alarm configurations against telemetry streams | Python, RabbitMQ, PostgreSQL |
| **geo-location-api** | Geocoding and reverse-geocoding for station placement | Node.js, PostgreSQL |
| **weather-api** | Internal API serving meteorological data | Node.js |

### Frontend Applications

| App | Product | Tech Stack |
|-----|---------|------------|
| **[[wiki/sources/airqoon-base-map-ui\|base-map-ui]]** | [[wiki/entities/airqoon-map\|Airqoon Map]] — public real-time air quality map | React, MapLibre GL JS |
| **[[wiki/sources/airqoon-widget-ui\|widget-ui]]** | Embeddable AQI widget carousel for 3rd-party sites | React |
| **[[wiki/sources/lens-ui\|lens-ui]]** | [[wiki/entities/airqoon-lens\|Airqoon Lens]] — enterprise analytics dashboard | React, TypeScript |

### Not Shown in Diagram (but part of ecosystem)

| Component | Role |
|-----------|------|
| **[[wiki/sources/lens-api\|lens-api]]** | Fastify API backend for Lens (reports, device mapping, AI features) |
| **[[wiki/sources/airqoon-aqi-calculator\|aqi-calculator]]** | Python AQI computation service (EPA, CAQI, custom) |
| **[[wiki/sources/airqoon-base-map-tile-server\|tile-server]]** | Vector tile server (.pbf) for map rendering |
| **[[wiki/sources/AirqoonCalibrationToolBackend\|Qoonify]]** | Calibration tool integrating IBB + ThingsBoard |
| **[[wiki/sources/acme_aq_simulator\|acme_aq_simulator]]** | Telemetry simulator for testing |
| **lens-mcp** | Model Context Protocol server for Lens AI |

---

## Data Flow Summary

1. **Ingestion:** Unit L/M → MQTT/TLS → ThingsBoard → Cassandra (raw telemetry)
2. **Processing:** ThingsBoard rule chains calculate AQI (EPA/CAQI), trigger alarms → push to RabbitMQ + SQS
3. **Statistics:** SQS → Lambda workers (hourly, daily, nowcast) → PostgreSQL (aggregated stats)
4. **Map Platform:** base-map-consumer syncs telemetry → MongoDB → base-map-external-api serves to base-map-ui
5. **Lens Platform:** lens-api reads PostgreSQL → lens-ui renders dashboards, reports, AI insights
6. **Reporting:** auto-reporter reads PostgreSQL → generates PDF/Markdown → stores in S3
7. **Alarms:** alarm-worker reads RabbitMQ streams → evaluates rules → creates alarm instances + notifications

---

## Infrastructure Notes

- **Hosting:** DigitalOcean Kubernetes (namespace: `airqoon`), Coolify (self-hosted utilities), Proxmox VE (local)
- **Reverse Proxy:** Traefik (current) / HAProxy (legacy)
- **Storage:** Garage S3 (self-hosted), AWS S3 (reports)
- **Observability:** SigNoz via OpenTelemetry Collector
- **Auth:** Keycloak (under evaluation)
- **CI/CD:** GitHub Actions, Docker, Helm
- **Known Issue:** ThingsBoard 2.5.4PE sends non-spec MQTT headers (flags 0x02 on PUBACK/SUBACK) — migration to 3.4.3 planned via DNS flip on `see.airqoon.com`

---

*See also: [[wiki/entities/airqoon-lens|Airqoon Lens]], [[wiki/entities/airqoon-map|Airqoon Map]], [[wiki/sources/claude-programming-memory|Programming Memory]]*
