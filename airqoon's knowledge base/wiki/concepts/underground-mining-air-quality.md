---
title: "Underground Mining Air Quality"
type: concept
tags: [mining, regulatory, hardware, environment]
created: 2026-05-04
updated: 2026-05-04
sources: [maden-arastirma.md]
---

# Underground Mining Air Quality

Monitoring air quality in underground mines presents extreme environmental challenges and strict regulatory thresholds compared to ambient urban monitoring.

## Regulatory Thresholds (Turkey)
Based on the "Maden İşyerlerinde İş Sağlığı ve Güvenliği Yönetmeliği":
- **Oxygen (O₂):** Must be > 19.5% (danger at 17%). Drops indicate oxidation or displacement by other gases.
- **Carbon Dioxide (CO₂):** Max 5000 ppm (0.5%). Concentrations can rise > 3% causing respiratory failure.
- **Carbon Monoxide (CO):** Max 50 ppm. Indicator of hidden fires or incomplete combustion.
- **Hydrogen Sulfide (H₂S):** Max 10 ppm. Highly toxic even at low levels.
- **Methane (CH₄):** Safety limit is 1%. Explosive between 4% - 15%.

## Environmental Challenges
- **Pressure Variations:** Deep shafts alter atmospheric pressure, requiring active barometric compensation for oxygen sensors.
- **Vibration & Shock:** Frequent blasting and heavy machinery require solid-state sensors without moving parts.
- **Dust & Moisture:** IP66/IP67 enclosures, sintered filters, and desiccant/Gore-Tex vents are required to prevent sensor optical path blockage and electrolyte leaks.
- **Power Constraints:** Lack of sunlight necessitates ultra-low-power sensors (e.g., LED NDIRs drawing ~21 µA) to maximize battery longevity.
- **Sensor Poisoning:** Pellistor (catalytic) methane sensors are easily poisoned by H₂S or silicon and fail without oxygen. NDIR sensors are immune to these issues and therefore vastly preferred for underground CH₄ monitoring.

*See also: [[wiki/sources/maden-arastirma.md|Maden Araştırma Raporu]], [[wiki/entities/unit-l|Unit L]], [[wiki/entities/demir-export|Demir Export]]*
