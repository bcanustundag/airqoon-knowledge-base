# Airqoon Alarm Worker

## Overview

Airqoon Alarm Worker is a Python async service that listens to telemetry and AQI-related streams from RabbitMQ and evaluates alarm configurations stored in Postgres. It creates alarm instances when conditions are triggered and sends notifications.

The worker is designed to run as a long-lived process (Kubernetes deployment) and is resilient to RabbitMQ and database interruptions.

## Features

- **RabbitMQ Consumers**
  - **Instant telemetry** (`TelemetryInstantConsumer`) - Real-time sensor readings
  - **Averages** (`TelemetryAveragesConsumer`) - 1h, 8h_rolling, 24h_rolling averages
  - **AQI results** (`AQIResultsConsumer`) - Air Quality Index values with organization filtering

- **Alarm Evaluation**
  - Evaluates conditions against telemetry values
  - Supports multiple operators: `>`, `<`, `>=`, `<=`, `==`, `!=`
  - AND/OR logic for multiple conditions
  - Case-insensitive parameter matching

- **Data Source Filtering**
  - `instant` - Instant telemetry alarms
  - `1h` - 1-hour average alarms
  - `8h_rolling` - 8-hour rolling average alarms
  - `24h_rolling` - 24-hour rolling average alarms
  - `aqi` - AQI-based alarms with organization support (Turkiye, EEA, US-EPA, Malaysia)

- **Alarm Instance Management**
  - Creates instances when conditions trigger
  - Resolves instances when conditions clear
  - Trigger cap (max 10 per alarm/device per 24h)
  - Orphan cleanup for stale instances

- **Configuration**
  - Environment variables (`.env` for local, K8s secrets for production)
  - Supports both local development and Kubernetes deployment

## Project Structure

```
airqoon-alarm-worker/
├── Dockerfile
├── requirements.txt
├── run.py                      # Entry point
├── .env                        # Local config (not in container)
├── src/
│   ├── main.py                 # Async entrypoint
│   └── alarm_worker/
│       ├── config.py           # Settings loader
│       ├── domain/             # Pydantic models
│       ├── rabbitmq/           # RabbitMQ consumers
│       ├── repository/         # Data access layer
│       ├── evaluation/         # Alarm evaluation engine
│       └── notifications/      # Notification service
├── tools/
│   ├── k8s/production/         # Kubernetes manifests
│   └── sql/                    # Database migration scripts
└── docs/                       # Documentation
```

## Configuration (.env)

Example `.env` at the project root:

```bash
RABBITMQ_URI="amqps://airqoon:password@host:5671/airqoon"
TELEMETRY_INSTANT_QUEUE=telemetry_instant_alarm_worker
TELEMETRY_AVERAGES_QUEUE=telemetry_averages_alarm_worker
AQI_RESULTS_QUEUE=aqi_results_alarm_worker

POSTGRES_DSN="postgresql://user:password@localhost:5432/airqoon"
MONGODB_URI="mongodb://user:password@mongodb-host:27017/airqoon"

SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="user@example.com"
SMTP_PASSWORD="password"
SMTP_FROM="Airqoon Alerts <alerts@example.com>"

LOG_LEVEL=INFO
```

## Database Setup

Run the SQL migration scripts to create required tables:

```bash
psql -h localhost -U postgres -d airqoon -f tools/sql/001_create_alarm_tables.sql
```

See `tools/sql/002_sample_alarm_configs.sql` for example alarm configurations.

## Running Locally

### Prerequisites

- Python 3.11+
- RabbitMQ with `telemetry_exchange` (topic) configured
- PostgreSQL with alarm tables created
- MongoDB for device lookups

### Setup

```bash
python -m venv env
source env/bin/activate
pip install -r requirements.txt

# Configure .env with your connection strings
cp .env.example .env  # if you have an example file
```

### Run

```bash
python run.py
```

## Docker

### Build

```bash
docker build -t airqoon-alarm-worker:latest .
```

### Run

```bash
docker run -e RABBITMQ_URI="amqps://..." \
           -e POSTGRES_DSN="postgresql://..." \
           -e MONGODB_URI="mongodb://..." \
           airqoon-alarm-worker:latest
```

## Kubernetes Deployment

Deploy to Kubernetes using the manifests in `tools/k8s/production/`:

```bash
# Create secrets first
kubectl apply -f tools/k8s/production/secrets.yaml

# Deploy
export NAMESPACE=airqoon
export DOCKER_IMAGE_URL=ghcr.io/airqoon/alarm-worker:latest
envsubst < tools/k8s/production/deployment.yaml | kubectl apply -f -
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RABBITMQ_URI` | RabbitMQ connection URI | Yes |
| `POSTGRES_DSN` | PostgreSQL connection string | Yes |
| `MONGODB_URI` | MongoDB connection URI | Yes |
| `SMTP_HOST` | SMTP server hostname | Yes (for email notifications) |
| `SMTP_PORT` | SMTP server port (e.g., 587) | Yes (for email notifications) |
| `SMTP_USER` | SMTP username | Yes (for email notifications) |
| `SMTP_PASSWORD` | SMTP password | Yes (for email notifications) |
| `SMTP_FROM` | From address for emails | Yes (for email notifications) |
| `LOG_LEVEL` | Logging level (DEBUG, INFO, WARNING, ERROR) | No (default: INFO) |

## Alarm Configuration

### Conditions Format

```json
{
  "rules": [
    {"parameter": "pm25calibrated", "operator": ">", "value": 35},
    {"parameter": "pm10calibrated", "operator": ">", "value": 50}
  ],
  "operator": "AND"
}
```

### Data Sources

| data_source | Description |
|-------------|-------------|
| `instant` | Real-time telemetry |
| `1h` | 1-hour averages |
| `8h_rolling` | 8-hour rolling averages |
| `24h_rolling` | 24-hour rolling averages |
| `aqi` | AQI results (with organization filtering) |

### AQI Organizations

For `data_source='aqi'`, specify organization at tenant level (`tenant_settings.aqi_organization`) or per-alarm override:

- `Turkiye` (default)
- `EEA`
- `US-EPA`
- `Malaysia`
