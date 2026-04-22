# Airqoon Base Map External API

A high-performance, extensible REST API for accessing, aggregating, and serving air quality and environmental sensor data for the Airqoon platform. This service acts as a backend for map-based and analytical applications, providing device, telemetry, AQI, weather, and tenant-based data with multi-tenant support and robust access control.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Overview

**Airqoon Base Map External API** is the core API for the Airqoon ecosystem. It provides secure, multi-tenant access to air quality and environmental data collected from distributed IoT devices. The API is designed for integration with dashboards, analytics tools, and external partners, supporting features such as:
- Device discovery and metadata
- Real-time and historical telemetry (pollutants, weather, AQI)
- Multi-organization AQI standards
- Tenant and area management
- Secure authentication and authorization

## Features
- **Fastify-based**: High-performance Node.js backend using Fastify
- **Prisma ORM**: Robust database access and migrations
- **Multi-tenant**: Segregated data access for organizations/tenants
- **Comprehensive AQI support**: Multiple AQI standards (Malaysia, EEA, Turkiye, US-EPA)
- **Device and area management**: Query by device, area, or tenant
- **Swagger/OpenAPI**: Auto-generated API docs
- **Zod validation**: Type-safe request/response schemas
- **Authentication**: JWT-based login and access control

## API Endpoints (v1)

### Auth
- `POST /v1/auth/login` — Obtain JWT token

### Devices
- `GET /v1/devices` — List all devices (with filters)
- `GET /v1/devices/id/:deviceId` — Get device metadata
- `GET /v1/devices/id/:deviceId/telemetry/latest` — Latest telemetry for device
- `GET /v1/devices/id/:deviceId/telemetry/hourly` — Hourly telemetry (aggregated)
- `GET /v1/devices/id/:deviceId/telemetry/historical` — Historical telemetry (with pagination)
- `GET /v1/devices/id/:deviceId/aqi/latest` — Latest AQI (with organization filter)
- `GET /v1/devices/id/:deviceId/aqi/historical` — Historical AQI (with date range, pagination, organization)
- `GET /v1/devices/id/:deviceId/weather/current` — Current weather for device

### Tenants
- `GET /v1/tenants/slug/:tenantSlugName/devices` — Devices for a tenant
- `GET /v1/tenants/slug/:tenantSlugName/areas` — Areas for a tenant

> See `/src/routes/v1/` and [TODO.md](TODO.md) for planned and implemented endpoints.

## Architecture
- **Entry Point**: `src/application.ts` initializes environment, DB, services, and web server
- **Web Server**: `src/webServer.ts` configures Fastify, plugins, routes, and OpenAPI docs
- **Routing**: `/src/routes/v1/` for versioned API endpoints (`devices`, `tenants`, `auth`)
- **Controllers**: `/src/controllers/v1/` handle business logic
- **Domain/Services**: `/src/domain/services/` encapsulate core logic and data access
- **Prisma ORM**: `/prisma/` for schema and migrations
- **Validation**: Zod schemas for all DTOs and queries

## Installation

```shell
pnpm install
pnpm run prisma:generate
```

## Usage

### Start in Development
```shell
pnpm run start:dev
```

### Build for Production
```shell
pnpm run build
```

### Run Tests
```shell
pnpm run test:vitest
```

## Environment Variables
- Configure `.env.development` and other `.env.*` files for DB, JWT, and other secrets.
- See `src/config.ts` and `src/application.ts` for usage.

## Documentation
- Swagger UI is available at `/docs` when running the server.
- DTOs and response types are defined with Zod in `src/routes/v1/*/*.dtos.ts`.

## License
Proprietary — (c) Airqoon. All rights reserved.

---

## Contributing
For internal Airqoon development. For issues or feature requests, contact the Airqoon development team.
