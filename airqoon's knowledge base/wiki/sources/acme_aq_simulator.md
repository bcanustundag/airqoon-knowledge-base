---
title: "Airqoon Environmental Sensor Simulator"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["github/acme_aq_simulator.md"]
---

# Airqoon Environmental Sensor Simulator

**Repository:** `acme_aq_simulator`
**Source File:** `github/acme_aq_simulator.md`

## Description
Simulates a network of environmental monitoring devices that send realistic telemetry data to ThingsBoard via MQTT. Generates 15+ environmental parameters including air quality, weather, noise, and battery data with location-based adjustments and **realistic time-based oscillations**.

## Role in Architecture

**Layer:** Internal Tooling

Simulates a network of environmental monitoring devices sending realistic telemetry data to ThingsBoard via MQTT. Generates 15+ environmental parameters including air quality, weather, noise, and battery data with location-based adjustments and realistic time-based oscillations.

## Tech Stack

Python, MQTT, ThingsBoard

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon|Airqoon]]
