---
title: "Airqoon Base Map Consumer"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["github/airqoon-base-map-consumer.md"]
---

# Airqoon Base Map Consumer

**Repository:** `airqoon-base-map-consumer`
**Source File:** `github/airqoon-base-map-consumer.md`

## Description
A Node.js backend service for consuming, processing, and synchronizing air quality and weather telemetry data from distributed IoT devices. It integrates with AWS SQS, RabbitMQ, MongoDB, and external services such as ThingsBoard and Airqoon Weather Service to aggregate, compute, and publish air quality metrics.

## Role in Architecture

**Layer:** Backend Microservices (K8s)

Data consumer and processor for the Airqoon Map platform. Ingests telemetry from AWS SQS and RabbitMQ, processes and aggregates data, computes AQI metrics (EPA/CAQI), enriches with weather data, and syncs to MongoDB. Also runs MODIS fire data collection from NASA FIRMS API.

## Tech Stack

Node.js, TypeScript, Prisma ORM, AWS SQS, RabbitMQ, MongoDB, Docker

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon-map|Airqoon Map]]
- [[wiki/entities/airqoon|Airqoon]]
