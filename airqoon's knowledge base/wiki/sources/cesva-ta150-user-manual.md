---
title: "Cesva TA150 User Manual"
type: source
tags: [competitor, cesva, noise_sensor, manual, installation, maintenance, calibration]
created: 2026-05-15
updated: 2026-05-15
sources: [raw/articles/M_TA150_v0007_20250723_EN.pdf]
related:
  - "[[wiki/entities/cesva|Cesva]]"
  - "[[wiki/sources/cesva-ta150-datasheet|Datasheet]]"
  - "[[wiki/sources/cesva-ta150-calibration-applus|Calibration Certificate]]"
  - "[[wiki/sources/cesva-ta150-communication-protocols|Communication Protocols (Platform)]]"
  - "[[wiki/sources/cesva-ta150-external-output-protocols|External Output Protocols]]"
---

# Cesva TA150 User Manual

> Reference: M_TA150_v0007_20250723_EN (64 pages)

## Document Overview
Comprehensive user guide for the Cesva TA150 noise sensor covering device description, web server configuration, physical installation, power supply options, communication setup, optional modules, acoustic verification, maintenance, firmware updates, and full technical specifications.

---

## 1 Device Description

### Key Features
- **Class 1** precision (IEC 61672-1) with integrated 1/3-octave spectrum analyser (optional FR150)
- **Mini-OLED screen** shows real-time LA1s level, communication status, and power supply status — no software needed
- **TK120 outdoor kit** maintains Class 1 while protecting against rain, wind, snow, birds
- **IP65** rated central body when closed
- Compact: **395 × 120 × 91 mm**, weight **960 g** (without battery)
- Continuous 24/7 measurement
- Volatile memory: ~**2 months** (1-min recording) or **30 days** (with 1 s function)
- Detachable outdoor kit for quick calibrator verification
- To reset: disconnect power for a few seconds and reconnect

### Physical Parts (numbered references)
| # | Part | Description |
|---|------|-------------|
| 1 | TK120 outdoor kit | Protects microphone + preamplifier from weather |
| 2 | Screws (×4) | Front cover fastening |
| 3 | Central body | IP65 housing for electronics |
| 4 | Cable gland (comm) | Communication cable entry |
| 5 | Cable gland (power) | Power cable entry |
| 6 | USB-B connector | Technical service only |
| 7 | LAN connector (RJ45) | Ethernet connection |
| 9 | Module connector / SIM slot | For CL150/RS152/RS154/MR154 |
| 12 | Mini-OLED screen | Status display |
| 13 | Button | Screen toggle / web server mode activation |

---

## 2 Web Server

### Access Procedure
1. Power on sensor
2. Press button [13] to activate screen
3. **Hold button** until progress bar completes → activates Wi-Fi AP mode
4. Connect to sensor's Wi-Fi network (SSID + password shown on screen)
5. Browse to `192.168.60.100`
6. Auto-deactivates after **60 min** of inactivity

> **Note:** While web server is active, data is buffered locally and NOT sent to internet platform (except external outputs CL150/RS-485/RS-232 which continue).

### Web Server Sections

| Section | Purpose |
|---------|---------|
| **Dashboard** | Device info, hardware/firmware modules, sensor status, time sync, platform config, memory buffer % |
| **Adjustment** | Sensitivity calibration (target: 93.9 dB with IEC 60942 calibrator), maintenance date logging |
| **Interface** | External output protocol config (CL150/RS-232/RS-485) + Internet interface selection (Ethernet/Wi-Fi/4G) |
| **Platform** | Data platform selection (CESVA, JSON, Sentilo, UL2.0) + Audio platform config (Custom) |
| **Real Time** | Live numerical values at 1 s or 10 s integration — designed for lab verification |

### Platform Options (Data)
1. CESVA (preconfigured)
2. Generic JSON
3. Sentilo
4. UltraLight 2.0
5. TA120 version: Sentilo
6. TA120 version: UL2.0

Each supports **HTTP**, **HTTPS**, **MQTT/TCP**, and **MQTT/TLS** transport with configurable Host, Port, Provider ID/Client ID, Token/Username/Password, and Topic.

### Configurable Data Parameters
- **Averaging time (TLeq):** 1 s – 60 min
- **Minimum sent registers:** batch size per transmission
- **Main function (LAT):** always sent, optional overload/underrange
- **Overall functions:** selectively enable LCT, LZT, LAIT, LAFmaxT, LASmaxT, LAImaxT, LCpeak, LZpeak, L10T, L50T, L90T
- **1/3-octave bands*** (FR150 required): enable/disable with overload/underrange
- **1 s registers:** select one function at 1 Hz resolution (only if TLeq ≤ 60 s)

> **Data consumption note:** If using 4G, CESVA recommends a flat-rate SIM with minimum **1 GB/month**. For TLeq ≤ 10 s, Ethernet is recommended to avoid data jams.

### Audio Platform (GA150 Module)
- Formats: **MP3**, **FLAC**, **WAV** (WAV only via Ethernet)
- Audio recording scales: 0–77 dB, 0–107 dB, 0–137 dB
- Up to **3 independent trigger automations** (prioritized 1 → 2 → 3):

| Trigger Mode | Description |
|-------------|-------------|
| **Off** | Disabled |
| **Continuous** | Record within time interval (configurable start/end or 24 h) |
| **By time** | Record at configurable sampling period within interval |
| **By level** | Record when function exceeds/falls below threshold (configurable trigger function, threshold dB, start/stop durations) |
| **By emergence** | Record when difference between trigger function and background function exceeds emergence range (configurable) |

> **GDPR disclaimer:** Audio capture may involve personal data processing; user assumes regulatory compliance.

---

## 3 Installation

### Mounting
- **Vertical mounting preferred** (support + flanges), horizontal also supported
- Suitable for streetlights, luminaires, bus shelters, MUPIs, OPIs, billboards, advertising poles

### Cable Glands
- 2 gland inputs at bottom (communication [4] and power [5])
- Cap unused gland to maintain **IP65**
- Route power cable in "U" shape under sensor to prevent water ingress

---

## 4 Power Supply Options

| Source | Specification | Notes |
|-------|---------------|-------|
| **Mains (AC)** | 100–240 V, 50/60 Hz | Typical 1 W, max 10 W; wire: L (brown), N (blue), ⏚ (green/yellow) |
| **5-12 VDC** | External batteries, power banks, solar | Cable max **3 metres**; typical 1 W, max 2 W (10 W while charging BA150) |
| **PoE** | IEEE 802.3af | Via Ethernet cable |
| **BA150*** | Internal lithium battery | 24 h cycle backup; designed for charge/discharge cycling |
| **BA151*** | Internal lithium battery | ~5 day duration; designed for cycling |

> **Battery lifespan:** ~2 years typical (750 charge cycles at 60% capacity). Continuous power without cycling significantly reduces lifespan (< 1 year). Battery charges while connected to external power.

---

## 5 Communication Modules

Only **one optional hardware module** can be added per sensor (non-swappable once installed).

### Internet Platform Modules
| Module | Details |
|--------|---------|
| **Ethernet** | Standard RJ45, CAT5E SFTP 4P, 10/100 Mbps |
| **Wi-Fi** | 2.4 GHz WPA2 (standard, unless replaced by optional module) |
| **MR154*** | 4G LTE (bands B1-B66), UMTS/HSPA+, GSM/GPRS/EDGE; GNSS (GPS, GLONASS, Galileo); micro-SIM |

### External Output Modules
| Module | Interface | Protocols |
|--------|-----------|-----------|
| **CL150*** | 4-20 mA current loop | CESVA proprietary |
| **RS152*** | RS-232 serial | CESVA, Modbus RTU (up to 115200 bps) |
| **RS154*** | RS-485 serial | CESVA, Modbus RTU 2-wire, Modbus RTU 4-wire (up to 115200 bps) |

> Internet and external output transmissions are **independent** and can run simultaneously (e.g. RS-485 Modbus to PLC + Wi-Fi JSON to cloud).

---

## 6 Optional Firmware Modules

| Module | Description | Activation |
|--------|-------------|------------|
| **FR150*** | 1/3-octave band spectral analysis (6.3 Hz – 20 kHz, 30 bands), simultaneous real-time, no frequency weighting | Can be purchased later and activated remotely via internet |
| **GA150*** | Audio file acquisition (MP3/FLAC/WAV), up to 3 configurable trigger automations | Can be purchased later and activated remotely via internet |

---

## 7 Acoustic Verification & Maintenance

### Verification Procedure
1. Remove front cover (4 screws) and TK120 outdoor kit (unscrew right)
2. Insert microphone into IEC 60942 calibrator (94 dB @ 1 kHz)
3. Wait ~10 s for stabilisation
4. Read LA1s on screen or web server:
   - Deviation ≤ 0.5 dB → OK
   - 0.5 < deviation ≤ 1.0 dB → keep under observation, readjust at next verification
   - Deviation > 1.0 dB → send to CESVA technical service
5. Reassemble TK120 kit and close cover

### Maintenance Schedule
- **Annual:** acoustic verification + TK120 inspection
- **Annual (minimum):** replace PV120 windscreen foam
- More frequent if environmental conditions are severe
- Inspect and replace TK120 kit if damaged; send sensor to CESVA if microphone may be impacted

### Firmware Update
- **Automatic** when powered and connected to internet
- Force update: power-cycle the sensor
- During update: no data sent to platform; buffer erased on restart

---

## 8 Full Technical Specifications Summary

### Reference Conditions
| Parameter | Value |
|-----------|-------|
| Reference direction | Perpendicular to microphone diaphragm |
| Reference level | 94 dB (ref 20 µPa) |
| Reference frequency | 1 kHz |
| Reference temperature | 23 °C |
| Reference humidity | 50% |
| Reference pressure | 101.325 kPa |

### Measurement Performance
| Weighting | Measurement Range | Linearity Range (1 kHz) |
|-----------|-------------------|------------------------|
| dBA (LF/LS/LI/LT) | 25.5 – 137.0 | 30.5 – 137.0 |
| dBC | 29.1 – 137.0 | 34.1 – 137.0 |
| dBZ | 33.3 – 137.0 | 38.3 – 137.0 |
| LCpeak / LZpeak | — | 55.0 – 140.0 |

### Environmental Limits
| Parameter | Range |
|-----------|-------|
| Operating temperature | -10 to +50 °C |
| Battery charge/discharge temperature | 0 to +40 °C |
| Operating humidity | 25 – 90% |
| Atmospheric pressure | 85 – 108 kPa |

### Physical
| Parameter | Value |
|-----------|-------|
| Dimensions | 395 × 120 × 91 mm |
| Weight (no battery) | 960 g |
| Weight (with BA150) | 1060 g |
| Weight (with BA151) | 1285 g |
| Warm-up time | 5 s |
| Audio max file duration | 1 min |
| Ingress protection | IP65 |

---

## 9 Precautions
- Preamplifier is **non-removable** — never pull on it
- **Never disassemble** the microphone
- Keep microphone away from dust and sharp objects
- Exercise extreme caution with mains power connections (high voltage)
- Ensure no liquid enters while sensor cover is open
- Store in a dry environment (0–40 °C)

---

## Integration Relevance for Airqoon
This manual confirms several key facts for Airqoon integration planning:
- **Simultaneous dual-path transmission** (e.g., Modbus to Airqoon SU + MQTT to Airqoon cloud) is architecturally supported
- **PoE sharing** with Airqoon sensor units is practical (IEEE 802.3af standard)
- **Remote firmware updates** mean minimal on-site maintenance overhead
- The **5 s warm-up time** means near-instant data availability after power restoration
- **Audio capture with trigger automations** is highly relevant for noise event characterisation in industrial fenceline deployments (could complement Airqoon's source attribution)

## Source
- [[raw/articles/M_TA150_v0007_20250723_EN.pdf]]
