---
title: "Airqoon Sensor Unit Local Firmware"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-su-local-fw.md"]
---

# Airqoon Sensor Unit Local Firmware

**Repository:** `airqoon-su-local-fw`
**Source File:** `raw/github_repos/airqoon-su-local-fw.md`

## Description
**ESP32-based sensor data acquisition system with Modbus RTU interface**

## Role in Architecture

**Layer:** Firmware (ESP32)

Local variant of the sensor unit firmware for indoor/development use. Communicates via local network (WiFi) rather than cellular, used for Unit M and development testing.

## Tech Stack

C/C++, ESP-IDF, FreeRTOS, MQTT, WiFi

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/unit-l|Unit L]]
- [[wiki/entities/airqoon|Airqoon]]
