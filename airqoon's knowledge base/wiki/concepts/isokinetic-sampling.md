---
title: "Isokinetic Sampling"
type: concept
tags: [sampling, methodology, particulate-matter, hardware]
created: 2026-05-04
updated: 2026-05-04
sources: [drone-monitoring.md]
---

# Isokinetic Sampling

**Isokinetic sampling** is a critical fluid dynamics requirement for the accurate measurement of airborne particulate matter (PM), particularly coarse particles like PM10, in dynamic environments. 

## The Principle
The term "isokinetic" means "equal energy" or "equal velocity." In the context of air quality monitoring, it means that the velocity of the air entering the sensor's sampling inlet must be exactly equal to the velocity of the ambient air stream flowing past it.

## Why It Matters
Particulate matter, unlike gas molecules, possesses significant mass and therefore momentum/inertia.
- **Super-Isokinetic (Suction velocity > Ambient velocity):** If the pump pulls air into the inlet faster than the ambient wind speed, the air streamlines converge into the inlet. Small, light particles follow these streamlines. However, large, heavy particles have too much inertia to follow the sharply bending streamlines and bypass the inlet. This results in a reading that is artificially **low** for coarse particles.
- **Sub-Isokinetic (Suction velocity < Ambient velocity):** If the pump pulls air slower than the ambient wind speed, streamlines diverge away from the inlet. Light particles follow the diverging air away, but heavy particles continue on their straight-line trajectory straight into the inlet. This results in a reading that is artificially **high** (enriched) for coarse particles.

## Application in Drone-Based Monitoring
Achieving isokinetic sampling is a major challenge for [[wiki/concepts/drone-based-monitoring|drone-based monitoring]] systems because the drone's flight speed and the ambient wind speed are constantly changing.

Advanced solutions include:
- **Dual-Diffuser Systems:** Passively pump away the turbulent boundary layer at the inlet tip.
- **Vertical Isokinetic Probes:** Placed well above the rotor wash.
- **Dynamic Pumping:** Integrating a sonic anemometer to measure real-time airspeed and dynamically adjusting the micro-diaphragm pump's flow rate to match it, or flagging data points in the software when sampling deviates from isokinetic ideals.

*See also: [[wiki/sources/drone-monitoring.md|Drone Monitoring Integration]]*
