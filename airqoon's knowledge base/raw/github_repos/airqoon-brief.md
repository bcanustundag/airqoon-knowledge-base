# Airqoon Brief

Weekly air quality intelligence for Turkey's 81 provinces. Aggregates data from ~380 government monitoring stations and Airqoon's public sensor network, then generates ranked province reports, trend analysis, anomaly detection, and interactive choropleth maps.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Data Sources                                │
│                                                                     │
│  PostgreSQL                MongoDB (gov)              MongoDB (sensors)
│  telemetry_averages        SurekliIzlemeMerkezi        Devices
│  (hourly 1h avgs)          (station metadata)          DeviceHistoricalTelemetries
└──────┬──────────────────────────┬──────────────────────────┬────────┘
       │                          │                          │
       └──────────────────────────┼──────────────────────────┘
                                  ▼
                        ┌─────────────────┐
                        │  TurkeyDataSource │
                        │  + GeoCoder (PiP) │
                        └────────┬────────┘
                                 ▼
                    ┌────────────────────────┐
                    │    Generation Engine    │
                    │  aggregator → rankings │
                    │  anomaly → headline    │
                    │  spotlights → movers   │
                    └────────────┬───────────┘
                                 ▼
                    ┌────────────────────────┐
                    │      Renderers         │
                    │  HTML · JSON · RSS     │
                    │  SVG choropleth        │
                    │  llms.txt · ai-plugin  │
                    └────────────┬───────────┘
                                 ▼
                         output/ directory
                                 ▼
                    ┌────────────────────────┐
                    │    FastAPI Server       │
                    │  serves static output  │
                    └────────────────────────┘
```

## Features

- **Province rankings** — weekly, monthly, and 30-day AQI rankings for all 81 provinces
- **Movers** — week-over-week worsened/improved provinces
- **Anomaly detection** — z-score based outlier detection against 52-week history
- **Spotlights** — year-over-year, regional anomaly, consecutive trend, and seasonal deviation insights
- **Headline generation** — automated Turkish/English headlines based on threshold breaches
- **City profiles** — per-province pages with 12-week trends, station lists, monthly comparisons
- **Choropleth map** — SVG map of Turkey colored by AQI level
- **Dual data sources** — government stations + Airqoon public sensors with point-in-polygon geocoding
- **i18n** — Turkish and English translations
- **LLM discoverability** — `llms.txt` and `ai-plugin.json` for AI agent integration
- **Multiple output formats** — HTML pages, JSON API, RSS feed

## Project Structure

```
src/
├── api/routes.py            # FastAPI endpoints
├── config.py                # Pydantic settings (env-based)
├── main.py                  # FastAPI app entry point
├── connectors/
│   ├── base.py              # CountryConnector (provinces, regions loader)
│   ├── turkey.py            # TurkeyDataSource (PG + 2x MongoDB)
│   └── geocoder.py          # Point-in-polygon + Haversine geocoder
├── engine/
│   ├── generator.py         # Full generation orchestrator
│   ├── aggregator.py        # Province-level aggregation, AQI calc, rankings
│   ├── anomaly.py           # Z-score anomaly detection
│   ├── headline.py          # Auto headline generation
│   └── spotlights.py        # 4 spotlight detectors + selection
├── models/
│   └── brief.py             # Pydantic models (BriefData, Province, etc.)
├── rendering/
│   ├── html_renderer.py     # Jinja2 HTML output
│   ├── json_renderer.py     # JSON brief output
│   ├── rss_renderer.py      # RSS feed
│   ├── choropleth.py        # SVG color injection
│   └── chart.py             # Trend SVG charts
└── i18n/
    └── loader.py            # Translation loader

data/turkey/
├── provinces.json           # 81 provinces with center coords
├── regions.json             # 7 geographic regions
├── tr-provinces.geojson     # Province boundary polygons (Apache 2.0)
└── choropleth.svg           # SVG map generated from GeoJSON

templates/                   # Jinja2 templates (HTML, llms.txt, ai-plugin)
tests/                       # 46 tests (pytest + pytest-asyncio)
```

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL (with `telemetry_averages` table)
- MongoDB (two databases: `airqoonDataBoxExternalRawData` + `airqoonBaseMapDB`)

### Local Setup

```bash
# Clone and set up virtualenv
git clone <repo-url> && cd airqoon-brief
python3 -m venv venv
source venv/bin/activate
pip install -e '.[dev]'

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run tests
./run.sh test

# Start dev server
./run.sh server

# Generate a brief manually
./run.sh generate
```

### Docker

```bash
docker compose up --build
```

The service will be available at `http://localhost:8033`.

## API Endpoints

| Route | Description |
|-------|-------------|
| `GET /` | Weekly brief HTML (Turkish) |
| `GET /en` | Weekly brief HTML (English) |
| `GET /v1/brief` | Full brief as JSON |
| `GET /feed.xml` | RSS feed |
| `GET /llms.txt` | LLM-readable summary |
| `GET /.well-known/ai-plugin.json` | AI plugin manifest |
| `GET /{province_slug}` | City profile (Turkish) |
| `GET /{province_slug}/en` | City profile (English) |
| `GET /health` | Health check |

## Configuration

All settings are configured via environment variables (see `.env.example`):

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_HOST` | `localhost` | PostgreSQL host |
| `POSTGRES_PORT` | `5432` | PostgreSQL port |
| `POSTGRES_DB` | `airqoon` | PostgreSQL database |
| `POSTGRES_USER` | `postgres` | PostgreSQL user |
| `POSTGRES_PASSWORD` | _(empty)_ | PostgreSQL password |
| `MONGODB_URI` | `mongodb://localhost:27017` | MongoDB URI (government stations) |
| `MONGODB_DB` | `airqoonDataBoxExternalRawData` | MongoDB database (stations) |
| `BASEMAP_MONGODB_URI` | `mongodb://localhost:27017` | MongoDB URI (Airqoon sensors) |
| `BASEMAP_MONGODB_DB` | `airqoonBaseMapDB` | MongoDB database (sensors) |
| `OUTPUT_DIR` | `output` | Generated files directory |
| `HOST` | `0.0.0.0` | Server bind address |
| `PORT` | `8033` | Server port |

## Data Sources

### Government Stations (SurekliIzlemeMerkezi)

~380 stations from Turkey's continuous air quality monitoring network. Each station has a `CityId`/`CityTitle` for direct province mapping. Data flows through PostgreSQL `telemetry_averages` as hourly aggregates.

### Airqoon Public Sensors

IoT sensors from `airqoonBaseMapDB`. Sensors only have GPS coordinates — province assignment is done via point-in-polygon geocoding against real province boundary polygons (`tr-provinces.geojson`). For sensors not yet in PostgreSQL, raw telemetry is fetched directly from `DeviceHistoricalTelemetries` and aggregated hourly via MongoDB pipeline.

### Pollutants Tracked

| Pollutant | Government Key | Sensor Key |
|-----------|---------------|------------|
| PM10 | `pm10calibrated` | `PM10Calibrated` |
| PM2.5 | `pm25calibrated` | `PM25Calibrated` |
| SO2 | `so2ugm3calibratedfiltered` | `SO2UGM3CalibratedFiltered` |
| NO2 | `no2ugm3calibratedfiltered` | `NO2UGM3CalibratedFiltered` |
| O3 | `o3ugm3calibratedfiltered` | `O3UGM3CalibratedFiltered` |
| CO | `cougm3calibratedfiltered` | `COUGM3CalibratedFiltered` |

## Testing

```bash
# All tests
./run.sh test

# Specific test file
./run.sh test -k geocoder

# With coverage
pytest --cov=src tests/
```

## Generation Schedule

By default, the brief is generated every **Monday at 09:00 UTC** (`GENERATION_CRON=0 9 * * 1`). The generator can also be triggered manually via `./run.sh generate`.

## License

Proprietary. Province boundary GeoJSON sourced from [alpers/Turkey-Maps-GeoJSON](https://github.com/alpers/Turkey-Maps-GeoJSON) (Apache 2.0).
