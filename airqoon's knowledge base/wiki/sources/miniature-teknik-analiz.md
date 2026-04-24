---
title: "Source: Miniature Cihazlar Teknik Analiz"
type: source
raw_file: /Users/bcan/Downloads/miniature_teknik_analiz.md
tags:
  - hardware
  - debug
  - firmware
  - pm-sensor
  - voc
ingested: 2026-04-24
---

# Source: Miniature Cihazlar Teknik Analiz

**Raw file:** `/Users/bcan/Downloads/miniature_teknik_analiz.md`

## Summary

Technical analysis of an ongoing hardware/firmware issue affecting Airqoon's miniature devices. The document details problems encountered under different sleep configurations and outlines the current hypothesis and recommended actions.

## Key Facts Extracted
- **Problem Statement:** 
  - `Sleep Time = 0`: PM sensor data drops out after a while, suspected serial (UART/I2C) bug.
  - `Sleep Time > 0`: Device enters sleep, 5V line cuts, PM sensor turns off, and VOC algorithm resets.
- **Attempted Solution:** 
  - RTC GPIO used to keep 5V line active during sleep. Tests show it's mostly working, but anomalous behaviors persist on some devices.
- **Root Cause Hypothesis:** 
  - Since the VOC algorithm resetting has no software trigger and the 5V line doesn't drop during sleep, the strongest hypothesis is that the PM sensor is resetting itself.
- **Recommended Actions:** 
  - **Critical:** Achieve stable operation at `Sleep Time = 0` by fixing the PM serial data drop bug.
  - **Validation:** Eliminate all doubts about the 5V line and analyze sensor behavior independent of restart scenarios.
  - **Development:** Increase sensor diagnostic capabilities (logging restarts, aborts).

## Entities Referenced
→ [[Airqoon]] (Miniature devices)
