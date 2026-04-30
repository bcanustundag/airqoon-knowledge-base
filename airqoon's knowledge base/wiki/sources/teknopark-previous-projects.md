---
title: "Source: Teknopark Previous Projects (İnovathink/Airqoon)"
type: source
tags: [teknopark, stb, inovatink, innovathink, iot, edge-computing, 4blocks, fluorescence, sensor]
created: 2026-04-30
updated: 2026-04-30
sources: ["Teknopark/1st-project/", "Teknopark/2nd-project/", "Teknopark/3rd-project/"]
---

# Teknopark Previous Projects — İnovathink / Airqoon

This document synthesizes all four completed STB (Sanayi Tezleri / Teknopark) R&D projects submitted by the company (originally as İnovathink / Inovatink, now operating as Airqoon).

---

## Project 1: Akıllı Uç Bilişim Uygulaması Geliştirmesi
**STB Kodu:** 070382
**Teknopark:** Marmara Üniversitesi Teknopark (Marmara Tek)
**Date:** ~2021

### Summary
Development of edge computing capabilities for the company's existing IoT endpoint embedded systems. The project aimed to:
- Move cloud-based processing to edge devices to improve performance
- Reduce load on cloud infrastructure
- Accelerate transition to ML/AI at the edge
- Provide device autonomy

### Key Technical Outputs
- No-code/low-code environment for business process deployment to edge devices
- Node-RED based configuration system generating config files for edge devices
- Edge device self-configuration based on received configs
- ML model training and inference pipeline for edge deployment
- Independent from major cloud providers (AWS, Azure) — platform-agnostic approach

### R&D Significance
- Focused on **microcontroller-based** edge computing (baremetal/RTOS), not microprocessor-based
- Differentiated from AWS IoT Greengrass, Azure IoT Edge by being vendor-independent
- Created a pathway from simple thresholding to ML model deployment on constrained devices

---

## Project 2: Nesnelerin İnterneti Uç Nokta Verilerinin Analiz ve Görselleştirme Platformunun Geliştirilmesi
**STB Kodu:** 076102
**Teknopark:** Marmara Üniversitesi Teknopark (Marmara Tek)

### Summary
Development of analytics and visualization blocks for IoT endpoint data from the company's cloud system, serving diverse customers with customizable analysis and visualization tools.

### Key Technical Outputs
- Statistical analysis blocks for sensor data (Hampel filter, MAD filters)
- Heat maps and various graphical visualizations on map interfaces
- Autonomous periodic reporting system
- ML-based prediction pipeline (Jupyter notebooks → cloud deployment)
- Microservices architecture on Kubernetes with Docker containers
- AWS Lambda for serverless hourly averages and statistical operations
- MQTT broker integration for data ingestion

### Evolution
- Originally planned as a generic standalone application
- Pivoted to a flexible middleware layer based on field/customer feedback
- Applied first to the airqoon air monitoring platform (20+ customers, 200+ field nodes)
- Target markets: Eastern Europe, Balkans, North Africa, Middle East

### Relation to Current Products
This project directly evolved into **[[wiki/entities/airqoon-lens|Airqoon Lens]]** — the current enterprise analytics platform.

---

## Project 3: Hava Kirliliği Ölçümü İçin Floresans Tabanlı Gaz Sensörü Mimarisinin Geliştirilmesi
**STB Kodu:** 085513

### Summary
Development of a fluorescence-based gas sensor architecture for measuring air pollutants (specifically NOx and O₃). The project aimed to create a novel sensing approach using fluorescent active layers.

### Key Technical Goals
- Design fluorescence-based gas sensor modules and produce prototypes
- Develop data processing, transmission, and analysis platforms for these sensors
- Conduct laboratory and field testing
- Target 20% higher sensitivity/selectivity vs. existing sensors
- 15% lower maintenance requirements
- 30-50% lower cost than current commercial sensors

### R&D Significance
- Novel approach using fluorescence emission intensity changes for gas detection
- Required optimization of both recognition chemistry and fluorescent signal
- International competitiveness goal — entering comparison measurements with foreign firms
- Aimed to reduce Turkey's dependence on imported sensor technology

---

## Project 4: 4Blocks Donanım Mimarisi ile Esnek IoT Uygulamaları Geliştirme
**STB Kodu:** 093950
**Teknopark:** Teknopark İstanbul (latest project)

### Summary
Development of a modular IoT hardware architecture called "4Blocks" — four functional hardware blocks enabling flexible IoT application development.

### The 4Blocks Architecture
1. **Güç Bloğu (Power Block):** Power management, protection, voltage conversion. Li-Po battery for lightweight/long-duration operation.
2. **Hesaplama Bloğu (Computation Block):** SAMD21 microcontroller, flash memory, crypto memory for security.
3. **Bağlantı Bloğu (Connectivity Block):** ESP32-C for WiFi and BLE communication.
4. **Çevresel Blok (Peripheral Block):** Application-specific sensors, actuators, and conditioning circuits.

### Key Technical Outputs
- Modular hardware design methodology applicable to 15+ IoT verticals
- JSON data standardization across heterogeneous devices
- RESTful API integration
- Device discovery, registration, and management system
- Security and authorization mechanisms
- Future-proof extensibility for new device types and protocols

### Target Applications
Smart home, smart city, scientific studies, energy, security, manufacturing, construction, public sector, healthcare, agriculture, transportation, commercial

### R&D Significance
- Addressed IoT interoperability problem — no common standard across manufacturers
- Deductive reasoning + inductive validation methodology for defining functional blocks
- Modular approach enables cost reduction through easy part replacement/upgrade

---

## Company Evolution Timeline

| Period | Company Name | Focus |
|--------|-------------|-------|
| ~2019-2022 | Inovatink / İnovathink | Generic IoT toolkit, edge computing, platform services |
| 2022-2024 | Transition period | Pivot to air quality vertical (airqoon brand) |
| 2024-present | Airqoon (İnovathink legal entity) | Air quality monitoring: Unit L/M hardware, Lens platform, Map |

### Continuity Thread
All four projects built sequentially on each other:
- **Project 1** (Edge Computing) → foundation for on-device intelligence
- **Project 2** (Analytics Platform) → evolved into Airqoon Lens
- **Project 3** (Fluorescence Sensor) → deepened sensor R&D expertise
- **Project 4** (4Blocks) → modular hardware methodology → applied to Unit L/M design

---

*See also: [[wiki/entities/airqoon|Airqoon]], [[wiki/entities/unit-l|Unit L]], [[wiki/entities/airqoon-lens|Airqoon Lens]]*
