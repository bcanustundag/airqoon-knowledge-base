#!/usr/bin/env python3
"""Batch-enhance stub wiki source pages with architecture context and cross-references."""
import os, re

WIKI = "/Users/bcan/code/airqoon-vault/airqoon's knowledge base/wiki/sources"
ARCH_REF = "[[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]"

# Map: filename -> (role, tech, arch_layer, extra_refs)
ENHANCEMENTS = {
    "airqoon-base-map-consumer.md": {
        "role": "Data consumer and processor for the Airqoon Map platform. Ingests telemetry from AWS SQS and RabbitMQ, processes and aggregates data, computes AQI metrics (EPA/CAQI), enriches with weather data, and syncs to MongoDB. Also runs MODIS fire data collection from NASA FIRMS API.",
        "tech": "Node.js, TypeScript, Prisma ORM, AWS SQS, RabbitMQ, MongoDB, Docker",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-map|Airqoon Map]]"],
    },
    "airqoon-base-map-external-api.md": {
        "role": "Core REST API for the Airqoon Map ecosystem. Provides secure, multi-tenant access to air quality and environmental data — device discovery, real-time/historical telemetry, AQI (Malaysia, EEA, Türkiye, US-EPA), weather, tenant/area management. Swagger/OpenAPI auto-docs at `/docs`.",
        "tech": "Fastify, Node.js, TypeScript, Prisma ORM, MongoDB, Zod validation, JWT auth",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-map|Airqoon Map]]"],
    },
    "airqoon-base-map-tile-server.md": {
        "role": "Vector tile server rendering Mapbox Vector Tiles (.pbf) for efficient map rendering. Enables spatial data loading (only visible area), smooth pan/zoom without refetching, and automatic clustering at different zoom levels.",
        "tech": "Node.js, Protocol Buffers, MapLibre GL JS, MongoDB",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-map|Airqoon Map]]"],
    },
    "airqoon-base-map-ui.md": {
        "role": "Frontend web application for Airqoon Map — the public real-time air quality monitoring interface. Provides hyperlocal pollution visualization, citizen complaint collection, wildfire maps, and custom branded maps for organisations.",
        "tech": "React, MapLibre GL JS, TypeScript",
        "layer": "Frontend Applications",
        "refs": ["[[wiki/entities/airqoon-map|Airqoon Map]]"],
    },
    "airqoon-basic-map-api.md": {
        "role": "Fastify-based REST API for map services. Serves station metadata and widget data. Consumed by widget-ui and base-map-ui for AQI snapshots and device listings.",
        "tech": "Fastify, Node.js, MongoDB",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-map|Airqoon Map]]"],
    },
    "airqoon-widget-ui.md": {
        "role": "Lightweight embeddable widget carousel that renders air quality snapshots per device. Consumes the Basic Map API v2 widgets aggregate endpoint with AQI scheme selection. Designed for embedding on 3rd-party websites.",
        "tech": "React, TypeScript",
        "layer": "Frontend Applications",
        "refs": ["[[wiki/entities/airqoon-map|Airqoon Map]]"],
    },
    "airqoon-data-external-projection.md": {
        "role": "Projects and transforms external station data (e.g., government reference stations) into Airqoon's internal data format for display on the map platform alongside Airqoon's own sensors.",
        "tech": "Node.js, TypeScript, Prisma ORM",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-map|Airqoon Map]]"],
    },
    "airqoon-sim-feeder.md": {
        "role": "Manages SIM card provisioning and cellular connectivity lifecycle for field-deployed sensor units (Unit L/M). Handles SIM activation, data plan tracking, and connectivity status monitoring.",
        "tech": "Node.js",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/unit-l|Unit L]]"],
    },
    "airqoon-alarm-worker.md": {
        "role": "Python async service that listens to telemetry and AQI-related streams from RabbitMQ, evaluates alarm configurations stored in PostgreSQL, creates alarm instances when conditions are triggered, and sends notifications.",
        "tech": "Python, asyncio, RabbitMQ, PostgreSQL",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-lens|Airqoon Lens]]"],
    },
    "airqoon-autoreporter.md": {
        "role": "CLI tool and API for generating multi-tenant air quality reports. Supports monthly, weekly, and single-page reports in Turkish/English Markdown. AI-powered insights via Anthropic Claude. Uploads to S3 and Notion. Scheduled via cron with email notifications (SMTP).",
        "tech": "Python, PostgreSQL, MongoDB, AWS S3, Anthropic Claude API, SMTP, Notion API",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-lens|Airqoon Lens]]"],
    },
    "airqoon-aqi-calculator.md": {
        "role": "Python service for calculating Air Quality Index (AQI) values from environmental monitoring data. Processes telemetry, calculates hourly and rolling averages, and computes AQI using multiple international standards (US EPA, EU CAQI, Turkish national).",
        "tech": "Python, PostgreSQL",
        "layer": "Backend Microservices / ThingsBoard Rule Chain",
        "refs": [],
    },
    "lens-api.md": {
        "role": "Environmental intelligence platform API backend for Airqoon Lens. Provides endpoints for managing markdown reports, device mapping, device comparison, zone management, alarm configuration, data export, and AI-powered analysis features.",
        "tech": "Fastify, Node.js, TypeScript, PostgreSQL, Prisma ORM, RabbitMQ, Puppeteer",
        "layer": "Backend Microservices (K8s)",
        "refs": ["[[wiki/entities/airqoon-lens|Airqoon Lens]]"],
    },
    "lens-ui.md": {
        "role": "Enterprise analytics dashboard frontend for Airqoon Lens. Provides real-time monitoring, historical analysis, alarm management, report generation, device comparison, interactive maps, and AI-powered environmental insights.",
        "tech": "React, TypeScript, MapLibre GL JS, Chart.js",
        "layer": "Frontend Applications",
        "refs": ["[[wiki/entities/airqoon-lens|Airqoon Lens]]"],
    },
    "acme_aq_simulator.md": {
        "role": "Simulates a network of environmental monitoring devices sending realistic telemetry data to ThingsBoard via MQTT. Generates 15+ environmental parameters including air quality, weather, noise, and battery data with location-based adjustments and realistic time-based oscillations.",
        "tech": "Python, MQTT, ThingsBoard",
        "layer": "Internal Tooling",
        "refs": [],
    },
    "AirqoonCalibrationToolBackend.md": {
        "role": "Qoonify — web-based calibration and evaluation tool backend. Integrates with Istanbul Metropolitan Municipality (IBB) air quality monitoring system and ThingsBoard IoT platform for Airqoon sensor data comparison and calibration.",
        "tech": "Python, ThingsBoard API, IBB API",
        "layer": "Internal Tooling",
        "refs": [],
    },
    "cal-app.md": {
        "role": "Streamlit-based calibration application for sensor data analysis and calibration parameter tuning. Provides interactive visualization of sensor vs reference data.",
        "tech": "Python, Streamlit",
        "layer": "Internal Tooling",
        "refs": [],
    },
    "LCF.md": {
        "role": "High-performance, multi-task ESP32 application for reading analog data from dual ADS7828 12-bit ADCs and environmental data from BME280 sensor. Transmits to both local UART and cloud (ThingsBoard) with real-time RGB LED status indication.",
        "tech": "C/C++, ESP-IDF, FreeRTOS, MQTT",
        "layer": "Firmware (ESP32)",
        "refs": ["[[wiki/entities/unit-l|Unit L]]"],
    },
    "LCM.md": {
        "role": "Serial Data Plotter — desktop tool for real-time visualization of serial port data from sensor units during development and debugging. Plots ADC readings, environmental parameters, and firmware diagnostics.",
        "tech": "Python, PyQt/PySide, Serial",
        "layer": "Internal Tooling",
        "refs": [],
    },
    "airqoon-su-fw.md": {
        "role": "Main sensor unit firmware for ESP32-based air quality monitoring devices. Handles sensor reading (electrochemical gas, PM optical, environmental), MQTT telemetry transmission, power management, and OTA updates.",
        "tech": "C/C++, ESP-IDF, FreeRTOS, MQTT/TLS",
        "layer": "Firmware (ESP32)",
        "refs": ["[[wiki/entities/unit-l|Unit L]]"],
    },
    "airqoon-su-local-fw.md": {
        "role": "Local variant of the sensor unit firmware for indoor/development use. Communicates via local network (WiFi) rather than cellular, used for Unit M and development testing.",
        "tech": "C/C++, ESP-IDF, FreeRTOS, MQTT, WiFi",
        "layer": "Firmware (ESP32)",
        "refs": ["[[wiki/entities/unit-l|Unit L]]"],
    },
    "airqoon-ops-engine.md": {
        "role": "Operational management tool for batch and component tracking. Integrates with Notion for managing production runs, component inventory, and quality assurance workflows.",
        "tech": "Node.js, Notion API",
        "layer": "Internal Tooling",
        "refs": [],
    },
    "airqoon-brief.md": {
        "role": "Automated briefing generator that produces daily/weekly summaries of air quality data across tenants. Generates concise briefs for internal stakeholders and customer communication.",
        "tech": "Python, PostgreSQL",
        "layer": "Internal Tooling",
        "refs": [],
    },
    "aq-prov-app.md": {
        "role": "Airqoon Provisioning App — used for initial device provisioning, configuration, and registration of new sensor units before field deployment. Handles device identity, ThingsBoard registration, and initial calibration parameters.",
        "tech": "Node.js / React Native",
        "layer": "Internal Tooling",
        "refs": ["[[wiki/entities/unit-l|Unit L]]"],
    },
}

updated = 0
for filename, info in ENHANCEMENTS.items():
    filepath = os.path.join(WIKI, filename)
    if not os.path.exists(filepath):
        print(f"SKIP (not found): {filename}")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    if "Further synthesis is required" not in content:
        print(f"SKIP (already enhanced): {filename}")
        continue

    # Build new content section
    refs_list = [ARCH_REF] + info.get("refs", [])
    refs_str = "\n".join(f"- {r}" for r in refs_list)

    old_section = "## Content Overview\nThis repository contains the source code for"
    # Find and replace the content overview + related entities section
    # Replace everything from "## Content Overview" to end of file
    new_body = f"""## Role in Architecture

**Layer:** {info['layer']}

{info['role']}

## Tech Stack

{info['tech']}

## Related Entities
{refs_str}
- [[wiki/entities/airqoon|Airqoon]]
"""

    # Replace from "## Content Overview" onwards
    pattern = r'## Content Overview.*'
    new_content = re.sub(pattern, new_body, content, flags=re.DOTALL)

    with open(filepath, 'w') as f:
        f.write(new_content)

    updated += 1
    print(f"UPDATED: {filename}")

print(f"\nDone. Updated {updated} files.")
