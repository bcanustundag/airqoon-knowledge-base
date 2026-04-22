# Airqoon Auto Reporter

A CLI tool for generating and scheduling multi-tenant air quality reports using PostgreSQL data and S3 storage. Reports are produced in Turkish or English Markdown.

## Features
- Automated monthly reports (CLI or scheduler)
- Multi-tenant support with tenant-specific AI analysis
- Turkish and English Markdown templates and analysis
- AI-generated insights included in reports
- Visual table of contents with clickable navigation icons
- Noise time-of-day analysis (morning, evening, night) for individual devices and combined analysis
- PostgreSQL as the data source
- S3 storage for reports/images
- Complete cleanup of local files after upload (configurable)
- Tenant-specific analysis file management
- All timestamps in UTC
- Protection for published reports
- Robust S3 URL handling for image links

## AI-Generated Insights
Each report contains a styled section with AI-generated insights, providing automated summaries, trend analysis, and actionable recommendations based on the air quality data for each tenant and reporting period. The LensAI analysis section is visually distinct with:

- A blue-bordered container with light background
- A "AI-GENERATED ANALYSIS" badge
- Robot emoji (🤖) in the section title
- Timestamp showing when the analysis was generated

This design clearly indicates AI-generated content while maintaining a professional appearance.

## Install
```bash
git clone https://github.com/airqoon/airqoon-autoreporter.git
cd airqoon-autoreporter
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -e .
```

## Usage
Generate a report:
```bash
python -m airqoon_autoreporter.cli generate-reports --year 2025 --month 3 --tenant TENANT_NAME --markdown en
```

Generate reports for the previous month:
```bash
# With complete cleanup (default - removes all files and the directory)
python -m airqoon_autoreporter.cli run-previous-month-reports --config config.ini --tenant TENANT_NAME

# With partial cleanup (keeps markdown and text files)
python -m airqoon_autoreporter.cli run-previous-month-reports --config config.ini --tenant TENANT_NAME --keep-markdown

# Keep all local files after upload (disable cleanup)
python -m airqoon_autoreporter.cli run-previous-month-reports --config config.ini --tenant TENANT_NAME --no-cleanup
```

Test S3 connection and upload:
```bash
python -m airqoon_autoreporter.cli test-s3-upload --config config.ini --file test_file.txt
```

Schedule automated reports:
```bash
python -m airqoon_autoreporter.scheduler --config config.ini
```

## Config Example
```ini
[DEFAULT]
thingsboard_url = ...
api_token = ...
s3_bucket = ...
s3_access_key = ...
s3_secret_key = ...
[tenant_name]
enabled = true
devices = ...
schedule = monthly
```
cd airqoon-autoreporter
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
pip install -e .
```

## Usage

### Generate Monthly Reports (CLI)
```bash
python -m airqoon_autoreporter.cli generate-reports \
    --year 2025 \
    --month 3 \
    --tenant bursa-metropolitan-municipality \
    --markdown tr
```

#### CLI Options
- `--config`: Path to configuration file (default: config.ini)
- `--output-dir`: Directory for reports (default: reports)
- `--year`: Year for report generation (required)
- `--month`: Month for report generation (1-12) (required)
- `--tenant`: Tenant to generate report for
- `--markdown`: Language code ('tr' or 'en')

### Schedule Automated Reports

Run the scheduler to generate reports automatically:
```bash
python -m airqoon_autoreporter.scheduler --config config.ini
```

## Configuration Example

Create a `config.ini` file like this:
```ini
[DEFAULT]
thingsboard_url = https://your-thingsboard-instance.com
api_token = your-api-token
s3_bucket = your-s3-bucket
s3_access_key = your-access-key
s3_secret_key = your-secret-key

[tenant_name]
enabled = true
devices = device1,device2
schedule = monthly
```

## Project Structure

See PROJECT_STRUCTURE.md for a breakdown of main files and directories.

- Main CLI: `src/airqoon_autoreporter/cli.py`
- Scheduler: `src/airqoon_autoreporter/scheduler.py`
- Report logic: `src/airqoon_autoreporter/report_generator.py`
- Templates: `src/airqoon_autoreporter/templates/`

## Notes
- All reports are generated in UTC.
- Reports are stored in a temporary (emptyDir) volume and uploaded to S3.
- Legacy features (API server, dashboards, pilot/CSV/Notion upload) have been removed.

For further details, see the code or contact the maintainers.


An automated reporting system for generating and managing air quality reports. The system integrates with ThingsBoard for raw, and hourly processed data from airqoon data services for telemetry data and provides automated report generation with configurable schedules per tenant.

## Features

- **Data Integration**: ThingsBoard telemetry data and weather data processing
- **Report Generation**: Automated monthly reports with comprehensive visualizations
- **Multi-tenant Support**: Tenant-specific configurations and schedules
- **Storage & Retrieval**: S3-based report storage and secure access

## Installation

1. Clone the repository:
```bash
git clone https://github.com/airqoon/airqoon-autoreporter.git
cd airqoon-autoreporter
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
pip install -e .
```

## CLI Usage

### Generate Monthly Reports

You can generate reports in multiple ways:

1. Using the CLI module directly:
```bash
python -m airqoon_autoreporter.cli generate-reports \
    --year 2024 \
    --month 11 \
    --tenant bursa-metropolitan-municipality \
    --markdown tr
```

2. Using the command-line tool:
```bash
airqoon-reporter generate-reports --year 2024 --month 12
```

#### Options:
- `--config`: Path to configuration file (default: config.ini)
- `--output-dir`: Directory where reports will be saved (default: reports)
- `--year`: Year for report generation (required)
- `--month`: Month for report generation (1-12) (required)
- `--tenant`: Specific tenant to generate report for
- `--markdown`: Language code for markdown output (e.g., 'tr' for Turkish, 'en' for English)

### Generate Pilot Report

```bash
python -m airqoon_autoreporter.cli generate_pilot_report \
    --year 2024 \
    --month 11
```

### Generate Report from CSV

```bash
python -m airqoon_autoreporter.cli generate_from_csv \
    --csv-file path/to/your/data.csv
```

### Upload Reports to Notion

The `md2notion.py` script allows you to upload markdown reports to Notion databases. It handles the conversion of markdown content and uploads any associated images to S3.

```bash
python md2notion.py \
  --token "your-notion-integration-token" \
  --database-id "your-notion-database-id" \
  --file "path/to/your/report.md" \
  --title "Report Title" \
  --aws-access-key-id "your-aws-access-key" \
  --aws-secret-access-key "your-aws-secret-key" \
  --s3-bucket "your-s3-bucket-name"
```

#### Options:
- `--token`: Notion integration token
- `--database-id`: Target Notion database ID
- `--file`: Path to the markdown file to upload
- `--title`: Title for the Notion page
- `--aws-access-key-id`: AWS access key for S3 image uploads
- `--aws-secret-access-key`: AWS secret key for S3 image uploads
- `--s3-bucket`: S3 bucket name for storing images

### Export Device Data

Export raw or hourly averaged data for devices in a specific time period:

```bash
# Export hourly averaged data (default)
python -m airqoon_autoreporter export-data \
    tenant-name \
    "2024-01-01T00:00:00" \
    "2024-02-01T00:00:00" \
    raw \
    --output-dir exports

# Export daily averaged data
python -m airqoon_autoreporter export-data \
    tenant-name \
    "2024-01-01T00:00:00" \
    "2024-02-01T00:00:00" \
    raw \
    --average-type daily \
    --output-dir exports
```

#### Export Options:
- `tenant`: The tenant ID to export data for
- `start_time`: Start time in ISO format (YYYY-MM-DDTHH:MM:SS)
- `end_time`: End time in ISO format (YYYY-MM-DDTHH:MM:SS)
- `source`: Type of data to export ('raw' from MongoDB or 'hourly' from PostgreSQL)
- `--output-dir`: Directory to save the exported data (default: exports)
- `--config-file`: Path to configuration file (default: config.ini)
- `--average-type`: Type of averaging to apply ('hourly' or 'daily', default: hourly)

### Single-Page Weekly Report (CLI)

Generate a single-page report for a custom UTC interval:

```bash
python -m src.airqoon_autoreporter.cli generate-single-page-report \
  --tenant TENANT_SLUG \
  --start-time 2025-09-01T00:00:00Z \
  --end-time 2025-09-14T23:59:59Z \
  --config config.ini \
  --output-dir reports \
  --json-dir reports/json \
  --language en \
  --enable-ai \
  --ai-prompt-override "Optional emphasis" \
  --ai-prompt-max-chars 500
```

Notes:
- **Images** are uploaded to S3 when configured; Markdown is persisted to PostgreSQL.
- **AI** insights use Anthropic (default model: `claude-sonnet-4-5-20250929`).

### Scheduled Single-Page Reports (Cron)

Run scheduled single-page reports for tenants configured in `tenant_settings`:

```bash
python -m airqoon_autoreporter.cli run-single-page-schedules --config config.ini
```

Scheduler settings are read from the platform database table `public.tenant_settings` (see migration `migrations/V10_singe_page_single_page_scheduler_settings.sql`).

Required fields per tenant:
- `single_page_schedule_enabled`: enable/disable scheduled single-page runs
- `single_page_schedule_frequency`: `daily` | `weekly` | `monthly`
- `single_page_schedule_language`: `en` | `tr` | `both`
- `single_page_schedule_week_start_dow`: `1..7` (1=Monday) for strict weekly intervals
- `single_page_schedule_by_zone_enabled`: enable/disable per-zone scheduled single-page reports
- `single_page_schedule_max_zones`: max number of non-default active zones to include
- `single_page_notification_emails`: `TEXT[]` of recipient emails

### Email Notifications (SMTP)

Email notifications are sent by the scheduler after successful scheduled single-page report generation.

Configure SMTP in `config.ini`:

```ini
[email]
smtp_host = ...
smtp_port = 465
smtp_username = ...
smtp_password = ...
from_mail = "Airqoon Autoreporter <autoreporter@airqoon.com>"
```

### API Endpoint (Single-Page)

Endpoint requires `X-API-Key` and enforces a per-tenant rate limit using `api_trigger` artifacts.

```bash
curl -X POST http://localhost:8000/api/v1/reporter/single \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -d '{
    "tenant": "TENANT_SLUG",
    "start_time": "2025-09-01T00:00:00Z",
    "end_time": "2025-09-14T23:59:59Z",
    "language": "en",
    "ai_prompt_override": "Optional emphasis",
    "ai_prompt_max_chars": 500,
    "persist_ai_prompt": true,
    "persist_ai_insights": true
  }'
```

Details:
- **Auth**: `X-API-Key` resolved from `[api].api_key` in `CONFIG_PATH` or `API_KEY` env.
- **Rate limit**: Max 5 invocations per tenant in the last 24h.
- **Artifacts**: You can disable persisting `ai_prompt` or `ai_insights` via request flags.
- **Model**: Default Anthropic model is `claude-sonnet-4-5-20250929` (override via `[anthropic].model` or `ANTHROPIC_MODEL`).

## Configuration

Create a `config.ini` file with the following structure:

```ini
[DEFAULT]
thingsboard_url = https://your-thingsboard-instance.com
api_token = your-api-token

[tenant_name]
enabled = true
devices = device1,device2
schedule = monthly
