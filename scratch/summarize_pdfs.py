import os
import subprocess

files = [
    "Kunak_AIR_Datasheet_EN.pdf",
    "Kunak_Air_CalibrationProcedure_Gashood_EN.pdf",
    "Kunak_Air_Correct_cartridge_fitting_EN.pdf",
    "Kunak_Air_Pro_Calibration_EN.pdf",
    "Kunak_Air_Pro_MCERT_certification.pdf",
    "Kunak_Air_Pro_SIMcard_Installation_EN.pdf",
    "Kunak_Air_Pro_UserManual_EN.pdf",
    "Kunak_Cartridge_VOCs_Response_Factor.pdf",
    "Kunak_DeviceConfigurator_UserManual_EN.pdf",
    "Report Sample Oct2024.pdf",
    "case-study-Air_pollution_monitoring_in_port_areas.pdf",
    "case-study-Air_quality_monitoring_at_cement_plant.pdf",
    "case-study-Atmospheric_pollution_and_environmental_noise_control.pdf",
    "case-study-Continuous_gas_and_particle_monitoring_in_transport.pdf",
    "case-study-Environmental_monitoring_in_works_&_demolitions.pdf",
    "case-study-Mining_air_pollution_monitoring_network.pdf",
    "case-study-Wildland_fire_pollution_monitoring_in_US_EPA_tests.pdf",
    "case_study_Odour_emissions_control_in_WWTP.pdf",
    "soga-2025-annual-report-executive-summary-infographic.pdf"
]

base_dir = "/Users/bcan/code/airqoon-vault/airqoon's knowledge base/raw/articles/notion"

with open("/Users/bcan/code/airqoon-vault/scratch/pdf_summaries.txt", "w") as out:
    for f in files:
        path = os.path.join(base_dir, f)
        if not os.path.exists(path):
            out.write(f"File not found: {path}\n\n")
            continue
        try:
            res = subprocess.run(["pdftotext", path, "-"], capture_output=True, text=True)
            text = res.stdout.strip()
            out.write(f"--- {f} ---\n")
            out.write(text[:1500] + "\n\n")
        except Exception as e:
            out.write(f"Error on {f}: {e}\n\n")

print("Done")
