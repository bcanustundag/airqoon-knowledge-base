---
title: "FprCEN/TS 17660-2:2024 — Performance Evaluation of Air Quality Sensor Systems (Particulate Matter)"
type: source
tags: [standards, CEN, EN17660, certification, PM2.5, PM10, particulate-matter, methodology]
created: 2026-04-23
updated: 2026-04-23
sources: ["CEN:TC 17660-2-2024.pdf"]
---

# FprCEN/TS 17660-2:2024 — Particulate Matter Performance Evaluation Standard

## Overview

**FprCEN/TS 17660-2:2024** (the "Fpr" prefix indicates it is a **Final draft for vote** as of October 2024, now approved and published as CEN/TS 17660-2:2024) is the European Technical Specification defining the **test protocol and data quality objectives (DQOs)** for evaluating and classifying air quality **sensor systems measuring particulate matter (PM)** in ambient air.

Published: **October 2024** (Adobe Acrobat 24.3 Image Conversion). 58 pages, image-only PDF.

As of March 2026, it is being advanced to a full European Standard (prEN 17660-2) — see [[wiki/sources/en17660-n3553-voting-letter]].

**Part 1** (gaseous pollutants) is covered in [[wiki/sources/en17660-1-gaseous-pollutants]].

---

## Scope

Applies to sensor systems measuring **particulate matter** in ambient outdoor air:
- **PM₂.₅** — particles with aerodynamic diameter ≤ 2.5 µm
- **PM₁₀** — particles with aerodynamic diameter ≤ 10 µm
- **PM₁₀₋₂.₅** (coarse) — the difference (PM₁₀ − PM₂.₅)
- **PM₁₀₋₂.₅ exposure** — relevant for indoor/outdoor differential monitoring

Does **not** apply to sensor systems as part of a network (Annex A provides network guidance).

Sensor systems are treated as **black boxes** — outputs in µg/m³, factory-calibrated or field-calibrated before testing.

---

## Classification System

Same three-class structure as Part 1:

| Class | Regulatory Use | DQO Basis (at LV, 24h reference) |
|-------|---------------|-----------------------------------|
| **Class 1** | Indicative measurements (regulatory) | ≤25% expanded uncertainty at LV |
| **Class 2** | Objective estimations (regulatory) | ≤30% expanded uncertainty at LV |
| **Class 3** | Non-regulatory (research, citizen science) | Relaxed target (≤50%) |

Key differences from Part 1:
- **24-hour averages** are the default averaging period for PM (vs. shorter periods for gases).
- The **reference method** for classification is the **EN 12341 gravimetric method** (standard filter sampling).
- An **equivalent method** (EN 16450, automated PM monitoring) is also required for co-location — it is used to evaluate RH effects and PM₁₀₋₂.₅ requirements, and to estimate hourly average measurement uncertainty.
- Classification is valid only for the **specific site type, climate, and season** tested.

---

## Test Protocol (2-Step Framework)

PM testing is simpler in structure than gaseous testing — fewer laboratory steps, heavier emphasis on field evaluation.

### Step 1: Laboratory Pre-Test (mandatory)
Only **one mandatory test** in the laboratory:

**1a. Coarse Particle Test (Section 8.1)**
- Sensor systems are exposed to coarse and fine dust in an **exposure chamber**.
- Evaluates the sensor's response to PM₁₀₋₂.₅ (coarse fraction).
- An equivalent method (EN 16450) co-located in the chamber measures PM₂.₅ and PM₁₀.
- Purpose: Ensure the sensor can distinguish size fractions correctly and doesn't confuse coarse particles as fine.

**1b. Optional laboratory tests (Section 8.2)**
- e.g. electromagnetic field effects (see Annex B).

### Step 2: Field Tests (mandatory)
The core of PM sensor evaluation:
- Co-location at **AQMS** with reference method (gravimetric EN 12341) and equivalent method (EN 16450).
- **Number of sites:** Defined in Section 9.2 (multiple sites required for statistical validity).
- **Duration:** Defined in Section 9.2 — respects data quality requirements.
- Both reference and equivalent methods co-located at all locations simultaneously.
- Reference method used for DQO classification.
- Equivalent method used for:
  - Evaluating RH impact restrictions
  - Estimating hourly average measurement uncertainty

**Correction:** Field data may be processed with or without a single universal slope/intercept correction applied uniformly across all sensor systems and all test sites (see Section 9.7).

---

## Key Technical Differences from Part 1 (Gases)

| Aspect | Part 1 (Gases) | Part 2 (PM) |
|--------|---------------|-------------|
| Lab test battery | Extensive (drift, cross-sensitivity, T/RH, memory, EMF…) | Minimal (coarse particle test only) |
| Field test emphasis | Moderate | **Heavy — primary classification step** |
| Reference method | Gas analyser per EU directive | EN 12341 gravimetric |
| Equivalent method | Not required | EN 16450 required |
| Averaging period | Compound-dependent | Default **24h** |
| Special concerns | Gaseous interferents, drift | **RH sensitivity** (humidity makes PM sensors misread) |

### Humidity (RH) is the key PM sensor challenge
PM optical sensors (light scattering) are notoriously sensitive to relative humidity — hygroscopic growth of particles at high RH inflates apparent PM concentration. EN 17660-2 addresses this:
- RH restriction requirements evaluated using the equivalent method.
- Test sites should span representative RH conditions.
- Manufacturers must document RH correction approaches in their SOP.

---

## Key Definitions (Selected)

- **Class 1 sensor system** — meets DQOs of indicative measurements.
- **Class 2 sensor system** — meets DQOs of objective estimations.
- **Class 3 sensor system** — meets relaxed target measurement uncertainty (not associated with mandatory DQO).
- **PMx** — PM fraction with 50% efficiency cut-off at x µm aerodynamic diameter.
- **PM₁₀₋₂.₅** — difference between PM₁₀ and PM₂.₅ (coarse particles).
- **Reference method** — EN 12341 gravimetric standard.
- **Equivalent method** — EN 16450 automated method.
- **Drift** — continuous or incremental change in measurement over time due to changes in sensor properties (not related to actual ambient changes).
- **Calibration** — per JCGM 200:2012 (VIM). *Note: This document does not describe the process of calibrating sensor systems.*
- **Exposure chamber / test chamber** — sealed volume with controlled temperature, humidity, and aerosol conditions.

---

## Normative References

- **EN 16450** — Ambient air: Automated measuring systems for PM₁₀ and PM₂.₅ (equivalent method).
- **EN 15267-1** — Air quality: Assessment of air quality monitoring equipment — General principles of certification.
- **EN 15267-2** — Manufacturing quality management system requirements.
- **EN 12341** — Ambient air: Standard gravimetric measurement method for PM₁₀ and PM₂.₅ (reference method).
- **JCGM 200:2012** — VIM (International Vocabulary of Metrology).
- **EN ISO/IEC 17025** — Competent test laboratory standard (NOTE 1 in Section 5.5).

---

## Quality Management / Change Control

- Sensor system **firmware and software version numbers** must be recorded in the test report.
- Manufacturer must follow **EN 15267-1 and EN 15267-2** requirements when making software, firmware, or hardware design changes to type-tested systems.
- Version numbers must be **accessible to the user** via configuration/data retrieval protocols.

---

## Implications for Airqoon

### Direct Relevance — PM Measurement is Core Business
Airqoon's primary commercial proposition is **PM2.5 and PM10 monitoring** — this standard directly governs whether Airqoon's sensor units can claim regulatory-grade performance.

- **Unit L** uses an optical PM sensor (light scattering). Its susceptibility to RH must be characterised and documented per EN 17660-2.
- The **İnegöl PM case study** (ASIC2026 presentation) demonstrated Airqoon's PM correlation against reference methods — this work maps onto the field test requirements of Step 2.
- The **CEN/TS 17660 test process** document (`Airqoon-Sensor-Üniteleri-Test-Süreci-17660.md`) references this standard as the basis for Airqoon's current test protocol.

### Classification Gap
- It is unclear whether Airqoon's current field data (e.g., İnegöl study results with R² = 0.97 for PM2.5) formally satisfies the EN 17660-2 Step 2 requirements (correct number of sites, duration, reference method used, etc.).
- Airqoon should assess: **Which Class can the current data support?**

### Roadmap Implication
- As prEN 17660-2 becomes a full EN (expected 2026-2028), **EU public procurement contracts** for air quality monitoring will increasingly require EN 17660 classification.
- The mention of **Directive 2024/2881** (new stricter AAQD) in the N3553 voting comments signals that LVs will tighten: PM₂.₅ annual mean drops from 25 µg/m³ (current) toward 10 µg/m³ (WHO guideline). Tighter LV means 25% of LV becomes a smaller absolute number → harder to achieve Class 1.

### PACE047 / Clean Air Hatay Project
The 10 pilot schools project includes both indoor and outdoor PM monitoring (Airqoon M units). Demonstrating EN 17660-2 compliance — even at Class 3 level — would strengthen the project's scientific credibility and reporting to GIZ/EU.

---

## Related Wiki Pages

- [[wiki/sources/en17660-1-gaseous-pollutants]] — Part 1 (gaseous pollutants)
- [[wiki/sources/en17660-n3553-voting-letter]] — Voting letter advancing both parts to full EN
- [[wiki/sources/inegol_pm_presentation]] — Airqoon PM field validation (ASIC2026 case study)
- [[wiki/sources/pace_047_logframe]] — Clean Air Hatay project
- [[wiki/concepts/low-cost-air-sensors]]
- [[wiki/entities/unit-l]]
