# Airqoon Base Map Consumer

A Node.js backend service for consuming, processing, and synchronizing air quality and weather telemetry data from distributed IoT devices. It integrates with AWS SQS, RabbitMQ, MongoDB, and external services such as ThingsBoard and Airqoon Weather Service to aggregate, compute, and publish air quality metrics.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Core Features](#core-features)
- [Configuration](#configuration)
- [Installation](#installation)
- [Development](#development)
- [Contributing](#contributing)

## Overview

This service acts as a data consumer and processor for the Airqoon platform, handling telemetry from air quality sensors and weather stations. It ingests messages from AWS SQS and RabbitMQ, processes and aggregates the data, computes AQI (Air Quality Index) metrics, and forwards results to downstream consumers and dashboards.

## Architecture

### SQS Message Type Filtering & Event Skipping

- Both **AttributesEvent** and **PostTelemetryEvent** consume messages from the same AWS SQS queue.
- Each event handler processes only the message types relevant to its responsibility:
  - **AttributesEvent**: `POST_ATTRIBUTES_REQUEST`, `ATTRIBUTES_UPDATED`, `ATTRIBUTES_DELETED`
  - **PostTelemetryEvent**: `POST_TELEMETRY_REQUEST`
- If an event handler receives a message of a type it does not handle, it skips and logs the message (e.g., `AttributesEvent skipping message with type: POST_TELEMETRY_REQUEST`).
- Skipped messages are **not lost**; they are processed by the appropriate handler.
- This design prevents duplicate processing and maintains clear separation of concerns between telemetry and attribute handling.

### Tenant Management & Device Association

- The service automatically manages device-tenant associations by checking the ThingsBoard customer ID for each device.
- When a device sends telemetry data, the system verifies if its customer ID matches the expected tenant in the database.
- If a device has been reassigned to a different customer in ThingsBoard, the system automatically updates the device's `TenantSlugName` in the database.
- This ensures data consistency and proper tenant association, especially when devices are transferred between customers.


- **Node.js (TypeScript)**: Main runtime and language.
- **Prisma ORM**: Database access and migrations (MongoDB).
- **AWS SQS**: Receives telemetry data for processing.
- **RabbitMQ**: Handles event-based messaging and synchronization.
- **ThingsBoard Service**: Fetches device metadata and attributes.
- **Airqoon Weather Service**: Retrieves current weather data for devices.
- **Schedulers**: Periodic jobs for data aggregation and weather sync.
- **Dockerized**: Container-ready for production deployments.

### Main Flow
1. **Startup**: Loads configuration, connects to MongoDB, and initializes event listeners.
2. **Telemetry Ingestion**: Consumes messages from SQS and RabbitMQ queues.
3. **Processing**: Aggregates telemetry, calculates AQI using EPA and national standards, and enriches with weather data.
4. **Publishing**: Sends processed results to queues or external services.
5. **Scheduling**: Periodic jobs for weather updates and AQI calculations.

## Core Features
- **Telemetry Data Consumer**: Ingests and processes sensor data from SQS and RabbitMQ.
- **AQI Calculation**: Computes air quality indices using configurable pollutant keys.
- **Weather Data Integration**: Fetches and caches weather data per device.
- **MODIS Fire Data Scheduler**: Automated fire detection data collection from NASA FIRMS API for Turkey (every 3 hours).
- **Device Metadata Enrichment**: Integrates with ThingsBoard for device attributes.
- **Robust Logging**: Structured logging for all operations.
- **Error Handling & Retries**: Retries failed events and dead-letter queue support.
- **Docker Support**: Easily deployable in containerized environments.

## Configuration

Configuration is managed via environment variables. See `.env.development` and `.env.production` for all available options. Key configuration includes:
- `MONGODB_URI`: MongoDB connection string
- `RABBITMQ_URI`: RabbitMQ connection string
- `AWS_SQS_URI`, `AWS_SQS_ACCESS_KEY_ID`, `AWS_SQS_SECRET_ACCESS_KEY`, `AWS_SQS_REGION`: AWS SQS credentials
- `THINGSBOARD_SERVICE_URI`, `THINGSBOARD_SERVICE_AUTH_USERNAME`, `THINGSBOARD_SERVICE_AUTH_PASSWORD`: ThingsBoard API access
- `AIRQOON_WEATHER_SERVICE_URI`, `AIRQOON_WEATHER_SERVICE_AUTH_USERNAME`, `AIRQOON_WEATHER_SERVICE_AUTH_PASSWORD`: Weather service access
- `FIRMS_API_KEY`: NASA FIRMS API key for MODIS fire data collection
- `AQIComputableTelemetryKeys`: Pollutant keys used for AQI calculation

## Installation

**NodeJS version:** 18.16.0 (LTS)

```shell
pnpm install
```

## Development

**Schema model creation:**

```shell
pnpm  run prisma:pull
pnpm run prisma:generate
```

**Schema model update:**

```shell
pnpm run prisma:push
```

**Running the application:**

```shell
# Development
pnpm run start:dev
```

**Docker Compose:**

To run the service in Docker:

```shell
docker-compose up --build
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

© 2025 Airqoon. All rights reserved.
