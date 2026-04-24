---
title: "EN 17660 — European Standard for Air Quality Sensor System Performance Evaluation"
type: concept
tags: [standards, CEN, EN17660, certification, regulatory, sensor-testing, DQO]
created: 2026-04-23
updated: 2026-04-23
sources: ["CEN:TC 17660-1-2021.pdf", "CEN:TC 17660-2-2024.pdf", "CEN-TC 264_N3553_Letter_Result_of_voting_prelNWIs_EN17660-1_and_-2_WG42.pdf"]
---

# EN 17660 — European Standard for Air Quality Sensor Performance Evaluation

## What It Is

**EN 17660** is a European standard series developed by **CEN/TC 264 "Air quality"** (Working Group 42, secretariat at DIN Germany). It defines how **low-cost air quality sensor systems** should be tested, evaluated, and classified for use in ambient air monitoring.

The standard is currently published as a **Technical Specification (CEN/TS)**, but as of March 2026, both parts have been formally adopted as preliminary work items for conversion to full **European Standards (EN)** — see [[wiki/sources/en17660-n3553-voting-letter]].

## Why It Matters

EN 17660 is **the** certification benchmark for low-cost AQ sensors in the EU regulatory and procurement space. It creates a framework that:
1. Defines **three performance classes** (Class 1–3) with objective thresholds.
2. Provides a **standardised, repeatable test protocol** accepted across all EU member states.
3. Gives **buyers (municipalities, regulators)** a reliable way to compare sensor system claims.
4. Determines **regulatory admissibility** — Class 1 can be used for indicative measurements under EU air quality directives.

For Airqoon, having EN 17660 test results — and ideally a certified class — is essential for positioning in the EU public sector market.

## Structure

| Document | Coverage | Status (as of 2026-04) |
|----------|----------|------------------------|
| **CEN/TS 17660-1:2021** | Gaseous pollutants (NO₂, SO₂, O₃, CO, etc.) | Published TS → being upgraded to prEN |
| **FprCEN/TS 17660-2:2024** | Particulate matter (PM₂.₅, PM₁₀, coarse) | Published TS → being upgraded to prEN |

Both are scanned image-PDFs (no text layer) — OCR required for programmatic access.

## The Three Classes

| Class | Regulatory Status | Expanded Uncertainty Target at LV |
|-------|------------------|-----------------------------------|
| **Class 1** | Indicative measurements — usable under EU Directive | ≤ 25% |
| **Class 2** | Objective estimations — lesser regulatory role | ≤ 30% |
| **Class 3** | Non-regulatory — research, education, citizen science | ≤ 50% (relaxed) |

- "LV" = Limit Value as defined in EU Directive 2008/50/EC (soon: **Directive 2024/2881**).
- Uncertainty is **expanded** (k=2, ~95% confidence), computed as RSS of all error contributions.
- Classification is **site-specific** — results from one climate/site type don't automatically transfer.

## Test Protocol Summary

### For Gases (Part 1)
Four-step protocol with decision gates at each step:

```
Step 1 (mandatory): Lab pre-test
  ├─ Response time
  ├─ Lack of fit (linearity)
  └─ Repeatability + LOD

Then choose:
  Option A: Step 2 (lab) + Step 3 (short field)
  Option B: Step 4 (extended field, double sites)

Classification: Class 1 → 2 → 3 → No class
```

### For PM (Part 2)
Simpler, field-test-dominant:

```
Step 1 (mandatory): Lab — coarse particle test
  └─ Exposure chamber, PM₁₀₋₂.₅ characterisation

Step 2 (mandatory): Field tests
  ├─ Co-location at AQMS with reference (EN 12341) + equivalent (EN 16450) methods
  ├─ Multiple sites, required duration
  └─ RH sensitivity documented
```

## Key Test Parameters and Infrastructure

### Laboratory
- **Exposure chamber**: Sealed volume with controlled T, RH, aerosol/gas concentration, and airflow.
- **Reference instruments**: Must comply with EU directives (gas analysers or equivalent PM methods).
- **Competent body**: EN ISO/IEC 17025 accredited test lab required for classification to be valid.

### Field
- Co-location at **official AQMS** (Air Quality Monitoring Stations).
- Both reference and equivalent methods co-located simultaneously.
- Data used to compute expanded uncertainty via regression analysis.

## Connection to EU Regulatory Framework

### Directive 2008/50/EC (current)
The "Ambient Air Quality Directive" — sets LVs for PM₂.₅, PM₁₀, NO₂, SO₂, O₃, CO, etc. EN 17660 DQOs are calibrated to this directive's "indicative measurements" (25% uncertainty) and "objective estimation" (30% uncertainty) categories.

### Directive 2024/2881 (new AAQD — in force)
The revised Air Quality Directive, which will repeal 2008/50/EC. Key changes:
- **PM₂.₅ annual mean LV** drops from 25 µg/m³ to **10 µg/m³** (WHO guideline).
- **NO₂ annual mean LV** drops from 40 µg/m³ to **20 µg/m³**.
- Other pollutants also tightened.

**Impact on EN 17660 Class 1:** At a lower LV, 25% of LV becomes a smaller absolute number. For PM₂.₅: 25% × 10 µg/m³ = **2.5 µg/m³** expanded uncertainty allowed (vs. 25% × 25 = 6.25 µg/m³ currently). This is a **significantly harder bar** for low-cost sensors.

France (AFNOR) flagged this explicitly in the N3553 voting — the EN versions will need to reference the new Directive, making Class 1 certification notably harder to achieve.

## Airqoon's Position

### Current State
- Airqoon's internal test process (`Airqoon-Sensor-Üniteleri-Test-Süreci-17660.md`) is **directly modelled on EN 17660**.
- Airqoon has conducted field co-location studies (e.g., İnegöl — R² = 0.97 for PM₂.₅ vs. reference) that correspond to the field test requirements.
- **Formal class certification status unknown** from existing documentation — this should be confirmed.

### Strategic Implications
1. **Class 3** is achievable relatively easily and provides a defensible marketing claim ("EN 17660 tested").
2. **Class 1** for gases would be a major differentiation — few low-cost sensor companies achieve it.
3. **Class 1 PM** will become harder under Directive 2024/2881 — best to pursue before the EN hardens.
4. **TSE (Turkey)** abstained in the N3553 vote — Turkey is not actively driving adoption. Airqoon may need to self-educate Turkish municipality customers on EN 17660 significance.
5. When prEN 17660-1/-2 become full ENs, **EU public tenders** will likely cite them — Airqoon needs certified results to qualify.

### Gaps to Address
- Formally determine which EN 17660 Class Airqoon's current test data supports.
- Obtain formal type-testing through an accredited competent body (EN ISO/IEC 17025 lab).
- Document RH correction methodology for PM sensors (required for EN 17660-2 compliance).
- Plan for Directive 2024/2881 tighter LVs and what that means for the Class 1 uncertainty budget.

## Related Wiki Pages

- [[wiki/sources/en17660-1-gaseous-pollutants]] — Detailed Part 1 summary
- [[wiki/sources/en17660-2-particulate-matter]] — Detailed Part 2 summary
- [[wiki/sources/en17660-n3553-voting-letter]] — March 2026 voting result
- [[wiki/sources/inegol_pm_presentation]] — Airqoon's field validation (ASIC2026)
- [[wiki/concepts/low-cost-air-sensors]]
- [[wiki/entities/unit-l]]
- [[wiki/entities/airqoon]]
