---
title: "AethLabs MA Series Sensor Manual"
type: concept
tags: [manual, maintenance, operations, aethlabs, black-carbon, sensors]
created: 2026-05-05
updated: 2026-05-05
sources: [scratch/ma-quick-start.txt, scratch/ma-operating-manual.txt]
---
# AethLabs MA Series Sensor Manual

This document synthesizes the operational, maintenance, and setup requirements for the [[wiki/entities/aethlabs|AethLabs]] microAeth MA Series Black Carbon monitors ([[wiki/entities/ma200|MA200]], [[wiki/entities/ma300|MA300]], [[wiki/entities/ma350|MA350]]).

## Core Measurement Technology
- **Optical Analysis:** Uses 5 wavelengths to discriminate between organic and elemental carbon particles (880 nm for Black Carbon, 375 nm for Ultraviolet Particulate Matter).
- **DualSpot® vs SingleSpot™:** DualSpot® simultaneously collects aerosol samples on two analysis spots in parallel at different face velocities. This provides real-time compensation for the optical loading effect. A flow rate of 100 ml/min or greater is highly recommended when using DualSpot®.
- **Tape Advance ATN:** The Attenuation (ATN) threshold triggers an automatic tape advance. Setting a lower threshold reduces loading effects but increases tape consumption.

## Configuration & Operation
- **Timebase Settings:** Options are 1, 5, 10, 30, 60, and 300 seconds. Shorter timebases (1-10s) produce larger instrumental noise. For stationary outdoor monitoring, a 300s timebase is recommended.
- **Flow Rate:** Adjustable between 50 and 170 ml/min. Higher flows increase measurement sensitivity but consume more filter tape and power.
- **Warm-Up:** Instruments should warm up for approximately 30 minutes to equilibrate for best data quality.
- **Software:** The microAeth Manager application (macOS/Windows) is used for configuration, firmware updates, and data downloading.

## Environmental & Installation Considerations
- **Pressure:** The aerosol inlet must be at atmospheric pressure. There should be no differential pressure between the inlet and the operating environment.
- **Temperature & Humidity:** Rapid temperature changes can impact data. An environmentally controlled enclosure may be necessary for severe outdoor deployments. High relative humidity (RH) variability may require an external sample dryer.
- **Outdoor Protection:** The [[wiki/entities/ma350|MA350]] features an IP67 rated enclosure, but inlet/outlet ports must be protected from direct water and bug intrusion. An Inlet Protection Kit (WPK-20-25) is recommended.

## Maintenance
- **Filter Tape Replacement:**
  - The MA200 uses the MAFT-L17 cartridge (17 spots).
  - The MA300 and MA350 use the MAFT-L85 cartridge (85 spots).
  - Always note the current tape position before removal. Do not rewind or reuse sampled spots. The optical head must be placed in the "Released (Open)" position before inserting or removing a cartridge.
- **Flow Calibration:** Instruments are initially calibrated at sea level. Flow calibration should only be performed if the on-board "Test Flow" menu indicates an error or if sampling at high elevation.
- **Cleaning:** Internal air passageways and optical chambers must be kept clean. AethLabs recommends annual maintenance service to prevent contamination, which can cause increased measurement noise and poor sealing.
