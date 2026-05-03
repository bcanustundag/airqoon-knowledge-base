---
title: "Airqoon AQI Calculator"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-aqi-calculator.md"]
---

# Airqoon AQI Calculator

**Repository:** `airqoon-aqi-calculator`
**Source File:** `raw/github_repos/airqoon-aqi-calculator.md`

## Description
A Python service for calculating Air Quality Index (AQI) values from environmental monitoring data. The system processes telemetry data from air quality sensors, calculates hourly and rolling averages, and computes AQI values using multiple international standards.

## Role in Architecture

**Layer:** Backend Microservices / ThingsBoard Rule Chain

Python service for calculating Air Quality Index (AQI) values from environmental monitoring data. Processes telemetry, calculates hourly and rolling averages, and computes AQI using multiple international standards (US EPA, EU CAQI, Turkish national).

## Tech Stack

Python, PostgreSQL

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon|Airqoon]]
