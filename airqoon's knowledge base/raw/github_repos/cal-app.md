# 🌍 Air Quality Sensor Calibration System

This repository contains a modular Streamlit application for calibrating low‑cost air quality sensors using reference station data. The app helps you:

- Collect data from official reference stations and IoT sensors.
- Calibrate sensor measurements with multiple statistical/ML models.
- Validate model performance against international standards.
- Visualize, export and report calibration results.

The codebase is designed to be:

- Modular (separated into core, utils, ui, config).
- Fully typed (Python type hints).
- Bilingual on the UI side (Turkish/English) while keeping all code in English.

## ✨ Main Features

- **Data Collection**
  - Fetch time‑series data from the Turkish Ministry of Environment (CSB) reference stations.
  - Fetch telemetry from ThingsBoard IoT platform devices.
  - Smart defaults (where supported): PM2.5/PM10 parameters, last 28 days.
  - Direct station search (All Stations mode) or filter by city.

- **Timezone & Timestamps**
  - ThingsBoard telemetry timestamps are returned as **UTC epoch milliseconds** and are converted to timezone-aware `datetime` objects.
  - CSB timestamps are returned as **Türkiye local time** and are localized as `Europe/Istanbul` to preserve the correct global instant.
  - The app can display timestamps without the `+03:00` suffix in tables, while still keeping timezone-aware timestamps internally.

- **Data Cleaning & Outlier Detection**
  - **Automatic Detection** methods:
    - Value Range (manual upper/lower bounds)
    - IQR (Interquartile Range)
    - Z-Score / Modified Z-Score
    - Percentile thresholds
  - **Manual Selection** with interactive Plotly box/lasso select.
  - Dynamic preview - outliers update instantly as parameters change.
  - Actions: Set to NaN, Replace with Median/Mean, Interpolate.
  - **Two interpolation types**:
    - Outlier interpolation: Selected points → NaN → interpolate
    - Missing value fill: Fill all existing NaN gaps for data continuity

- **Calibration Engine**
  - End‑to‑end workflow from raw data to calibrated output.
  - Multiple calibration models: Linear, Polynomial, RandomForest, Manual.
  - Flexible train/validation period selection and timestamp alignment.

- **Quick Calibration** (NEW)
  - Automated 5-step wizard for rapid sensor calibration.
  - Auto-detection of sensor parameters (raw, temp, hum, interferent, old_model).
  - Two-stage resampling: 5min median → 1H mean → 1H reference shift.
  - Multi-device parallel calibration support.
  - Results with metrics table, JSON parameters (`a`, `b`, `c`, `intercept`), timeseries and scatter plots.

- **Validation & Reporting**
  - Automatic evaluation using EPA and CEN criteria.
  - Key metrics: R², slope, intercept, RMSE, NRMSE, data completeness, uncertainty.
  - Interactive charts (time series, scatter, residuals) and summary tables.
  - Export of aligned data, calibration parameters and results as CSV/Excel/JSON/Markdown.

- **User Experience**
  - Modern Streamlit UI with a wizard‑like workflow.
  - Language switcher (TR/EN).
  - Clear error and status messages.
  - Responsive parameter selection with stable state management.

## 🧱 Architecture Overview

High‑level layout:

```text
cal-app/
├── app.py              # Streamlit entry point
├── constants.py        # Global constants & thresholds
├── config/
│   └── settings.py     # Runtime configuration & environment handling
├── src/
│   ├── core/           # Business logic (scrapers, calibration, validation)
│   ├── utils/          # Utilities (conversions, processing, visualization, export, i18n)
│   └── ui/             # UI components and pages
└── tests/              # (Planned) automated tests
```

## 🚀 Getting Started

### Requirements

- Python 3.13+
- pip
- (Recommended) virtual environment

### Installation

```bash
# Go to project directory
cd cal-app

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate      # macOS / Linux
# or on Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# (Optional) environment configuration
cp .env.example .env
# then edit .env with your own credentials (CSB, ThingsBoard, etc.)
```

### Running the Application

```bash
streamlit run app.py
```

By default Streamlit will start on a local port such as `http://localhost:8501` or `http://localhost:8502` (shown in the terminal output).

## ⚙️ Configuration & Environment

Application behavior and credentials are controlled via environment variables and the `config/settings.py` module.

- **ThingsBoard tenants** (see `TenantConfig` in `config/settings.py`):
  - `TB_SEE_USERNAME`, `TB_SEE_PASSWORD`
  - `TB_LAB_USERNAME`, `TB_LAB_PASSWORD`
  - `TB_CSB_USERNAME`, `TB_CSB_PASSWORD`
- **CSB API**: base URL and endpoints are defined in `CSBConfig` and normally do not need changes.

You can keep these variables in a local `.env` file and load them in your environment (for example using `python-dotenv` or your shell profile).

## 🕒 Timezone Convention

- **UI date/time inputs** are treated as local time in Türkiye (`Europe/Istanbul`) unless explicitly timezone-aware.
- **Internal timestamps** should be treated as timezone-aware datetimes where possible.
- Converting a timezone-aware `Timestamp` to epoch always yields a **UTC+0** instant.

## 🧰 Tech Stack

- **Language**: Python 3.13+
- **Web UI**: Streamlit
- **Data processing**: Pandas, NumPy
- **Machine learning / models**: scikit‑learn
- **Visualization**: Plotly
- **HTTP / IO**: requests, openpyxl, etc.

## 👨‍💻 Development & Code Style

- **Language policy**
  - Code, comments, and docstrings are **English only**.
  - All user‑facing text goes through the i18n layer (`src/utils/i18n.py`) and supports **TR/EN**.

- **Naming conventions**
  - Files/modules: `snake_case` (for example `data_processing.py`, `calibration_engine.py`).
  - Classes: `PascalCase` (for example `CalibrationEngine`, `EPAValidator`).
  - Functions/variables: `snake_case` with descriptive names.
  - Constants: `UPPER_SNAKE_CASE` (for example `MOLECULAR_WEIGHTS`, `EPA_LIMITS`).

- **Type hints & docstrings**
  - All public functions and methods should have **type hints**.
  - Docstrings follow **Google style** for functions/classes/modules.

- **Formatting & imports**
  - Code is formatted with **Black** (line length 100).
  - Imports are grouped as: standard library → third‑party → local.

## 🧪 Testing

- Test files live under `tests/` with names like `test_*.py`.
- Use `pytest`‑style tests, for example:

  ```python
  def test_ugm3_to_ppb_no2():
      ...
  ```

- Static checks (optional but recommended):
  - **Black** for formatting.
  - **Ruff** (or a similar linter) for style and import checks.

## 📝 Commit Style

Commit messages generally follow a **`type: subject`** pattern, for example:

- `feat: add EPA validation metrics`
- `fix: correct NO2 molecular weight`
- `docs: update README and development notes`

You can keep a brief body when necessary to explain reasoning or link issues.

## 📓 Additional Documentation

- `DEVELOPMENT_NOTES.md`: lightweight development log / session notes.
- `REFACTOR_TODO.md`: refactoring status and TODO list.
- `ISSUES_AND_REQUESTS.md`: bug tracking, issues and feature requests.
- `ARCHITECTURE.md`: project structure and component documentation.

## ✅ Current Status (High Level)

- Calibration workflow: 12 steps (train/validation date ranges → fetch → clean → align → model → post-cal convert → post-cal mapping → validate → results).
- Charts: consistent Plotly template (`airqoon`) and train/validation visual separation in preview charts.
- i18n: calibration workflow largely migrated to `t()` (remaining cleanup in some components).

## ⏳ Known Pending Items

- Outlier cleaning v2: selection-related deletion issues when selecting many points.

## 📚 Reference Documents

Local reference PDFs/notebooks live under `standards/` (not intended for commit by default).

## 📄 License

This project is currently under active development. A formal license file may be added later; until then, please contact the author before using it in production.
