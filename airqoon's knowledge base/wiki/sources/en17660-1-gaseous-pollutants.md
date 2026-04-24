---
title: "CEN/TS 17660-1:2021 — Performance Evaluation of Air Quality Sensor Systems (Gaseous Pollutants)"
type: source
tags: [standards, CEN, EN17660, certification, gases, NO2, SO2, O3, CO, PM, methodology]
created: 2026-04-23
updated: 2026-04-23
sources: ["CEN:TC 17660-1-2021.pdf"]
---

# CEN/TS 17660-1:2021 — Gaseous Pollutants Performance Evaluation Standard

## Overview

**CEN/TS 17660-1:2021** is the European Technical Specification published by CEN/TC 264 "Air quality" (secretariat: DIN, Germany). It defines the **test protocol and data quality objectives (DQOs)** for evaluating and classifying air quality **sensor systems measuring gaseous pollutants** in ambient air.

This is a **scanned, 89-page image-PDF** (produced April 2022 with Adobe Acrobat 22.1 Image Conversion). As of March 2026, it is being upgraded to a full European Standard (prEN 17660-1) — see [[wiki/sources/en17660-n3553-voting-letter]].

**Part 2** (particulate matter) is covered in [[wiki/sources/en17660-2-particulate-matter]].

---

## Scope

Applies to sensor systems measuring **gaseous pollutants** in ambient (outdoor) air. Key gases covered include:

| Compound | Span Level (µg/m³) | Test Levels (µg/m³) |
|----------|-------------------|---------------------|
| SO₂ | 125 | 0; 75; 125; 200 |
| NO₂ | 100 | 0; 40; 100; 140; 200 |
| O₃ | (defined per LV) | — |
| CO | (defined per LV) | — |

Does **not** apply to sensor systems used as part of a **network** (network-level evaluation is out of scope, though Annex A provides guidance on network use).

---

## Classification System

Three classes are defined based on the **expanded measurement uncertainty** at the **Limit Value (LV)**:

| Class | Regulatory Use | DQO Basis |
|-------|---------------|-----------|
| **Class 1** | Indicative measurements (regulatory) | ≤25% expanded uncertainty at LV |
| **Class 2** | Objective estimations (regulatory) | ≤30% expanded uncertainty at LV |
| **Class 3** | Non-regulatory (research, citizen science, education) | Relaxed (≤50%) |

- Class 1 and 2 are derived from DQOs in **Directive 2008/50/EC** (to be updated to Directive 2024/2881 in the EN version).
- Classification is **site-specific** — valid only for the type of site and meteorological conditions tested.
- Classification requires a **Standard Operating Procedure (SOP)** defined by the manufacturer, which must be followed during both testing and deployment.

---

## Test Protocol (4-Step Framework)

The protocol is a flow chart with decision gates. All sensor systems must pass **Step 1** before proceeding.

### Step 1: Laboratory Pre-Test (mandatory for all)
Rapid laboratory screening under controlled conditions in an **exposure chamber**:
1. **Response time** — How fast the sensor responds to step changes in concentration. Must meet Table 4 criteria.
2. **Lack of fit** — Linearity of sensor response vs. reference. Calculated via OLS regression: expanded uncertainty U(lof) = k × u(lof) where k=2. Must meet Table 4 criteria.
3. **Repeatability** — Standard deviation of 6 consecutive measurements at the highest test level. LOD = 3 × s_r at zero level.

### Step 2: Extended Laboratory Tests (optional, paired with Step 3)
Comprehensive characterisation in exposure chamber (~3 months):
- **Long-term drift** — Measurements every ~2 weeks over 90 days at zero and highest level, alternating.
- **Cross-sensitivities** — Effect of interferent gases at their expected ambient concentrations.
- **Temperature and humidity effects** — Tested at 4 levels (10-25%, 40-50%, 70-75%, 90% RH).
- **Memory effects** — Test gas, humidity, temperature memory.
- **Wind velocity effects** (Annex D — informative).
- **Atmospheric pressure effects** (Annex E — normative).
- **Electromagnetic field effects** (Annex F — informative).
- **Power supply/battery effects**.
- Cumulative uncertainty budget computed from all contributions.

### Step 3: Short Field Tests (paired with Step 2)
Co-location at Air Quality Monitoring Stations (AQMS):
- Sensor systems co-located with reference instruments.
- Uncertainty estimated using the **"Guide to the Demonstration of Equivalence"** method.
- Minimum number of sites and data points required.
- Slope and/or intercept correction may be applied (single universal correction for all units).

### Step 4: Extended Field Tests (alternative to Steps 2+3)
- Double the number of AQMS sites vs. Step 3.
- Bypasses laboratory tests after pre-test.
- All other field test requirements same as Step 3.

**Decision logic:** After each step, DQO thresholds are checked. Failing Class 1 and 2 DQOs but meeting Class 3 → awarded Class 3. Failing all → no classification.

---

## Key Technical Requirements

### Measurement Uncertainty Budget

The expanded uncertainty U is computed as a root-sum-of-squares (RSS) of individual contributions:
- Lack of fit: u(lof)
- Long-term drift: u(D_LV), u(D_z)
- Cross-sensitivity to gaseous interferents: u(γ)
- Temperature and humidity: u(T), u(RH)
- Memory effects: u(mem)
- Atmospheric pressure: u(p)
- Electromagnetic fields: u(EMF)
- Between-reference-method uncertainty: u(RM)
- Between-sensor-systems uncertainty: u(SS)

All reported as **expanded uncertainty with coverage factor k=2** (95% confidence).

### Regression Formula
Linear regression: y_i = a + b×x_i (OLS, Annex I — normative)

The regression is computed across all measuring points (including zero). Residuals are used to compute u(lof).

### Infrastructure Requirements
- **Exposure chamber**: Must control airflow, test gas concentrations, temperature, and RH.
- **Reference method**: Co-located analyser must comply with applicable EU directives.
- **Competent test body**: Must conform to internationally accepted test laboratory standards (EN ISO/IEC 17025 implied).

---

## Annexes Summary

| Annex | Type | Topic |
|-------|------|-------|
| A | Informative | Co-location of sensors, deployment, network management |
| B | Informative | Guidance for CO₂ sensor testing |
| C | Informative | Exposure chamber design |
| D | Informative | Wind velocity effect evaluation |
| E | **Normative** | Atmospheric pressure effect evaluation |
| F | Informative | EMF effect evaluation |
| G | Informative | Air composition at different outdoor site types |
| H | Informative | Selecting climate for field trial site |
| I | **Normative** | OLS regression formulae |
| J | — | (Bibliography) |
| K | Informative | Measurement uncertainty example |

---

## Implications for Airqoon

### Direct Relevance
- Airqoon's **"Sensor Üniteleri Test Süreci 17660"** document is explicitly based on this standard — it is Airqoon's internal implementation of CEN/TS 17660-1.
- The **Unit L** and **Unit M** gas sensor channels (NO₂, SO₂, O₃, CO) would need to demonstrate Class 1, 2, or 3 performance under this protocol to make regulatory claims.
- Airqoon's test process references the 4-step protocol and mentions co-location at AQMS — consistent with Steps 3/4.

### Certification Status
- Existing tests have been performed but the explicit Class awarded (1, 2, or 3) should be verified and documented.
- Once prEN 17660-1 is published as a full EN (expected 2026-2028), regulatory procurement in EU member states may **require** EN certification.

### Strategic Note
- **Class 3** certification (relaxed, non-regulatory) is achievable as a baseline; **Class 1** would be the premium claim enabling regulatory use. Airqoon should know which class its current results correspond to.
- The **Directive 2024/2881** update (AFNOR's comment in the N3553 voting) will set stricter LVs (e.g., lower PM2.5 annual mean), which may shift what "25% of LV" means in absolute concentration terms.

---

## Related Wiki Pages

- [[wiki/sources/en17660-2-particulate-matter]] — Part 2 (PM sensors)
- [[wiki/sources/en17660-n3553-voting-letter]] — Voting letter advancing both parts to full EN
- [[wiki/sources/airqoon-sensor-test-process]] — Airqoon's internal 17660-based test process (pending)
- [[wiki/concepts/low-cost-air-sensors]]
- [[wiki/entities/unit-l]]
- [[wiki/concepts/en17660-standard]] (concept page to create)
