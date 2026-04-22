---
title: "Low-Cost Air Sensors"
type: concept
tags: [air-quality, sensors, technology, indicative-monitoring]
created: 2026-04-23
updated: 2026-04-23
sources: [Air-Sensors-Standardization-and-Evaluation-Efforts.md, Certificates-&-Standards-&-Technical-Specifications.md, Measurement-Methods-in-Monitoring-Air-Quality.md, Use-Cases.md, Hava-Ölçümleri-ve-Hava-Sensör-Sistemleri.md, Research-Labs-Evaluating-Air-Quality-Sensor-Performance.md, air-sensors-growth-marketing-staj.md]
---

# Low-Cost Air Sensors

> Affordable, portable sensor systems that provide indicative air quality data. They complement (not replace) reference/equivalent monitoring stations and are central to Airqoon's product positioning.

---

## Definition & Positioning

Low-cost air sensors (also called "indicative sensors" or "supplementary sensors") are compact air quality measurement devices that cost significantly less than reference monitoring stations ($2,000–8,000 vs $100,000+ for reference stations). They enable dense spatial coverage and real-time data collection but achieve lower data quality than reference-grade instruments.

**EU classification (Directive 2008/50/EC):**

| Tier | Description | Data Quality | Example |
|------|-------------|-------------|---------|
| **Reference** | Highest accuracy, regulatory use | ±15% uncertainty (PM), ±25% (gases) | BAM, TEOM |
| **Equivalent** | Demonstrably equivalent to reference | Same DQO as reference | Certified analysers |
| **Indicative** | Lower uncertainty requirements | ±50% uncertainty | **Airqoon Unit L/M** |
| **Modelling** | Mathematical estimation | ±60% uncertainty | CAMS, dispersion models |

Airqoon operates at the **indicative** tier, designed to supplement reference networks rather than replace them.

---

## Key Standards

| Standard | Year | Focus |
|----------|------|-------|
| **CEN TS 17660-1** | 2021 | Performance evaluation — gaseous pollutants (NO₂, O₃, SO₂, CO) |
| **CEN TS 17660-2** | 2024 | Performance evaluation — particulate matter |
| **PAS 4023** (UK) | 2023 | Code of practice for deployment of low-cost sensors |
| **EPA/600/R-20/280** | 2021 | PM2.5 sensor testing protocols |
| **EPA/600/R-20/279** | 2021 | Ozone sensor testing protocols |
| **ASTM D8559-24** | 2024 | Standard specification for outdoor AQ sensors |
| **GAW-293** (WMO) | 2024 | Integrating low-cost sensors into global networks |

---

## Technology

### Sensing Methods (used in Airqoon units)
- **Optical particle counters (OPC)** — PM measurement via light scattering
- **Electrochemical cells** — Gas measurement (NO₂, O₃, SO₂, CO)
- **Metal-oxide semiconductor (MOS)** — VOC detection
- **Photoionization detector (PID)** — tVOC measurement
- **NDIR** — CO₂ measurement

### Known Challenges
- Sensitivity to temperature and humidity (hygroscopic growth affects PM readings)
- Cross-sensitivity between gases (e.g., O₃ interference on NO₂ electrochemical cells)
- Drift over time requiring periodic recalibration
- Lower accuracy than reference instruments (acceptable for indicative tier)

---

## Market Context

The global trend is toward **denser sensor networks** complementing sparse reference stations. Key drivers:
- Cost of reference stations limits spatial coverage (cities may have only 1–3 stations)
- Growing public awareness and demand for hyperlocal data
- EU regulatory evolution toward accepting indicative data
- Smart city and digital twin initiatives requiring environmental layers
- ESG/sustainability reporting requirements (ESRS, EU Taxonomy)

---

## Research & Evaluation Landscape

Key labs evaluating sensor performance:
- **JRC (EU Joint Research Centre)** — AirSensEUR platform
- **EPA** — Air Sensor Toolbox
- **AQSPEC (South Coast AQMD)** — Large-scale field evaluations
- **NPL (UK)** — Calibration and testing
- **WMO** — Global Atmosphere Watch integration guidelines

---

*See also: [[Airqoon]], [[Unit L]], [[CEN TS 17660]], [[Indicative Monitoring]]*
