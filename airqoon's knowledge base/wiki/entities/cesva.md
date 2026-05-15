---
title: "Cesva"
type: entity
tags: [competitor, hardware_manufacturer, noise_sensors, iec_61672, spain]
created: 2026-05-15
updated: 2026-05-15
related:
  - "[[wiki/sources/cesva-ta150-datasheet|TA150 Datasheet]]"
  - "[[wiki/sources/cesva-ta150-user-manual|TA150 User Manual]]"
  - "[[wiki/sources/cesva-ta150-calibration-applus|TA150 Calibration Certificate (Applus)]]"
  - "[[wiki/sources/cesva-ta150-communication-protocols|TA150 Communication Protocols (Platform)]]"
  - "[[wiki/sources/cesva-ta150-external-output-protocols|TA150 External Output Protocols (RS-232/RS-485/4-20mA)]]"
  - "[[wiki/sources/case-study-albacete-noise|Case Study: Albacete Noise]]"
---

# Cesva

## Company Overview
**Cesva** (CESVA Instruments S.L.U.) was founded in **1969 in Barcelona, Spain**. They manufacture professional sound measurement instruments with in-house R&D&I and patents. They participate in national and international standards committees for the establishment and revision of acoustics standards.

| Field | Value |
|-------|-------|
| Founded | 1969 |
| HQ | Maracaibo 6, 08030 Barcelona, Spain |
| Tel | +34 934 335 240 |
| Email | info@cesva.com |
| Website | [cesva.com](https://www.cesva.com) |
| Distribution | 40+ countries |

---

## Key Product: TA150 Noise Sensor

### Core Specs
| Parameter | Value |
|-----------|-------|
| Accuracy | **Class 1** (IEC 61672-1) |
| Measurement range | 25.5 – 137.0 dBA |
| Microphone | ½" condenser, 0 V, 16.0 mV/Pa |
| Spectrum analysis | 1/3-octave, 6.3 Hz – 20 kHz (FR150 module) |
| Audio recording | MP3, FLAC, WAV (GA150 module) |
| Resolution | 0.1 dB |
| Warm-up time | 5 s |
| Ingress protection | IP65 |
| Dimensions | 395 × 120 × 91 mm |
| Weight | 960 g (without battery) |

### Measured Functions
- **Equivalent levels:** LAT, LCT, LZT, LAIT (T: 1 s – 60 min)
- **Max levels:** LAFmaxT, LASmaxT, LAImaxT
- **Peak levels:** LCpeakT, LZpeakT
- **Percentiles:** L10, L50, L90
- **1/3-octave bands:** 30 bands (FR150 module)

### Connectivity
| Standard | Optional (one per sensor) |
|----------|--------------------------|
| Ethernet (RJ45, 10/100 Mbps) | 4G LTE + GPS (MR154) |
| Wi-Fi (2.4 GHz WPA2) | RS-232 + Modbus (RS152) |
| | RS-485 + Modbus 2/4-wire (RS154) |
| | 4-20 mA current loop (CL150) |

### Internet Protocols
HTTP, HTTPS, MQTT/TCP, MQTT/TLS — Sentilo, Generic JSON, UltraLight 2.0

### Power Supply
Mains (100-240 V), PoE (802.3af), 5-12 VDC, BA150 battery (24 h), BA151 battery (5 days)

### Environmental Limits
Temperature: -10 to +50 °C | Humidity: 25–90% | Pressure: 85–108 kPa

---

## Competitive Position vs Airqoon
- **Direct competitor for noise monitoring** in smart city and industrial fenceline applications
- Strong in **Spanish smart city market** due to Sentilo API compatibility
- Broader industrial protocol support (Modbus RTU) than typical IoT noise sensors
- ENAC-accredited Applus calibration demonstrates premium quality positioning
- Audio capture with configurable triggers could complement or compete with Airqoon's source attribution workflows
- No air quality measurement capability — complementary rather than substitute to Airqoon's core offering
