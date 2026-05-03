---
title: "ESP32 ADC Data Logger & Environmental Monitoring System"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["github/LCF.md"]
---

# ESP32 ADC Data Logger & Environmental Monitoring System

**Repository:** `LCF`
**Source File:** `github/LCF.md`

## Description
A high-performance, multi-task ESP32 application for reading analog data from dual ADS7828 12-bit ADCs and environmental data from BME280 sensor, transmitting to both local UART and cloud (ThingsBoard) with real-time status indication via RGB LED.

## Role in Architecture

**Layer:** Firmware (ESP32)

High-performance, multi-task ESP32 application for reading analog data from dual ADS7828 12-bit ADCs and environmental data from BME280 sensor. Transmits to both local UART and cloud (ThingsBoard) with real-time RGB LED status indication.

## Tech Stack

C/C++, ESP-IDF, FreeRTOS, MQTT

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/unit-l|Unit L]]
- [[wiki/entities/airqoon|Airqoon]]
