---
title: "Airqoon Basic Map API"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-basic-map-api.md"]
---

# Airqoon Basic Map API

**Repository:** `airqoon-basic-map-api`
**Source File:** `raw/github_repos/airqoon-basic-map-api.md`

## Description
Fastify-based REST API for Airqoon's map services with MongoDB backend.

## Role in Architecture

**Layer:** Backend Microservices (K8s)

Fastify-based REST API for map services. Serves station metadata and widget data. Consumed by widget-ui and base-map-ui for AQI snapshots and device listings.

## Tech Stack

Fastify, Node.js, MongoDB

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon-map|Airqoon Map]]
- [[wiki/entities/airqoon|Airqoon]]
