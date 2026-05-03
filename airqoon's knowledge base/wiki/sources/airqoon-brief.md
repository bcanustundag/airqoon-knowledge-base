---
title: "Airqoon Brief"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["github/airqoon-brief.md"]
---

# Airqoon Brief

**Repository:** `airqoon-brief`
**Source File:** `github/airqoon-brief.md`

## Description
Weekly air quality intelligence for Turkey's 81 provinces. Aggregates data from ~380 government monitoring stations and Airqoon's public sensor network, then generates ranked province reports, trend analysis, anomaly detection, and interactive choropleth maps.

## Role in Architecture

**Layer:** Internal Tooling

Automated briefing generator that produces daily/weekly summaries of air quality data across tenants. Generates concise briefs for internal stakeholders and customer communication.

## Tech Stack

Python, PostgreSQL

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon|Airqoon]]
