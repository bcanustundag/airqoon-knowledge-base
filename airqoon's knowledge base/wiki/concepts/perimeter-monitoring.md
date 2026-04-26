---
title: "Perimeter Monitoring"
type: concept
tags: [use-case, industrial, monitoring, emissions]
created: 2026-04-23
updated: 2026-04-23
sources: [Use-Cases.md, customer-success-scenarios.md, emisyon-ve-imisyon-olcumleri.md, Kullanım-Alanları.md]
---

# Perimeter Monitoring

> The deployment of air quality sensors around the boundary of an industrial facility to continuously track fugitive and stack emissions, assess environmental impact, and ensure regulatory compliance.

---

## What It Is

Perimeter monitoring involves placing multiple sensor units around the fence-line of an industrial site to:
1. **Detect** off-site fugitive emissions of air pollutants
2. **Quantify** the facility's contribution to ambient air quality
3. **Comply** with regulatory requirements for continuous measurement
4. **Protect** surrounding communities and workers from exposure

---

## How Airqoon Enables It

Airqoon's monitoring system consists of:
- **Sensor units** (typically [[wiki/entities/unit-l|Unit L]]) mounted at strategic points around the facility perimeter
- **Cloud platform** ([[wiki/entities/airqoon-lens|Airqoon Lens]]) aggregating data into real-time dashboards, alerts, and reports
- **AI analysis** providing source attribution, wind-correlated dispersion analysis, and compliance status

### Airqoon vs Traditional Approach

| Dimension | Airqoon (Indicative) | Reference/Equivalent Station |
|-----------|---------------------|----------------------------|
| **Cost** | $2,500–5,500/unit | $100,000+ |
| **Deployment** | 5 minutes, 1 technician | Weeks, specialised team |
| **Operations** | Self-managing, solar-powered | Continuous operator needed |
| **Spatial coverage** | Multiple units create dense mesh | Typically 1–2 fixed points |
| **Data latency** | Real-time (minutes) | Often batch/periodic |

---

## Regulatory Context (Turkey)

- **Çevre İl Müdürlüğü** (Provincial Environmental Directorate) can mandate continuous monitoring when:
  - Community complaints are received about a facility
  - Inspections reveal regulatory non-compliance
  - A facility is assessed as excessively polluting
- Currently, equivalent-class stations are required by regulation — but new standards (CEN TS 17660, EPA protocols) are opening the door for indicative sensors as "usable" alternatives
- Growing ESRS/EU Taxonomy pressure on Turkish exporters increases demand for verifiable environmental data

---

## Target Sectors for Perimeter Monitoring

| Sector | Key Pollutants | Example |
|--------|---------------|---------|
| Cement | PM, SO₂ | Akçansa (BCM/CNK sites) |
| Mining | PM, dust (TSP) | Open-pit operations |
| Oil & Gas | VOC, H₂S, CH₄ | Refineries, petrochemical |
| Industrial zones (OIZ) | Mixed | GİSAŞ |
| Power generation | SO₂, NO₂, PM | EnerjiSA |

---

*See also: [[wiki/entities/unit-l|Unit L]], [[wiki/entities/airqoon-lens|Airqoon Lens]], [[wiki/concepts/low-cost-air-sensors|Low-Cost Air Sensors]], [[Airqoon]]*
