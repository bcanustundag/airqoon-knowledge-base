---
title: "EN 17660 — European Standard for Air Quality Sensor System Performance Evaluation"
type: concept
tags: [standards, CEN, EN17660, certification, regulatory, sensor-testing, DQO, gases, PM]
created: 2026-04-23
updated: 2026-04-23
sources: ["CEN:TC 17660-1-2021.pdf", "CEN:TC 17660-2-2024.pdf", "CEN-TC 264_N3553_Letter_Result_of_voting_prelNWIs_EN17660-1_and_-2_WG42.pdf"]
---

# EN 17660 — European Standard for Air Quality Sensor Performance Evaluation

## What It Is

**EN 17660** is a European standard series developed by **CEN/TC 264 "Air quality"** (Working Group 42, secretariat at DIN Germany). It defines how **low-cost air quality sensor systems** should be tested, evaluated, and classified for use in ambient air monitoring.

The standard is currently published as a **Technical Specification (CEN/TS)**. As of March 2026, both parts have been formally adopted (100% approval) as preliminary work items for conversion to full **European Standards (EN)** (Decisions 1486 and 1487).
*Note: TSE (Turkey) abstained from the vote, meaning there is no active push from Turkey.*

## Why It Matters

EN 17660 is **the** certification benchmark for low-cost AQ sensors in the EU regulatory and procurement space. It creates a framework that:
1. Defines **three performance classes** (Class 1–3) with objective thresholds.
2. Provides a **standardised, repeatable test protocol** accepted across all EU member states.
3. Gives **buyers (municipalities, regulators)** a reliable way to compare sensor system claims.
4. Determines **regulatory admissibility** — Class 1 can be used for indicative measurements under EU air quality directives.

## The Three Classes

| Class | Regulatory Status | Expanded Uncertainty Target at LV |
|-------|------------------|-----------------------------------|
| **Class 1** | Indicative measurements — usable under EU Directive | ≤ 25% |
| **Class 2** | Objective estimations — lesser regulatory role | ≤ 30% |
| **Class 3** | Non-regulatory — research, education, citizen science | ≤ 50% (relaxed) |

- "LV" = Limit Value as defined in EU Directive 2008/50/EC.
- Uncertainty is **expanded** (k=2, ~95% confidence), computed as RSS of all error contributions.
- Classification is **site-specific** — results from one climate/site type don't automatically transfer.

## Part 1: Gaseous Pollutants (CEN/TS 17660-1:2021)

Applies to sensors measuring NO₂, SO₂, O₃, CO. 
It uses a 4-step protocol with decision gates:

### Step 1: Laboratory Pre-Test (mandatory)
1. **Response time**
2. **Lack of fit** (linearity via OLS regression)
3. **Repeatability** & Limit of Detection (LOD)

### Step 2: Extended Laboratory Tests (optional, paired with Step 3)
Comprehensive chamber characterisation:
- **Long-term drift** (over 90 days)
- **Cross-sensitivities** to interferent gases
- **Temperature and humidity effects** (10-90% RH)
- **Memory, wind, pressure, EMF, and battery effects**.

### Step 3: Short Field Tests (paired with Step 2)
- Co-location at AQMS with reference instruments.
- Uncertainty estimated using the "Guide to the Demonstration of Equivalence".

### Step 4: Extended Field Tests (alternative to Steps 2+3)
- Double the number of AQMS sites. Bypasses Step 2 lab tests entirely.

## Part 2: Particulate Matter (FprCEN/TS 17660-2:2024)

Applies to sensors measuring PM₂.₅, PM₁₀, and coarse particles. Simpler, field-test-dominant protocol:

### Step 1: Laboratory Pre-Test (mandatory)
- Exposure chamber test specifically for **PM₁₀₋₂.₅ (coarse particle) characterisation**.

### Step 2: Field Tests (mandatory)
- **Co-location at AQMS** with both a **reference method** (EN 12341 gravimetric) AND an **equivalent method** (EN 16450 automated).
- Focuses heavily on the effect of **Relative Humidity (RH)**, which is the primary driver of error in optical PM sensors. Manufacturers must document their RH correction algorithms.
- Intra-model reproducibility is also tested (minimum 2 sensor systems running in parallel).

## Connection to EU Regulatory Framework

### Directive 2008/50/EC (current)
The "Ambient Air Quality Directive" — sets LVs for pollutants. EN 17660 DQOs are calibrated to this directive's "indicative measurements" (25% uncertainty) category.

### Directive 2024/2881 (new AAQD — in force)
The revised Air Quality Directive, which will repeal 2008/50/EC. Key changes:
- **PM₂.₅ annual mean LV** drops from 25 µg/m³ to **10 µg/m³** (WHO guideline).
- **NO₂ annual mean LV** drops from 40 µg/m³ to **20 µg/m³**.

**Impact on EN 17660 Class 1:** At a lower LV, 25% of LV becomes a smaller absolute number. For PM₂.₅: 25% × 10 µg/m³ = **2.5 µg/m³** expanded uncertainty allowed (vs. 25% × 25 = 6.25 µg/m³ currently). This is a **significantly harder bar** for low-cost sensors. France explicitly flagged this transition requirement during the March 2026 voting.

## Airqoon's Position & Strategic Implications

1. **Current State:** Airqoon's internal test process (`Airqoon-Sensor-Üniteleri-Test-Süreci-17660.md`) is directly modelled on EN 17660. Field co-location studies (e.g., İnegöl PM study) show high correlation (R² = 0.97) but formal class status is not yet certified.
2. **Class 3** is achievable easily as a marketing baseline ("EN 17660 tested").
3. **Class 1 PM** will become much harder under Directive 2024/2881. It is best to pursue certification *before* the EN explicitly adopts the new limits.
4. When prEN 17660-1/-2 become full ENs (est. 2026-2028), EU public tenders will likely mandate this certification.

## Related Wiki Pages

- [[wiki/sources/inegol_pm_presentation]] — Airqoon's field validation (ASIC2026)
- [[wiki/concepts/low-cost-air-sensors]]
- [[wiki/entities/unit-l]]
- [[wiki/entities/airqoon]]
