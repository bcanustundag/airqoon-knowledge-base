---
title: "Airqoon Map"
type: entity
entity_type: product
tags: [airqoon, software, public, map, aqi]
created: 2026-04-29
updated: 2026-04-29
sources: [airqoon-base-map-ui.md, airqoon-base-map-consumer.md]
---

# Airqoon Map

> Airqoon's public-facing environmental data visualization application. Designed for municipalities and enterprise clients to provide hyperlocal, transparent air pollution management and citizen engagement.

---

## Architecture & Tech Stack

- **Frontend (Base Map UI):** React 18.2.0 + TypeScript, built with Vite. Uses Redux Toolkit, SCSS, Leaflet 1.9.4 for maps, and Recharts for data visualization. Available as a Dockerized container.
- **Backend (Base Map Consumer):** Node.js backend service that synchronizes telemetry data from IoT devices. Integrates with AWS SQS, RabbitMQ, MongoDB, and the Airqoon Weather Service.
- **APIs:** Supports both v1 and v2 API endpoints with automatic error handling, retry logic, and maintenance page fallbacks.

---

## Core Features

### Air Quality & Data Visualization
- **Multi-Standard AQI:** Supports dynamic recalculation and visualization according to EEA, US-EPA, US-EPA-Nowcast, and Turkiye standards.
- **Heat Maps:** Advanced IDW (Inverse Distance Weighting) spatial interpolation for both pollution distribution and temperature mapping.
- **Smart Fire Detection:** Integrates satellite fire detection data refreshed every 24 hours. Sorts fires by confidence level (displaying the top 100 highest-quality fires).
- **Device Markers:** Real-time device locations with color-coded quality indicators matching international standards. Detailed fly-out views for specific monitoring stations.

### User Experience & Engagement
- **Multi-language:** Full support for English and Turkish via `i18next`.
- **Citizen Feedback:** Includes a location-based air quality issue reporting system, empowering citizens to log complaints directly on the map.
- **Customization:** Light, Dark, and System theme selections, along with unit preferences and accessible, mobile-responsive design.

---

*See also: [[Airqoon]], [[wiki/entities/airqoon-lens|Airqoon Lens]], [[wiki/entities/unit-l|Unit L]]*
