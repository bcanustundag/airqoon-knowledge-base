---
title: "Cesva TA150 Datasheet"
type: source
tags: [competitor, cesva, noise_sensor, datasheet, specs, iec_61672]
created: 2026-05-15
updated: 2026-05-15
sources: [raw/articles/D_TA150_v0007_20250307_EN.pdf]
related:
  - "[[wiki/entities/cesva|Cesva]]"
  - "[[wiki/sources/cesva-ta150-user-manual|User Manual]]"
  - "[[wiki/sources/cesva-ta150-calibration-applus|Calibration Certificate]]"
  - "[[wiki/sources/cesva-ta150-communication-protocols|Communication Protocols (Platform)]]"
  - "[[wiki/sources/cesva-ta150-external-output-protocols|External Output Protocols]]"
---

# Cesva TA150 Datasheet

> Reference: D_TA150_v0007_20250307_EN

## Product Overview
The TA150 is a **spectrum analyser sensor for noise measurement** with optional 1/3-octave band analysis. It combines Class 1 sound level meter precision with IoT connectivity for permanent monitoring deployments.

---

## Technical Specifications

### Acoustic Performance (IEC 61672-1)

| Parameter | Value |
|-----------|-------|
| **Accuracy** | Class 1 (IEC 61672-1) |
| **Verification** | Acoustic calibrator (IEC 60942) |
| **Measurement range** (without scales) | 25.5 – 137.0 dBA |
| **Linearity range** (1 kHz) | 30.5 – 137.0 dBA |
| **LCpeak measurement range** | 29.1 – 140.0 dBC |
| **LCpeak linearity range** (1 kHz) | 55.0 – 140.0 dBC |

### Measured Acoustic Functions

| Category | Functions |
|----------|-----------|
| **Equivalent levels** | LAT, LCT, LZT, LAIT (programmable T: 1 s – 60 min) |
| **Maximum levels** | LAFmaxT, LASmaxT, LAImaxT |
| **Peak levels** | LCpeakT, LZpeakT |
| **Percentiles** | L10, L50, L90 |
| **Frequency/time weightings** | LF, LS, LI, LT |
| **1/3-octave spectrum*** | 6.3 Hz – 20 kHz (requires FR150 module) |

### Microphone

| Parameter | Value |
|-----------|-------|
| Type | ½" condenser |
| Polarisation | 0 V |
| Nominal sensitivity | 16.0 mV/Pa |

---

## Connectivity

### Standard

| Interface | Details |
|-----------|---------|
| **Ethernet** | RJ45, 10/100 Mbps |
| **Wi-Fi** | 2.4 GHz WPA2 |

### Optional Modules (one per sensor)

| Module | Interface |
|--------|-----------|
| **MR154*** | 4G LTE + GPS |
| **CL150*** | 4-20 mA current loop |
| **RS152*** | RS-232 (MODBUS included) |
| **RS154*** | RS-485 (MODBUS included, 2 or 4 wire) |

### Transmission Protocols

| Parameter | Value |
|-----------|-------|
| Protocol | HTTP, HTTPS, MQTT/TCP, MQTT/TLS |
| IP addressing | Dynamic (DHCP) and Static |
| Platform formats | Sentilo, JSON, UltraLight 2.0, others |

---

## Power Supply Options

| Source | Details |
|-------|---------|
| **Mains** | 100/240 V~ 0.6 A, 50/60 Hz |
| **Urban lighting network** | Requires BA150* battery |
| **PoE** | Power over Ethernet |
| **5-12 VDC** | Solar panels, external batteries |
| **BA150*** | Internal lithium battery — 24 h cycles |
| **BA151*** | Internal lithium battery — 5 day cycles |

---

## Optional Firmware Modules

| Module | Function |
|--------|----------|
| **FR150*** | 1/3-octave band spectrum analysis (6.3 Hz – 20 kHz) |
| **GA150*** | Audio file acquisition (MP3, FLAC, WAV) with trigger automations |

---

## Physical & Other Features
- **Mini-OLED screen** for real-time level display and status verification
- **TK120 outdoor kit** protection against rain, snow, wind, birds
- **Volatile memory** up to 2 months capacity
- **Built-in web server** for configuration
- **Minimum annual maintenance** required
- **100% IoT-integrable** across different platforms

---

## Target Applications
- Smart cities sensing
- Permanent noise surveillance networks (source recognition, detection, identification)
- Smart tourist destination (ITD) compliance
- Leisure area noise monitoring (concerts, festivals, sports events, racetracks)

---

## Integration Relevance for Airqoon
The TA150 is a strong candidate for Airqoon's noise monitoring add-on given its Class 1 precision, direct MQTT/JSON compatibility with Airqoon's cloud backend, and compact form factor for co-location with air quality sensors. Key considerations:
- **Protocol match**: HTTP/HTTPS and MQTT are natively supported by Airqoon's ingestion pipeline
- **Data richness**: Up to 12 overall functions + 30 spectrum bands + percentiles per integration period
- **Power flexibility**: PoE and 5-12 VDC inputs allow sharing power infrastructure with Airqoon sensor units
- **Comparable to Kunak noise options** but with broader industrial protocol support (Modbus RTU via RS-485)

## Source
- [[raw/articles/D_TA150_v0007_20250307_EN.pdf]]
