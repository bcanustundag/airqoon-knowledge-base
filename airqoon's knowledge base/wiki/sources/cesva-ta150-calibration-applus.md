---
title: "Cesva TA150 Calibration Certificate — Applus 1/3-Octave Filters"
type: source
tags: [competitor, cesva, noise_sensor, calibration, certificate, applus, iec_61260, metrology]
created: 2026-05-15
updated: 2026-05-15
sources: [raw/articles/CL_TA150-APPLUS-FILTERS_v0001_EN.pdf]
related:
  - "[[wiki/entities/cesva|Cesva]]"
  - "[[wiki/sources/cesva-ta150-datasheet|Datasheet]]"
  - "[[wiki/sources/cesva-ta150-user-manual|User Manual]]"
---

# Cesva TA150 Calibration Certificate — Applus 1/3-Octave Filters

> Reference: CL_TA150-APPLUS-FILTERS_v0001_EN (33 pages)

## Certificate Summary

| Field | Value |
|-------|-------|
| **Certificate number** | 00595179 |
| **Issuing laboratory** | LGAI Technological Center, S.A. (Applus) |
| **Accreditation** | ENAC (Spanish National Accreditation Body) |
| **Location** | Campus UAB, Ronda de la Font del Carme, s/n, 08193 Bellaterra, Barcelona, Spain |
| **Item tested** | Acoustic Filter Set |
| **Device** | CESVA TA150 (Type 1) |
| **Serial number** | T260514 |
| **Applicant** | CESVA Instruments S.L.U., C/ Maracaibo 6-8, 08030 Barcelona |
| **Calibration date** | 2025-02-24 |
| **Signed by** | Juanjo Sanz (Technical Manager), Eusebi Ruiz Solà (Technician) — 2025-02-28 |
| **Electronic signature** | CSV: 52162834847ZV (verifiable at https://apps.applus.solutions/metrosign/) |

---

## Calibration Procedure
- **Standard:** Internal procedure C2620817, based on **UNE-EN ISO 61260-3:2016**
- **Object:** Verification of the 1/3-octave band filter responses

## Calibration Conditions
| Parameter | Value |
|-----------|-------|
| Temperature | 22 ± 2 °C |
| Relative humidity | 50 ± 10% |
| Atmospheric pressure | 1013 ± 2 mbar |

## Calibration Uncertainty
- Expanded uncertainty with coverage factor **k = 2** (~95% coverage probability)
- Determined per **EA-4/02 M** methodology
- Filter measurement uncertainty: **± 0.1 dB** for all bands

---

## Traceability Chain

### Standards Used
| Inventory | Description | Make | Model | Serial | Traced to |
|-----------|-------------|------|-------|--------|-----------|
| 102948A | Signal generator | Agilent | 33220A | MY44057589 | FLUKE (NL) |
| 102994A | Multimeter | Agilent | U8903A | MY51050013 | FLUKE (NL) |
| 102321 | Thermohygrometer | ABB | CR 140 | PR.100 | INTA (ES) |
| P-99-025 | Barometer | RUSKA | 6220 | 44143 | CEM (ES) |

### Reference Standard
| Inventory | Description | Make | Model | Serial | Traced to |
|-----------|-------------|------|-------|--------|-----------|
| 102336 | Electrical calibrator | FLUKE | 5520A | 7840009 | FLUKE (NL) |

---

## Filters Verified
The certificate contains individual **frequency response curves** (attenuation vs frequency + zoom of central passband area) for **18 one-third-octave filters**:

| # | Filter | # | Filter |
|---|--------|---|--------|
| 1 | 16 Hz | 10 | 500 Hz |
| 2 | 20 Hz | 11 | 630 Hz |
| 3 | 25 Hz | 12 | 800 Hz |
| 4 | 32 Hz | 13 | 1 kHz |
| 5 | 40 Hz | 14 | 1.25 kHz |
| 6 | 50 Hz | 15 | 1.6 kHz |
| 7 | 63 Hz | 16 | 2 kHz |
| 8 | 80 Hz | 17 | 2.5 kHz |
| 9 | 100 Hz | 18 | 3.15 kHz |
| — | 125 Hz | 19 | 4 kHz |
| — | 160 Hz | 20 | 5 kHz |
| — | 200 Hz | 21 | 6.3 kHz |
| — | 250 Hz | 22 | 8 kHz |
| — | 316 Hz | 23 | 10 kHz |
| — | 400 Hz | 24 | 12.5 kHz |
| — | — | 25 | 16 kHz |

Each filter page shows the full attenuation curve and a zoomed view of the central passband area, all with **± 0.1 dB** measurement uncertainty.

---

## Significance for Airqoon
- Confirms the TA150's **FR150 module** filter accuracy is independently verified by an **ENAC-accredited** laboratory
- The calibration follows **IEC 61260-3:2016** — the same standard family referenced by EN noise monitoring regulations
- Provides metrological confidence when positioning the TA150 alongside Airqoon's air quality sensors for combined air+noise monitoring proposals
- The traceability chain (Applus → FLUKE NL, INTA ES, CEM ES) demonstrates compliance with ISO 17025 quality management

## Source
- [[raw/articles/CL_TA150-APPLUS-FILTERS_v0001_EN.pdf]]
