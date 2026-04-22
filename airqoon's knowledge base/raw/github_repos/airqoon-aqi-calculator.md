# Airqoon AQI Calculator

A Python service for calculating Air Quality Index (AQI) values from environmental monitoring data. The system processes telemetry data from air quality sensors, calculates hourly and rolling averages, and computes AQI values using multiple international standards.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [AQI Standards](#aqi-standards)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Airqoon AQI Calculator is designed to process real-time air quality data from multiple sensors and calculate standardized AQI values. It supports multiple international AQI calculation standards and provides reliable data processing with quality validation.

### Key Capabilities

- **Multi-standard AQI Calculation**: Supports EEA, US-EPA, Turkey, and Malaysia AQI standards
- **Automated Processing**: Scheduled hourly data processing with rolling averages
- **Quality Validation**: Implements air quality standards for data reliability
- **Multi-tenant Support**: Processes data from multiple organizations
- **Scalable Architecture**: Containerized deployment with Kubernetes support

## Features

### Data Processing
- **Hourly Averaging**: Calculates 1-hour averages from raw sensor data
- **Rolling Averages**: Computes 8-hour and 24-hour rolling averages
- **Data Quality Checks**: Validates data completeness and distribution
- **Metadata Filtering**: Automatically filters out metadata-only records

### Supported Pollutants
- **Particulate Matter**: PM2.5, PM10 (24-hour averaging)
- **Gases**: NO2 (1h/24h), O3 (8h), SO2 (1h/24h), CO (8h)
- **Additional**: VOC (1h), H2S, Noise levels
- **Meteorological**: Temperature, Humidity, Pressure, Wind

### AQI Standards
- **EEA** (European Environment Agency)
- **US-EPA** (United States Environmental Protection Agency)
- **Turkey** (Turkish National Standards)
- **Malaysia** (Malaysian Air Pollution Index)

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   MongoDB       │    │   AQI Calculator │    │   PostgreSQL    │
│ (Raw Telemetry) │───▶│    Service       │───▶│ (Processed Data)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   RabbitMQ       │
                       │ (Message Queue)  │
                       └──────────────────┘
```

### Core Components

- **Data Sources** (`data_input/`): MongoDB and PostgreSQL connection management
- **Data Processing** (`data_processing/`): AQI calculation and data averaging
- **Scheduler** (`scheduler/`): Automated task scheduling and orchestration
- **Message Queue** (`message_queue/`): RabbitMQ integration for notifications
- **Utils** (`utils/`): Configuration management and logging

## Installation

### Prerequisites

- Python 3.9+
- MongoDB access
- PostgreSQL database
- RabbitMQ (optional, for message queuing)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd airqoon-aqi-calculator
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure database connections**
   ```bash
   cp config.ini.example config.ini
   # Edit config.ini with your database credentials
   ```

4. **Run the service**
   ```bash
   python main.py
   ```

### Docker Deployment

1. **Build the container**
   ```bash
   docker-compose build
   ```

2. **Run the service**
   ```bash
   docker-compose up -d
   ```

### Kubernetes Deployment

```bash
kubectl apply -f k8s/
```

## Configuration

### Database Configuration

Edit `config.ini` to configure your database connections:

```ini
[mongodb]
mongodb_uri=mongodb://user:password@host:port/database

[postgresql]
postgres_host=localhost
postgres_port=5432
postgres_db=airqoon
postgres_usr=username
postgres_pwd=password

[rabbitmq]
broker_url=amqps://user:password@host:port/vhost
exchange=aqi_exchange
routing_key=aqi_routing_key
```

### Scheduler Configuration

The service runs automatically every hour at :05 minutes past the hour. You can modify the schedule in `main.py`:

```python
schedule.every().hour.at(":05").do(run_tasks)
```

### Tenant Configuration

To exclude specific tenants from processing, modify the exclusion list in `scheduler/scheduler.py`:

```python
excluded_tenants = {'surekli-izleme-merkezi', 'inovatink'}
```

## Usage

### Automatic Operation

The service runs continuously and processes data automatically:

1. **Data Fetching**: Retrieves hourly telemetry data from MongoDB
2. **Data Processing**: Calculates hourly averages and rolling averages
3. **AQI Calculation**: Computes AQI values using multiple standards
4. **Storage**: Saves results to PostgreSQL
5. **Notification**: Sends completion messages via RabbitMQ

### Manual Execution

Run specific tasks manually:

```bash
# Run all tasks once
python scheduler/scheduler.py

# Run tests
python -m pytest tests/
```

### Data Flow

1. **Raw Data Input**: Sensor telemetry stored in MongoDB
2. **Parsing**: Extract and validate sensor measurements
3. **Quality Control**: Filter metadata-only records and validate data
4. **Averaging**: Calculate 1-hour, 8-hour, and 24-hour averages
5. **AQI Calculation**: Apply organization-specific AQI formulas
6. **Output**: Store processed data and AQI values in PostgreSQL

## AQI Standards

### Supported Organizations

| Organization | Coverage | Pollutants |
|-------------|----------|------------|
| EEA | European Union | PM2.5, PM10, NO2, O3, SO2, CO |
| US-EPA | United States | PM2.5, PM10, NO2, O3, SO2, CO |
| Turkey | Turkey | PM2.5, PM10, NO2, O3, SO2, CO |
| Malaysia | Malaysia | PM2.5, PM10, NO2, O3, SO2, CO |

### Data Quality Requirements

- **Minimum Data Coverage**: 75% valid readings in averaging period
- **Consecutive Missing**: Max 2 hours for 8h avg, 6 hours for 24h avg
- **Distribution Check**: Ensures data is well-distributed across time periods

## Development

### Project Structure

```
airqoon-aqi-calculator/
├── constants/          # Configuration constants and breakpoints
├── data_input/         # Data source connections and parsing
├── data_processing/    # AQI calculation and data processing
├── message_queue/      # RabbitMQ integration
├── scheduler/          # Task scheduling and orchestration
├── tests/             # Unit tests
├── utils/             # Utilities and logging
├── k8s/               # Kubernetes deployment files
└── main.py            # Application entry point
```

### Adding New AQI Standards

1. **Define breakpoints** in `constants/constants.py`:
   ```python
   aqi_breakpoints['NEW_COUNTRY'] = {
       'PM2.5-24h': [(0, 50, 0, 12), (51, 100, 13, 35), ...],
       # Add more pollutants
   }
   ```

2. **Add limit values**:
   ```python
   pollutant_limit_values['NEW_COUNTRY'] = {
       'LV-PM2.5-24h': 25,  # µg/m³
       # Add more limits
   }
   ```

3. **Update organization list** in `scheduler/scheduler.py`:
   ```python
   organizations = ['EEA', 'US-EPA', 'Turkiye', 'Malaysia', 'NEW_COUNTRY']
   ```

### Adding New Pollutants

1. **Update target parameters** in `constants/constants.py`
2. **Add measurement units** and **name mappings**
3. **Update column definitions** in scheduler
4. **Add AQI parameter mappings**

## Testing

### Run Tests

```bash
# Run all tests
python -m pytest tests/

# Run specific test file
python -m pytest tests/test_data_processor.py

# Run with coverage
python -m pytest tests/ --cov=.
```

### Test Structure

- `test_data_parser.py`: Data parsing and validation tests
- `test_data_processor.py`: Data processing and averaging tests
- `test_data_source.py`: Database connection tests
- `test_queue_handler.py`: Message queue tests

## Deployment

### Environment Variables

Set environment variables for production:

```bash
export ENV=production
export MONGODB_URI=mongodb://...
export POSTGRES_HOST=...
export RABBITMQ_URL=amqps://...
```

### Health Checks

Monitor the service health:

- **Logs**: Check `logs/scheduler_tasks.log`
- **Database**: Verify data in `telemetry_averages` table
- **Queue**: Monitor RabbitMQ message flow

### Scaling

The service is designed to run as a single instance per environment. For high availability:

1. **Database Replication**: Use MongoDB replica sets and PostgreSQL streaming replication
2. **Container Orchestration**: Deploy with Kubernetes for automatic restarts
3. **Monitoring**: Use logs and metrics for health monitoring

## API Reference

### Data Models

#### Telemetry Average Record
```json
{
  "device_id": "device-uuid",
  "calculateddatetime": "2025-06-20T20:00:00Z",
  "avgtype": "1h|8h_rolling|24h_rolling",
  "pm25calibrated": 25.5,
  "pm10calibrated": 45.2,
  "no2ugm3calibratedfiltered": 32.1
}
```

#### AQI Result Record
```json
{
  "device_id": "device-uuid",
  "organization": "EEA",
  "parameter": "PM2.5-24h",
  "concentration": 25.5,
  "concentration_unit": "µg/m³",
  "aqi_value": 85,
  "exceeds_limit": false,
  "limit_value": 25,
  "averaging_period": "24h_rolling",
  "calculated_datetime": "2025-06-20T20:00:00Z"
}
```

### Database Tables

- **telemetry_averages**: Processed hourly and rolling averages
- **aqi_results**: Calculated AQI values for all organizations
- **devices**: Device metadata and configuration

## Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Make changes** and add tests
4. **Run tests** (`python -m pytest tests/`)
5. **Commit changes** (`git commit -am 'Add new feature'`)
6. **Push to branch** (`git push origin feature/new-feature`)
7. **Create Pull Request**

### Code Style

- Follow PEP 8 Python style guidelines
- Add docstrings to all functions and classes
- Include unit tests for new features
- Update documentation for API changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- **Issues**: Create GitHub issues for bugs and feature requests
- **Documentation**: Check `CLAUDE.md` for development guidance
- **Logs**: Monitor `dev-log.md` for recent changes and updates

---

**Last Updated**: June 2025  
**Maintainer**: Airqoon Team