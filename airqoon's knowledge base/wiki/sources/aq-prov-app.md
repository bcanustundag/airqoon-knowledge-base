---
title: "Airqoon Provisioning App"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/aq-prov-app.md"]
---

# Airqoon Provisioning App

**Repository:** `aq-prov-app`
**Source File:** `raw/github_repos/aq-prov-app.md`

## Description
Flutter application for provisioning Airqoon ESP32 air quality monitoring devices via SoftAP.

## Role in Architecture

**Layer:** Internal Tooling

Airqoon Provisioning App — used for initial device provisioning, configuration, and registration of new sensor units before field deployment. Handles device identity, ThingsBoard registration, and initial calibration parameters.

## Tech Stack

Node.js / React Native

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/unit-l|Unit L]]
- [[wiki/entities/airqoon|Airqoon]]
