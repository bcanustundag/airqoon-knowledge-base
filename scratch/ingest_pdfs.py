import os
from datetime import datetime

ingest_data = [
    {
        "file": "Kunak_AIR_Datasheet_EN.pdf",
        "slug": "kunak-air-datasheet",
        "title": "Kunak AIR Pro Datasheet",
        "topics": "competitor, kunak, datasheet, specs",
        "content": "Datasheet for Kunak AIR Pro, highlighting MCERTS certification, EPA performance targets, and its plug & play gas cartridge system. It supports up to 16 pollutants."
    },
    {
        "file": "Kunak_Air_CalibrationProcedure_Gashood_EN.pdf",
        "slug": "kunak-air-calibration-gashood",
        "title": "Kunak Air Calibration Procedure (Gashood)",
        "topics": "competitor, kunak, calibration, hardware",
        "content": "Guide on calibrating Kunak AIR Pro and Lite using a gashood. Covers baseline (zero) calibration and span (sensitivity) calibration."
    },
    {
        "file": "Kunak_Air_Correct_cartridge_fitting_EN.pdf",
        "slug": "kunak-air-cartridge-fitting",
        "title": "Kunak Air Correct Cartridge Fitting",
        "topics": "competitor, kunak, hardware, manual",
        "content": "Instructions for correctly fitting cartridges into the Kunak Air device."
    },
    {
        "file": "Kunak_Air_Pro_Calibration_EN.pdf",
        "slug": "kunak-air-pro-calibration",
        "title": "Kunak Air Pro Calibration",
        "topics": "competitor, kunak, calibration",
        "content": "Application note detailing the calibration process for Kunak Air Pro, including outdoor calibration (with reference station, GOLD device, or without reference) and laboratory calibration."
    },
    {
        "file": "Kunak_Air_Pro_MCERT_certification.pdf",
        "slug": "kunak-air-pro-mcert",
        "title": "Kunak Air Pro MCERT Certification",
        "topics": "competitor, kunak, certification, mcerts",
        "content": "MCERTS Product Conformity Certificate for Kunak AIR Pro, certifying its compliance with indicative ambient particulate monitors standards for PM2.5 and PM10."
    },
    {
        "file": "Kunak_Air_Pro_SIMcard_Installation_EN.pdf",
        "slug": "kunak-air-pro-simcard",
        "title": "Kunak Air Pro SIM Card Installation",
        "topics": "competitor, kunak, hardware, sim",
        "content": "Manual detailing the installation and configuration of an external SIM card for 2G/3G/4G communication."
    },
    {
        "file": "Kunak_Air_Pro_UserManual_EN.pdf",
        "slug": "kunak-air-pro-user-manual",
        "title": "Kunak Air Pro User Manual",
        "topics": "competitor, kunak, user-manual",
        "content": "Comprehensive user manual for the Kunak AIR Pro, detailing safety instructions, technical data, and operational guidelines."
    },
    {
        "file": "Kunak_Cartridge_VOCs_Response_Factor.pdf",
        "slug": "kunak-cartridge-vocs-response",
        "title": "Kunak Cartridge VOCs Response Factor",
        "topics": "competitor, kunak, voc, sensors",
        "content": "Information regarding the VOCs Response Factor for Kunak cartridges. It uses a Photoionization Detector (PID) with a 10.6 eV lamp, and warns about placing it near O3, NO2 or SO2 sensors due to ozone generation."
    },
    {
        "file": "Kunak_DeviceConfigurator_UserManual_EN.pdf",
        "slug": "kunak-device-configurator",
        "title": "Kunak Device Configurator User Manual",
        "topics": "competitor, kunak, software",
        "content": "User manual for the Kunak Device Configurator software, outlining system requirements, supported devices, and setup procedures."
    },
    {
        "file": "Report Sample Oct2024.pdf",
        "slug": "oizom-polludrone-calibration-report",
        "title": "Oizom Polludrone Calibration Report Sample",
        "topics": "competitor, oizom, calibration, report",
        "content": "Sample calibration report from October 2024 for an OIZOM Polludrone device (ID: PM01P0013), detailing gas calibration procedures and output for SO2, NO2, CO, and O3."
    },
    {
        "file": "case-study-Air_pollution_monitoring_in_port_areas.pdf",
        "slug": "case-study-port-areas",
        "title": "Case Study: Air pollution monitoring in port areas",
        "topics": "use-case, port, kunak, case-study",
        "content": "Case study on monitoring air pollution and noise in Balearic Islands' ports using Kunak AIR Pro to support the Balearic Port Authority's ISO 14001:2015 environmental management system."
    },
    {
        "file": "case-study-Air_quality_monitoring_at_cement_plant.pdf",
        "slug": "case-study-cement-plant",
        "title": "Case Study: Air quality monitoring at cement plant",
        "topics": "use-case, cement, kunak, case-study",
        "content": "Case study featuring Cemex in Monterrey, Mexico, deploying a perimeter monitoring network of Kunak AIR Pro stations to protect population health and comply with environmental regulations."
    },
    {
        "file": "case-study-Atmospheric_pollution_and_environmental_noise_control.pdf",
        "slug": "case-study-albacete-noise",
        "title": "Case Study: Atmospheric pollution and noise control (Albacete)",
        "topics": "use-case, urban, noise, kunak",
        "content": "Albacete City Council implemented Kunak AIR Pro and Kunak Noise sensors for an integrated urban development strategy (EDUSI) financed by European funds."
    },
    {
        "file": "case-study-Continuous_gas_and_particle_monitoring_in_transport.pdf",
        "slug": "case-study-valparaiso-metro",
        "title": "Case Study: Gas and particle monitoring in transport",
        "topics": "use-case, transport, metro, kunak",
        "content": "Study conducted by EFE Trenes de Chile on air quality in Valparaíso metro stations using Kunak AIR Pro, measuring CO, CO2, NO2, PMs to improve ventilation systems."
    },
    {
        "file": "case-study-Environmental_monitoring_in_works_&_demolitions.pdf",
        "slug": "case-study-demolition",
        "title": "Case Study: Environmental monitoring in works & demolitions",
        "topics": "use-case, demolition, kunak",
        "content": "Deployment of a Kunak AIR sensor network by AFC Ingenieros to monitor pollutants and noise during the demolition of the Vicente Calderon Stadium in Madrid."
    },
    {
        "file": "case-study-Mining_air_pollution_monitoring_network.pdf",
        "slug": "case-study-colombia-mining",
        "title": "Case Study: Mining air pollution monitoring network",
        "topics": "use-case, mining, kunak",
        "content": "Gecelca S.A. E.S.P. created an air pollution monitoring system at Las Palmeras coal mine in Colombia, using Kunak AIR Pro to measure gases and PMs alongside Grimm EDM180."
    },
    {
        "file": "case-study-Wildland_fire_pollution_monitoring_in_US_EPA_tests.pdf",
        "slug": "case-study-us-epa-wildfire",
        "title": "Case Study: Wildland fire pollution monitoring in US EPA tests",
        "topics": "use-case, wildfire, epa, kunak",
        "content": "US EPA challenge in 2017 to detect wildfires using Kunak AIR systems measuring PM2.5, CO, and O3 to protect public health from smoke exposure."
    },
    {
        "file": "case_study_Odour_emissions_control_in_WWTP.pdf",
        "slug": "case-study-odour-wwtp",
        "title": "Case Study: Odour emissions control in WWTP",
        "topics": "use-case, odour, wwtp, kunak",
        "content": "Monitoring of H2S concentrations at the Shafdan Wastewater Treatment Plant in Israel using 7 Kunak AIR stations for fenceline monitoring to comply with the Clean Air Act."
    },
    {
        "file": "soga-2025-annual-report-executive-summary-infographic.pdf",
        "slug": "soga-2025-report",
        "title": "State of Global Air 2025 Report",
        "topics": "research, report, health-impact",
        "content": "Executive summary infographic for the State of Global Air 2025. Highlights that 7.9 million deaths were attributed to air pollution in 2023, making it the second leading risk factor for early death globally."
    }
]

base_dir = "/Users/bcan/code/airqoon-vault/airqoon's knowledge base"
date_str = "2026-05-11"
index_md_path = os.path.join(base_dir, "index.md")
log_md_path = os.path.join(base_dir, "log.md")

with open(index_md_path, "r") as f:
    index_content = f.read()

index_lines = []
for item in ingest_data:
    # Write source md
    file_path = os.path.join(base_dir, f"wiki/sources/{item['slug']}.md")
    md = f"""---
title: "{item['title']}"
type: source
tags: [{item['topics']}]
created: {date_str}
updated: {date_str}
sources: [raw/articles/notion/{item['file']}]
---

# {item['title']}

## Summary
{item['content']}

## Source
- [[raw/articles/notion/{item['file']}]]
"""
    with open(file_path, "w") as out:
        out.write(md)
    
    # Prep index entry
    index_lines.append(f"| [[wiki/sources/{item['slug']}]] | raw/articles/notion/{item['file']} | {date_str} | {item['topics']} |")

# Insert index_lines into index.md (at the bottom of the Sources table before "### Raw files pending source pages")
insert_pos = index_content.find("### Raw files pending source pages")
if insert_pos != -1:
    new_index = index_content[:insert_pos] + "\n".join(index_lines) + "\n\n" + index_content[insert_pos:]
    with open(index_md_path, "w") as out:
        out.write(new_index)

# Append to log
log_entry = f"## [{date_str}] ingest | Ingested 19 PDF sources (mostly Kunak manuals, case studies, SOGA 2025)\n"
with open(log_md_path, "a") as f:
    f.write(log_entry)

print("Ingestion complete.")
