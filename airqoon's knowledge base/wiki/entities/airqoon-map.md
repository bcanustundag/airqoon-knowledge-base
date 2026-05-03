---
title: "Airqoon Map"
type: entity
entity_type: product
tags: [airqoon, software, public, map, aqi]
created: 2026-04-29
updated: 2026-04-29
sources: [airqoon-base-map-ui.md, airqoon-base-map-consumer.md]
---

# Airqoon Map

> Airqoon's public-facing environmental data visualization application. Designed for municipalities and enterprise clients to provide hyperlocal, transparent air pollution management and citizen engagement.

---

## Architecture & Tech Stack

> Full architecture: [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]

| Layer | Service | Role |
|-------|---------|------|
| **Frontend** | [[wiki/sources/airqoon-base-map-ui|base-map-ui]] | React + Vite + Leaflet/MapLibre — public map interface |
| **API** | [[wiki/sources/airqoon-base-map-external-api|base-map-external-api]] | Fastify REST API — devices, telemetry, AQI, tenants |
| **API** | [[wiki/sources/airqoon-basic-map-api|basic-map-api]] | Fastify REST API — station metadata, widget data |
| **Backend** | [[wiki/sources/airqoon-base-map-consumer|base-map-consumer]] | Data consumer — SQS/RabbitMQ → MongoDB, AQI calc, weather sync, MODIS fire data |
| **Backend** | [[wiki/sources/airqoon-data-external-projection|data-external-projection]] | Transforms external (gov) station data into internal format |
| **Backend** | [[wiki/sources/airqoon-base-map-tile-server|base-map-tile-server]] | Vector tile server (.pbf) for efficient spatial rendering |
| **Embeddable** | [[wiki/sources/airqoon-widget-ui|widget-ui]] | Lightweight AQI widget carousel for 3rd-party sites |
| **Database** | MongoDB | Telemetry snapshots, station configs, external stations |

---

## Core Features

### Air Quality & Data Visualization
- **Multi-Standard AQI:** Supports dynamic recalculation and visualization according to EEA, US-EPA, US-EPA-Nowcast, and Turkiye standards.
- **Heat Maps:** Advanced IDW (Inverse Distance Weighting) spatial interpolation for both pollution distribution and temperature mapping.
- **Smart Fire Detection:** Integrates satellite fire detection data refreshed every 24 hours. Sorts fires by confidence level (displaying the top 100 highest-quality fires).
- **Device Markers:** Real-time device locations with color-coded quality indicators matching international standards. Detailed fly-out views for specific monitoring stations.

### User Experience & Engagement
- **Multi-language:** Full support for English and Turkish via `i18next`.
- **Citizen Feedback:** Includes a location-based air quality issue reporting system, empowering citizens to log complaints directly on the map.
- **Customization:** Light, Dark, and System theme selections, along with unit preferences and accessible, mobile-responsive design.

---

*See also: [[Airqoon]], [[wiki/entities/airqoon-lens|Airqoon Lens]], [[wiki/entities/unit-l|Unit L]], [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]*
