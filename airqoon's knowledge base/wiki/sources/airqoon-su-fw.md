---
title: "Smart IoT Modules (SMs) - Firmware"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-su-fw.md"]
---

# Smart IoT Modules (SMs) - Firmware

**Repository:** `airqoon-su-fw`
**Source File:** `raw/github_repos/airqoon-su-fw.md`

## Description
Over-the-air (OTA) update procedure is one of the key features of Inovatink Smart IoT Modules (SMs). Inovatink can update firmware of a device deployed to the field whenever necessary.

## Role in Architecture

**Layer:** Firmware (ESP32)

Main sensor unit firmware for ESP32-based air quality monitoring devices. Handles sensor reading (electrochemical gas, PM optical, environmental), MQTT telemetry transmission, power management, and OTA updates.

## Tech Stack

C/C++, ESP-IDF, FreeRTOS, MQTT/TLS

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/unit-l|Unit L]]
- [[wiki/entities/airqoon|Airqoon]]
