---
title: "Maden Araştırma Raporu (Demir Export)"
type: source
tags: [mining, underground, demir-export, hardware, unit-l, sensors]
created: 2026-05-04
updated: 2026-05-04
sources: [maden-arastirma.md]
---

# Maden Araştırma Raporu (Demir Export)

**Source File:** `raw/articles/maden-arastirma.md`

## Summary
Technical evaluation report detailing the adaptation of the [[wiki/entities/unit-l|Airqoon Unit L]] platform for environmental gas monitoring in underground mining operations, specifically for [[wiki/entities/demir-export|Demir Export]]. The report defines the regulatory and engineering requirements for measuring O₂, CO₂, CO, CH₄, and H₂S, and recommends specific sensor technologies (Alphasense, Senseair, MIPEX, Cubic) to replace traditional or less robust alternatives like pellistors and photoacoustic NDIRs.

## Key Takeaways

- **Regulatory Framework:** Driven by the Turkish Ministry of Labor's "Maden İşyerlerinde İş Sağlığı ve Güvenliği Yönetmeliği." Minimum O₂ is 19.5% (danger at 17%); max CO₂ is 5000 ppm (0.5%); max CO is 50 ppm; max H₂S is 10 ppm; and CH₄ safety limit is 1%.
- **Sensor Technology Decisions:**
  - **O₂:** Recommended Alphasense LFO2-A1 (lead-free amperometric) for a 5+ year lifespan instead of traditional 2-year galvanic sensors.
  - **CO & H₂S:** Alphasense COH-A2 Dual Sensor to save ADC channels and space, filtering cross-sensitivity.
  - **CO₂:** Senseair Sunrise / Sunlight (True NDIR) is chosen over photoacoustic (Sensirion SCD4x) due to resilience against pressure fluctuations in mines and very low power consumption (21 µA).
  - **CH₄ (Methane):** NDIR sensors (MIPEX-04 or Cubic SJH-100) are heavily preferred over pellistor sensors. Pellistors fail in oxygen-depleted environments and are easily poisoned by H₂S or silicon vapors.
- **Hardware Adaptations for Unit L:**
  - **Enclosure Hardening:** IP34 is insufficient; must upgrade to IP66/IP67 using seals and glands.
  - **Filtration:** Sintered stainless steel filters for gas inlets to block dust.
  - **Condensation Management:** Gore-Tex vents or desiccant packets to prevent electrolyte expansion in electrochemical sensors.
  - **Barometric Compensation:** Deep mine pressure increases require software-side compensation of O₂ sensor readings using the onboard barometer.
- **Connectivity:** 4G/NB-IoT in main shafts, with robust local data logging for offline galleries, synching to Airqoon Cloud upon connection. Uses Rate of Rise (RoR) analysis for early alarms.

## Entities Mentioned
- [[wiki/entities/airqoon|Airqoon]]
- [[wiki/entities/unit-l|Unit L]]
- [[wiki/entities/demir-export|Demir Export]] (Client)
- [[wiki/entities/alphasense|Alphasense]] (Sensor Manufacturer)
- [[wiki/entities/senseair|Senseair]] (Sensor Manufacturer)
- MIPEX / Cubic (NDIR Sensor Manufacturers)
- Sensirion (Competitor sensor mentioned as less suitable)

## Concepts Mentioned
- [[wiki/concepts/underground-mining-air-quality|Underground Mining Air Quality]]
- True NDIR vs Photoacoustic NDIR
- Pellistor vs NDIR Methane Sensors
- Rate of Rise (RoR) Analysis
