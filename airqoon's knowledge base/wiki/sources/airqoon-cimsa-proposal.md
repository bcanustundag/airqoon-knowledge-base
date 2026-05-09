---
title: "Source: Airqoon–Çimsa EBRD Dust Monitoring Proposal"
type: source
tags: [project, ebrd, cimsa, cement, dust-management, proposal, tender, perimeter-monitoring, dispersion-modelling, ml, satellite]
created: 2026-05-08
updated: 2026-05-08
sources: [TOR_TC_CIMSA_Dust Monitoring Assignment_Issued for RFP.pdf, airqoon_cimsa_proposal_v6_final-3.pdf]
---

# Source: Airqoon–Çimsa EBRD Dust Monitoring Proposal

**Raw files:**
- `raw/articles/TOR_TC_CIMSA_Dust Monitoring Assignment_Issued for RFP.pdf` — EBRD Terms of Reference (17 pages)
- `raw/articles/notion/airqoon_cimsa_proposal_v6_final-3.pdf` — Airqoon Technical Proposal v3 (submitted)

---

## Summary

Two companion documents for a **12-month EBRD-mandated environmental consulting assignment** at [[wiki/entities/cimsa|Çimsa]]'s Mersin cement manufacturing plant (Project Limestone). The EBRD requires Çimsa to implement a comprehensive **Dust Management Plan (DMP)** as an Environmental & Social Action Plan (ESAP) item (Action 3.4), covering the full area of influence including quarries, access roads, and the nearby Tekke/Yaka settlements.

[[wiki/entities/airqoon|Airqoon]] (lead) and **Istanbul University-Cerrahpaşa, Department of Environmental Engineering** (academic partner, led by [[wiki/sources/ulku-alver-sahin-projects|Prof. Dr. Ülkü Alver Şahin]]) submitted a joint technical proposal responding to the RFP.

---

## EBRD Terms of Reference — Key Requirements

### Project Context
- **Client:** Çimsa Çimento Sanayi ve Ticaret A.Ş. (Mersin plant)
- **Lender:** EBRD (European Bank for Reconstruction and Development)
- **Project Name:** "Project Limestone"
- **Trigger:** ESAP Action 3.4 — Implement a Dust Management Plan before the 5th CAC kiln and other investments become operational, to generate credible pre-investment baseline data

### Assignment Title
*"Satellite-based AI Environmental Monitoring of the CIMSA Cement Manufacturing Plant in Mersin"*

### Dust Categories to Monitor
1. **Raw Material Dust** — crushing, grinding, handling of limestone, clay, correctives (coarse particles)
2. **Kiln & Clinker Process Dust** — calcination, kiln firing, clinker cooling (fine, reactive; CaO, SiO₂, Al₂O₃, trace heavy metals)
3. **Cement Dust** — clinker grinding, milling, storage, packing (very fine Portland cement minerals, respiratory hazard)

### Six TOR Tasks
| Task | Description |
|------|-------------|
| T1 | Desktop Review & Data Collection |
| T2 | Dust Source Mapping & Receptor Identification |
| T3 | Site Visit |
| T4 | Initial Screening (historical air quality) |
| T5 | Modelling & Monitoring Strategy Development |
| T6 | Final Dust Management Plan & Reporting |

### Seven Required Deliverables
1. Baseline Environmental Report
2. Timelapse Change Detection Report (2018–present satellite imagery)
3. Periodic Monitoring Reports (monthly/quarterly)
4. PM Dispersion Maps & ML Source Attribution
5. Final Environmental Impact Report & Dust Management Plan
6. Custom Dashboard User Interface
7. *(Implicit)* Monitoring system specification & handover package

### Applicable Standards & Regulations
- **EBRD ESR3** (Environmental & Social Requirements)
- **EU IED 2010/75/EU** — Annex I §3.1 (cement clinker > 500 t/day), §5.2 (waste co-incineration)
- **BAT Conclusions** for Cement/Lime/MgO (Decision 2013/163/EU) — BAT 5 (monitoring), BAT 14–18 (dust control)
- **EU CAFE Directive 2024/2881** — new PM₂.₅ limit of 10 µg/m³ (2030 targets)
- **WHO Air Quality Guidelines 2021**
- **Türkiye's Regulation on Industrial Emission Management** (Resmi Gazete 32782, 2025)
- **SKHKKY** (Turkish industrial air pollution control, RG 27277, 2009)

### DMP Required Components
1. Emission inventory (all channeled, diffuse, and fugitive sources)
2. Process-specific dust control matrix (per BAT 14–18)
3. Sensitive receptor analysis (Tekke & Yaka settlements)
4. Operational improvements and control hierarchy
5. Worker protection and training
6. Monitoring strategy and KPIs
7. Grievance and complaint management
8. Implementation roadmap with phased actions

---

## Airqoon Technical Proposal v3 — Key Content

### Consortium
| Name | Organization | Role |
|------|-------------|------|
| [[wiki/entities/baris-can-ustundag|Barış Can Üstündağ]] | Airqoon (Lead) | Technical Lead & ML/AI |
| Gülkan Güner | Airqoon | Sensor QA/QC |
| Orkun Şentürk | Airqoon | Cloud & Dashboard |
| Prof. Dr. Ülkü Alver Şahin | IUC Environmental Engineering | Scientific Director |
| Coşkun Ayvaz PhD | IUC Environmental Engineering | Environmental Engineer, Researcher |
| Sedef Bayram | IUC Environmental Engineering | Remote Sensing Specialist |

### Four Work Packages (12 months)

#### WP 1 — Desktop Review, Data Collection & Historical Baseline [M1–3]
- Review CIMSA environmental permits, stack reports, existing AERMOD outputs
- BAT gap analysis (BAT 5, 14–18)
- Satellite-derived AOD (MODIS MAIAC 500m daily), Sentinel-5P/TROPOMI (NO₂, SO₂, CO)
- ERA5/MERRA-2 meteorological reanalysis
- SEÖS (stack emissions) data analysis
- **Output:** Baseline Environmental Report (Deliverable 1)

#### WP 2 — Dust Emission Mapping, Site Visit & Monitoring System [M3–6]
- Georeferenced emission source inventory (3 dust categories)
- Point/channeled sources assessed against BAT 16–18
- Diffuse/fugitive sources against BAT 14
- Road/quarry dust against BAT 15
- Sensitive receptors: Tekke & Yaka settlements, agricultural land, schools
- **6-node PM sensor network** deployed (OPC for PNSD + PM mass)
- Physicochemical sampling: every-6th-day protocol, ~35 events, ~70 PM₁₀/PM₂.₅ filter pairs
- EPA-PMF receptor modelling for source apportionment
- **Airqoon Lens platform** configured and handed over by Month 6
- **Outputs:** Dust Map & Receptor Report (D2), Site Visit Report (D3), Monitoring System Handover (D5)

#### WP 3 — Dispersion Modelling, AI/ML Analytics & Dashboard [M3–10, parallel]
- **Integrated atmospheric modelling suite** (4 capabilities):
  1. Particle size distribution modelling (ERA5 + OPC ground-truth)
  2. Plume modelling (point sources under varying conditions)
  3. Particle dispersion modelling (coarse vs. fine fractions, deposition)
  4. HYSPLIT trajectory analysis (forward + backward transport pathways)
- **Satellite time-series plume quantification** — Sentinel-2 & MODIS, 2018–present archive, dust plume area/optical depth over time
- **Multi-source ML fusion model** — fuses satellite imagery, ground sensor data, ERA5 meteorology, and CIMSA process data to attribute pollution sources and quantify contributions
- Real-time monitoring dashboard (Airqoon Lens) with KPI compliance scorecards against CAFE 2024/2881 and BAT-AEL thresholds
- **Outputs:** PM Dispersion Maps & ML Attribution Report (D4), Timelapse Change Detection (D2), Physicochemical Dust Report (D8)

#### WP 4 — Dust Management Plan & Final Reporting [M10–12]
- Integrates all evidence from WPs 1–3
- Full ESAP-compliant DMP with all 8 required components
- Implementation roadmap aligned with CAFE 2024/2881 2030 targets and WHO AQGs 2021
- **Output:** Final DMP + Environmental Impact Report (D5)

### Deliverables Table

| # | Deliverable | Lead | Month | TOR ref |
|---|------------|------|-------|---------|
| 1 | Baseline Environmental Report | S. Bayram / Prof. Alver Şahin / C. Ayvaz | 3 | Del.1/T1,T4 |
| 2 | Dust Map & Receptor Report | B.C. Üstündağ / C. Ayvaz | 4 | T2 |
| 3 | Site Visit Report | B.C. Üstündağ / C. Ayvaz | 3 | T3 |
| 4 | Monthly Periodic Reports (×9) | O. Şentürk / full team | 4–12 | Del.3 |
| 5 | Monitoring System Specification & Handover | G. Güner / O. Şentürk | 6 | T5 |
| 6 | Timelapse Change Detection Report | S. Bayram / Prof. Alver Şahin / B.C. Üstündağ | 8 | Del.2 |
| 7 | PM Dispersion Maps & ML Source Attribution | Prof. Alver Şahin / B.C. Üstündağ | 9 | Del.4/T5 |
| 8 | Physicochemical Dust Report | Prof. Alver Şahin / C. Ayvaz | 10–11 | T2 |
| 9 | Final DMP + Environmental Impact Report | Full consortium | 12 | Del.5/T6 |

### Key Consortium Capabilities Claimed
- **Cement plant experience:** Prior Airqoon deployments at cement facilities (Akçansa, etc.)
- **Published ML/CV research:** Barış Can Üstündağ peer-reviewed in image classification and sensor data fusion
- **Co-authored academic work:** Ayvaz et al. 2024 (Spectrochimica Acta Part A), Ayvaz et al. 2025 (Environmental Pollution), İnegöl PM paper under review (Atmospheric Pollution Research)
- **Production cloud platform:** Existing Airqoon Lens infrastructure (not a greenfield build)
- **Regulatory knowledge:** Prof. Şahin teaches environmental law; familiarity with EU CAFE, IED, BAT, and Turkish regulations

---

## Key Takeaways for Airqoon

1. **Highest-value project to date** — This is an EBRD-mandated assignment, establishing Airqoon as a credible environmental consultant for international financial institutions, not just a sensor vendor.
2. **Lens platform as deliverable** — The Airqoon Lens instance is a formal, contractual handover deliverable (D5/D6), creating long-term platform lock-in with Çimsa.
3. **Academic credibility** — Partnering with Prof. Alver Şahin elevates Airqoon's positioning from "IoT startup" to "environmental intelligence consortium."
4. **Regulatory depth** — The proposal demonstrates fluency across EBRD ESR3, EU IED/BAT, CAFE 2024/2881, WHO AQGs, and Turkish law — a strong differentiator vs. competitors who sell hardware only.
5. **ML/AI as core differentiator** — Multi-source fusion model (satellite + ground sensors + meteorology + process data) goes well beyond traditional monitoring, positioning Airqoon for the [[wiki/analyses/teknopark-aq-fusion-proposal|AQ-Fusion]] roadmap.
6. **6-node sensor network** — Hardware deployment is embedded within a larger consulting engagement, demonstrating the "monitoring-as-a-service" partnership model recommended in the [[wiki/analyses/gtm-analysis|GTM Analysis]].
7. **Replicable template** — This proposal structure (TOR response + consortium + DMP methodology) can be reused for similar EBRD/IFC projects at other cement plants (Oyak, Çimentaş, etc.).

---

## Entities Referenced
→ [[wiki/entities/airqoon|Airqoon]], [[wiki/entities/cimsa|Çimsa]], [[wiki/entities/baris-can-ustundag|Barış Can Üstündağ]], [[wiki/entities/airqoon-lens|Airqoon Lens]], [[wiki/concepts/perimeter-monitoring|Perimeter Monitoring]], [[wiki/concepts/en17660-standard|CEN/TS 17660]], [[wiki/analyses/teknopark-aq-fusion-proposal|AQ-Fusion Proposal]], [[wiki/analyses/gtm-analysis|GTM Analysis]]
