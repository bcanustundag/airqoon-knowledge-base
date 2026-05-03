---
title: "Airqoon Base Map External API"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-base-map-external-api.md"]
---

# Airqoon Base Map External API

**Repository:** `airqoon-base-map-external-api`
**Source File:** `raw/github_repos/airqoon-base-map-external-api.md`

## Description
A high-performance, extensible REST API for accessing, aggregating, and serving air quality and environmental sensor data for the Airqoon platform. This service acts as a backend for map-based and analytical applications, providing device, telemetry, AQI, weather, and tenant-based data with multi-tenant support and robust access control.

## Role in Architecture

**Layer:** Backend Microservices (K8s)

Core REST API for the Airqoon Map ecosystem. Provides secure, multi-tenant access to air quality and environmental data — device discovery, real-time/historical telemetry, AQI (Malaysia, EEA, Türkiye, US-EPA), weather, tenant/area management. Swagger/OpenAPI auto-docs at `/docs`.

## Tech Stack

Fastify, Node.js, TypeScript, Prisma ORM, MongoDB, Zod validation, JWT auth

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon-map|Airqoon Map]]
- [[wiki/entities/airqoon|Airqoon]]
