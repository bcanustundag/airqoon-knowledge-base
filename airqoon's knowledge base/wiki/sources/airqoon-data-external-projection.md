---
title: "Airqoon Data External Projection"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-data-external-projection.md"]
---

# Airqoon Data External Projection

**Repository:** `airqoon-data-external-projection`
**Source File:** `raw/github_repos/airqoon-data-external-projection.md`

## Description
```bash pnpm install pnpm run prisma:generate ```

## Role in Architecture

**Layer:** Backend Microservices (K8s)

Projects and transforms external station data (e.g., government reference stations) into Airqoon's internal data format for display on the map platform alongside Airqoon's own sensors.

## Tech Stack

Node.js, TypeScript, Prisma ORM

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon-map|Airqoon Map]]
- [[wiki/entities/airqoon|Airqoon]]
