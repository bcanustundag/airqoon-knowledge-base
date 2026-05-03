---
title: "Airqoon Alarm Worker"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-alarm-worker.md"]
---

# Airqoon Alarm Worker

**Repository:** `airqoon-alarm-worker`
**Source File:** `raw/github_repos/airqoon-alarm-worker.md`

## Description
Airqoon Alarm Worker is a Python async service that listens to telemetry and AQI-related streams from RabbitMQ and evaluates alarm configurations stored in Postgres. It creates alarm instances when conditions are triggered and sends notifications.

## Role in Architecture

**Layer:** Backend Microservices (K8s)

Python async service that listens to telemetry and AQI-related streams from RabbitMQ, evaluates alarm configurations stored in PostgreSQL, creates alarm instances when conditions are triggered, and sends notifications.

## Tech Stack

Python, asyncio, RabbitMQ, PostgreSQL

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon-lens|Airqoon Lens]]
- [[wiki/entities/airqoon|Airqoon]]
