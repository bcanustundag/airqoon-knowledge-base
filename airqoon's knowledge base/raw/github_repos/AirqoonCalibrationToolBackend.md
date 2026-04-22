# Qoonify Backend

Qoonify is a web-based calibration and evaluation tool for Airqoon sensor units. This backend provides API endpoints that integrate with the Istanbul Metropolitan Municipality (IBB) air quality monitoring system and ThingsBoard IoT platform for Airqoon sensor data.

## Features

- Real-time air quality data retrieval from IBB API and ThingsBoard IoT platform
- Proxy endpoints for all IBB air quality monitoring functionality
- Integration with ThingsBoard instances for Airqoon sensor telemetry data
- Flexible data retrieval with date range filtering and aggregation options
- Turkish date format (DD.MM.YYYY HH:MM) support with proper timezone handling
- Consistent timestamp convention with IBB reference source for accurate data comparison
- Support for handling large datasets with intelligent chunking
- JWT token-based authentication for secure API access
- Error handling for authentication-required endpoints
- CORS support for frontend integration

## Requirements

- Python 3.13
- Flask
- Requests
- Flask-CORS
- Python-Dotenv

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/qoonify.git
   cd qoonify/backend
   ```

2. Create and activate a virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your API credentials
   ```
   # IBB API credentials
   IBB_API_SECRET_KEY=your_secret_key
   
   # ThingsBoard default configuration (optional, can also use manual login)
   THINGSBOARD_LAB_URL=https://lab.airqoon.com
   THINGSBOARD_CSB_TR_URL=https://csb-tr.airqoon.com
   THINGSBOARD_SEE_URL=https://see.airqoon.com
   ```

## Running the Application

```
python app.py
```

The server will start on port 9013 by default.

## API Endpoints

### ThingsBoard Integration Endpoints

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/v1/sensor/instances` | GET | Lists available ThingsBoard instances | None |
| `/api/v1/sensor/<instance>/login` | POST | Authenticates with a specific ThingsBoard instance | `username`, `password` (in request body) |
| `/api/v1/sensor/<instance>/devices` | GET | Lists devices from a specific ThingsBoard instance | `page_size` (optional), `page` (optional) |
| `/api/v1/sensor/<instance>/device/<device_id>` | GET | Gets details for a specific device | None |
| `/api/v1/sensor/<instance>/device/<device_id>/telemetry` | GET | Gets telemetry data with flexible parameters | `keys` (optional), `start_ts`/`end_ts` or `start_date`/`end_date` (optional), `limit` (optional, default: 10000), `aggregate` (optional: "hour", "day", "week", "month"), `latest` (optional) |

### IBB Reference Endpoints

| Endpoint | Method | Description | IBB API Endpoint |
|----------|--------|-------------|------------------|
| `/api/v1/reference/ibb/system-units` | GET | Returns units of measurement for various air quality parameters | `https://havakalitesi.ibb.gov.tr/General/SystemUnit` |
| `/api/v1/reference/ibb/stations?station_type=1` | GET | Returns a list of air quality monitoring stations based on station type | `https://havakalitesi.ibb.gov.tr/STN/VWSTN_Station/DataSourceDropDown` |
| `/api/v1/reference/ibb/station/{station_id}/data` | GET | Returns air quality data for a specific station | `https://havakalitesi.ibb.gov.tr/STN/VWSTN_Reports/GetResultFilter` |
| `/api/v1/reference/ibb/parameters` | GET | Returns a list of available air quality parameters | `https://havakalitesi.ibb.gov.tr/General/GetVWSYS_TableByStationType?StationType=1` |
| `/api/v1/reference/ibb/station-subtypes` | GET | Returns a list of available station subtypes | `https://havakalitesi.ibb.gov.tr/General/DataSourceStationSubType` |
| `/api/v1/reference/ibb/period-filters` | GET | Returns available period filter options for data queries | `https://havakalitesi.ibb.gov.tr/General/GetEnum_PeriodFilter` |
| `/api/v1/reference/ibb/status-options` | GET | Returns available status options for data validation | `https://havakalitesi.ibb.gov.tr/STN/VWSTN_ValidationProcess/GetStatusDropdown` |
| `/api/v1/reference/ibb/status` | GET | Returns detailed status information | `https://havakalitesi.ibb.gov.tr/STN/VWSTN_ValidationProcess/GetStatus` |
| `/api/v1/reference/ibb/report-controls` | GET | Returns available report control options | `https://havakalitesi.ibb.gov.tr/STN/VWSTN_Reports/GetControl` |

## Development

See [DEV-LOG.md](DEV-LOG.md) for development history and progress.

## License

This project is proprietary and confidential.
