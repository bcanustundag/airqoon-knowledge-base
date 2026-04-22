# Lens API

An environmental intelligence platform API that provides endpoints for managing markdown reports, device mapping, device comparison, and other environmental data analysis features.

## Project Overview

Lens API is a RESTful API built with Node.js, Fastify, and PostgreSQL. It provides a comprehensive set of endpoints for managing environmental data and generating markdown reports. The API is designed to be secure, scalable, and easy to use.

## Features

- **Authentication**: Secure endpoints with authentication middleware
- **Admin User Access**: Admin users can access reports across all tenants
- **PDF Export**: Export reports to PDF format with clickable navigation links and proper image handling
- **Enhanced Security**:
  - UUID validation for report IDs to prevent SQL injection
  - Database-level type enforcement and constraints
  - Multi-layer validation in controllers and services
- **Secure Image Handling**: 
  - S3-based image storage with secure access through API proxy
  - Relative image URLs to avoid cross-origin resource issues
  - Public image view endpoint with proper CORS configuration
- **Dual Report Systems**:
  - **Markdown Reports**: PostgreSQL-based reports with CRUD operations
  - **Legacy Assessment Reports**: S3-based reports accessible through proxy endpoints
- **Map Integration**:
  - Device location data retrieval within map bounds
  - AQI data for environmental monitoring
  - Device telemetry access for detailed analysis
  - **High-Performance Wind Field Generation** with spatial clustering capability:
    - Sub-600ms response times (87% performance improvement from 4+ seconds)
    - MongoDB composite indexing for optimized weather data queries
    - Parallel processing for cluster and device operations
    - Advanced response handling with proper metadata calculations
  - Robust error handling for weather data processing
  - Validation of device coordinates to ensure data quality
  - Integration with Airqoon Base Map External API
  - Pagination support for retrieving all devices
  - Tenant-based security for device data access

- **Dashboard Visualizations**:
  - Dashboard summary with device counts and status metrics
  - Pollutant statistics with min/max values and device information
  - Device status distribution with percentage breakdowns
  - 24-hour trends for monitoring pollutant changes over time
  - Location rankings to identify areas with highest/lowest pollutant levels
  - Recent devices list with latest readings and status information
  - Calendar heatmap data for daily and hourly pollutant averages
  - Device-specific telemetry data aggregation
  - Support for multiple pollutant types (PM2.5, PM10, O3, NO2, CO, SO2, etc.)
  - Tenant-scoped data access for security
  - Fallback mock data generation for development
- **Export System**: 
  - **RabbitMQ Queue Processing**: Standardized on RabbitMQ for reliable background export job processing
  - **Synchronous/Asynchronous Processing**: Automatic processing mode selection based on data size
  - **Email Notifications**: Automated email delivery with professional formatting for completed exports
  - **Multiple Format Support**: CSV and Excel export formats with device-specific sheets
  - **Complete Audit Trail**: Full export job tracking with status monitoring and error handling
- **Data Filtering**: Filter reports by various parameters like template ID, tenant, date, language, and status
- **Tenant-Based Security**: Reports are automatically filtered based on the authenticated user's tenant
- **Performance Optimization**: Large fields (content, console_log) are conditionally included for better performance
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Type Safety**: Built with TypeScript for enhanced type safety and developer experience
- **Environmental Alarm System**: 
  - Complete alarm configuration management with complex rule definitions
  - Real-time alarm instance tracking with acknowledgment and suppression capabilities
  - Device group management with backend validation
  - Comprehensive alarm analytics and statistics
  - Production-tested API with 13 endpoints covering all alarm operations
  - Multi-tenant security with full audit trail and user tracking
  - Support for AND/OR/NOT logic in alarm conditions with multi-parameter monitoring

## Tech Stack

- **Node.js**: JavaScript runtime 
- **TypeScript**: Typed JavaScript
- **Fastify**: Fast and low overhead web framework
- **PostgreSQL**: Relational database for data storage
- **Puppeteer**: For PDF generation
- **Zod**: Schema validation library

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- pnpm (preferred package manager)
- Chromium (for local PDF export if not using Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lens-api
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development # Affects cookie settings (dev vs. prod) & other behaviors.
   
   # PostgreSQL Configuration
   PG_HOST=localhost
   PG_PORT=5432
   PG_DATABASE=lens_api
   PG_USER=postgres
   PG_PASSWORD=your_password
   ```

4. Start the development server:
   ```bash
   pnpm start:dev
   ```

5. Database utilities:
   ```bash
   # Create a database backup
   pnpm run db:backup
   
   # Check a table schema
   pnpm run db:check-schema markdown_reports
   
   # Check if a migration can be safely applied
   pnpm run db:check-migration
   
   # Run a migration
   pnpm run db:migrate <migration-file>
   ```

## API Endpoints

### Markdown Reports (PostgreSQL-based)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/reports` | Get all reports with optional filtering |
| GET | `/api/v1/reports/:id` | Get a single report by ID |
| GET | `/api/v1/reports/:id?include_console_log=true` | Get a single report by ID with console logs |
| GET | `/api/v1/reports/:id/export/pdf` | Export a report as PDF with clickable navigation, professional formatting, headers, and footers |
| POST | `/api/v1/reports` | Create a new report |
| PUT | `/api/v1/reports/:id` | Update an existing report |
| POST | `/api/v1/reports/:id/publish` | Publish a report (change status to published) |
| PATCH | `/api/v1/reports/:id/soft-delete` | Soft delete a report (set status to 'deleted') |
| PATCH | `/api/v1/reports/:id/undelete` | Undelete a report (admin only, revert status from 'deleted' to 'draft') |
| DELETE | `/api/v1/reports/:id` | Delete a report (admin only, hard delete) |

### Data Export API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/export` | Start a data export job with specified parameters |
| GET | `/api/v1/export/:id` | Check the status of an export job |
| GET | `/api/v1/export/:id/download` | Download the result of a completed export job |
| GET | `/api/v1/export` | List all export jobs with optional filtering |
| POST | `/api/v1/export/log` | Log an export action for audit and analytics tracking |

#### Export Processing Mode

The export API automatically determines whether to process your request synchronously (immediate response) or asynchronously (background processing with email notification) based on the estimated data size:

- **Small Exports**: Processed synchronously and return the data immediately in the HTTP response
- **Large Exports**: Processed asynchronously in the background with job status tracking

The system assesses each request by counting the number of records that match your query parameters. If the count is below a threshold (currently 10,000 records), the export is processed immediately. For larger datasets, a job is created and processed in the background.

#### Excel Export Format

When exporting data in Excel format, the following features are available:

- **Summary Sheet**: A summary sheet with device information including:
  - Device name
  - Data point count
  - Coordinates (latitude/longitude)
  - Google Maps links (clickable)

- **Individual Device Sheets**: Separate sheets for each device's data

- **Date Formatting**: All datetime fields are formatted as `DD.MM.YYYY HH:MM:SS`

- **Numeric Formatting**: Numeric values are limited to 2 decimal places for readability

- **MongoDB ID Support**: You can use MongoDB `_id` values in the `deviceIds` parameter

#### Data Export Parameters

**Export Data Endpoint**
```
POST /api/v1/export
```
Request body:
```json
{
  "dataType": "telemetry",         // Required: "telemetry", "weather", or "aqi"
  "deviceIds": ["device-123"],    // Required: Array of device IDs to export data for (supports both PostgreSQL device IDs and MongoDB _id values)
  "startTime": "2025-05-01T00:00:00Z", // Required: Start of time range
  "endTime": "2025-05-30T23:59:59Z",   // Required: End of time range
  "resolution": "average",        // For telemetry: "raw" or "average" (default: "average")
  "averageType": "1h",           // For average resolution: "1h", "8h_rolling", "24h_rolling", or "daily"
  "parameters": ["PM25", "NO2"], // Optional: Specific parameters to include
  "format": "csv",               // "csv" or "excel" (default: "csv")
  "email": "user@example.com",    // Optional: Email for notification when export is complete
  "includeAllParameters": false,  // Include all available parameters (default: false)
  "tenantSlug": "tenant-1"        // Optional: Specific tenant (defaults to user's tenant)
}
```

**List Export Jobs Endpoint**
```
GET /api/v1/export?status=completed&limit=10&offset=0
```
- `user_id`: Filter by user ID (admin only)
- `tenant_slug`: Filter by tenant slug (admin only)
- `status`: Filter by job status ("pending", "processing", "completed", "failed")
- `limit`: Maximum number of jobs to return (default: 10)
- `offset`: Starting index for pagination (default: 0)

#### Example curl Requests

**Start an Export Job**
```bash
curl -X POST 'http://localhost:3000/api/v1/export' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: lens_auth=your_jwt_token' \
  -d '{
    "dataType": "telemetry",
    "deviceIds": ["device-123", "device-456"],
    "startTime": "2025-05-01T00:00:00Z",
    "endTime": "2025-05-30T23:59:59Z",
    "resolution": "average",
    "averageType": "daily",
    "format": "excel",
    "email": "user@example.com",
    "includeAllParameters": true
  }'
```

**Check Export Job Status**
```bash
curl -X GET 'http://localhost:3000/api/v1/export/550e8400-e29b-41d4-a716-446655440000' \
  -H 'Cookie: lens_auth=your_jwt_token'
```

**Download Export Results**
```bash
curl -X GET 'http://localhost:3000/api/v1/export/550e8400-e29b-41d4-a716-446655440000/download' \
  -H 'Cookie: lens_auth=your_jwt_token' \
  --output export_result.xlsx
```

**List Export Jobs**
```bash
curl -X GET 'http://localhost:3000/api/v1/export?status=completed&limit=10' \
  -H 'Cookie: lens_auth=your_jwt_token'
```

**Log Export Action**
```bash
curl -X POST 'http://localhost:3000/api/v1/export/log' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: lens_auth=your_jwt_token' \
  -d '{
    "email": "user@example.com",
    "dataType": "telemetry",
    "deviceIds": ["device1", "device2", "device3"],
    "startTime": "2025-06-10T11:47:25.283Z",
    "endTime": "2025-06-17T11:47:25.283Z",
    "format": "excel",
    "includeAllParameters": true,
    "parameterIds": null,
    "resolution": null,
    "averageType": null,
    "timestamp": "2025-06-17T11:47:25.283Z"
  }'
```

### Environmental Alarm System API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/alarms/configurations` | Create a new alarm configuration with complex rules |
| GET | `/api/v1/alarms/configurations` | Get all alarm configurations with optional filtering |
| GET | `/api/v1/alarms/configurations/:id` | Get a specific alarm configuration by ID |
| PUT | `/api/v1/alarms/configurations/:id` | Update an existing alarm configuration |
| DELETE | `/api/v1/alarms/configurations/:id` | Delete an alarm configuration (soft delete) |
| GET | `/api/v1/alarms/instances` | Get alarm instances with pagination and filtering |
| POST | `/api/v1/alarms/instances/:id/acknowledge` | Acknowledge an alarm instance |
| POST | `/api/v1/alarms/instances/:id/false-alarm` | Mark an alarm instance as false alarm |
| POST | `/api/v1/alarms/instances/:id/suppress` | Suppress an alarm instance for specified duration |
| POST | `/api/v1/alarms/device-groups` | Create a device group for alarm targeting |
| GET | `/api/v1/alarms/device-groups` | Get all device groups for the current tenant |
| GET | `/api/v1/alarms/statistics` | Get alarm statistics and analytics |
| GET | `/api/v1/alarms/history/summary` | Get alarm history summary for analytics dashboard |

#### Alarm System Features

- **Complex Rule Engine**: Support for AND/OR/NOT logic in alarm conditions with multi-parameter monitoring
- **Device Targeting**: Individual devices, device groups, or all devices with backend validation
- **Alarm Lifecycle**: Complete tracking from trigger to resolution with acknowledgment, suppression, and false-alarm marking
- **Multi-tenant Security**: Complete tenant isolation with audit trail and user tracking
- **Production Testing**: All 13 endpoints thoroughly tested and production-ready
- **Query Parameters**: Advanced filtering with comma-separated status and severity parameters

#### Example Alarm Configuration

```json
{
  "name": "High PM2.5 Alert",
  "description": "Monitor PM2.5 levels across downtown sensors",
  "conditions": {
    "operator": "AND",
    "rules": [
      {
        "parameter": "PM25",
        "operator": ">",
        "value": 35,
        "duration": "5m"
      }
    ]
  },
  "target_type": "device_group",
  "target_ids": ["group-uuid"],
  "severity": "high",
  "enabled": true
}
```

### Dashboard API (Data Visualizations)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dashboard/summary` | Get dashboard summary with device counts and status metrics |
| GET | `/api/v1/dashboard/pollutant-statistics` | Get pollutant statistics with min/max values and device information |
| GET | `/api/v1/dashboard/device-status-distribution` | Get device status distribution with percentage breakdowns |
| GET | `/api/v1/dashboard/24-hour-trends` | Get 24-hour trends for monitoring pollutant changes over time |
| GET | `/api/v1/dashboard/location-rankings` | Get location rankings to identify areas with highest/lowest pollutant levels |
| GET | `/api/v1/dashboard/recent-devices` | Get recent devices list with latest readings and status information |
| GET | `/api/v1/dashboard/daily-average-heatmap` | Get daily average heatmap data for calendar visualization |
| GET | `/api/v1/dashboard/hourly-average-heatmap` | Get hourly average heatmap data for calendar visualization |
| GET | `/api/v1/dashboard/parameters` | Get available pollutant parameters with color ranges for visualization |

#### Dashboard API Parameters

**Dashboard Parameters Endpoint**
```
GET /api/v1/dashboard/parameters?type=particulate
```
- `type`: Optional filter for parameter type ('particulate', 'gaseous', 'other')

**Daily Average Heatmap Endpoint**
```
GET /api/v1/dashboard/daily-average-heatmap?pollutantId=PM25&startDatetime=2025-01-01T00:00:00Z&endDatetime=2025-12-31T23:59:59Z
```
- `pollutantId`: ID of the pollutant to get data for (e.g., 'PM25')
- `startDatetime`: ISO format date string for the start of the time range
- `endDatetime`: ISO format date string for the end of the time range

**Hourly Average Heatmap Endpoint**
```
GET /api/v1/dashboard/hourly-average-heatmap?pollutantId=PM25&startDatetime=2025-06-01T00:00:00Z&endDatetime=2025-06-07T23:59:59Z
```
- `pollutantId`: ID of the pollutant to get data for (e.g., 'PM25')
- `startDatetime`: ISO format date string for the start of the time range
- `endDatetime`: ISO format date string for the end of the time range

### Map API (Environmental Data)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/map/devices` | Get devices within map bounds with pagination support |
| GET | `/api/v1/map/aqi` | Get AQI data for specified devices |
| GET | `/api/v1/map/devices/:deviceId/telemetry` | Get telemetry data for a device with optional time range |
| GET | `/api/v1/map/devices/:deviceId/telemetry/latest` | Get latest telemetry data for a device |
| GET | `/api/v1/map/devices/:deviceId/weather` | Get historical weather data for a device with optional time range |
| GET | `/api/v1/map/devices/:deviceId/weather/latest` | Get latest weather data for a device |
| GET | `/api/v1/map/devices/:deviceId/aqi/latest` | Get latest AQI data for a specific device |
| GET | `/api/v1/map/devices/:deviceId/aqi/historical` | Get historical AQI data for a specific device with pagination |
| GET | `/api/v1/map/wind-field` | Get wind field data for map visualization with optional animation support |
| GET | `/api/v1/map/parameters` | Get available pollutant parameters with color ranges for visualization |
| GET | `/api/v1/map/devices/telemetry-bulk` | Get bulk telemetry data for multiple devices optimized for time-series visualization |

#### External Stations API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/map/stations/latest-telemetry?deviceIds=<id>` | Latest telemetry for a public station (single id). Returns legacy single-device shape `{ Metric: { DateTime, Unit, Value } }`. |
| GET | `/api/v1/map/stations/historical-telemetry?deviceId=<id>&startTime=&endTime=&pollutants=&limit=` | Historical telemetry for a public station. Returns bulk time-series `{ deviceMetadata, timeSeries, timeRange, pollutants }`. |

Notes:
- Source timestamps are stored UTC+3; responses are shifted to true UTC0 (Z) by subtracting 3 hours in the controller.

#### Map API Parameters

**Devices Endpoint**
```
GET /api/v1/map/devices?limit=100&offset=0
```
- `limit`: Maximum number of devices to return (default: 100)
- `offset`: Starting index for pagination (default: 0)
- `bounds`: Map bounds for filtering devices by location
- `deviceType`: Filter by device type
- `status`: Filter by device status ('active', 'inactive', 'maintenance')

**Telemetry Endpoint**
```
GET /api/v1/map/devices/:deviceId/telemetry?startTime=2025-04-20T00:00:00Z&endTime=2025-04-22T23:59:59Z&filter=PM25&limit=100&offset=0&getAllPages=true
```
- `startTime`: ISO format date string for the start of the time range
- `endTime`: ISO format date string for the end of the time range
- `filter`: Optional filter parameter (e.g., 'PM25')
- `limit`: Maximum number of telemetry records to return (default: 100, max: 100)
- `offset`: Starting index for pagination (default: 0)
- `getAllPages`: If true, retrieves all pages of telemetry data (default: false)

**Weather Endpoint**
```
GET /api/v1/map/devices/:deviceId/weather?startTime=2025-04-20T00:00:00Z&endTime=2025-04-22T23:59:59Z&limit=100&offset=0
```

**Pollutant Parameters Endpoint**
```
GET /api/v1/map/parameters?type=particulate
```
- `type`: Optional filter for parameter type ('particulate', 'gaseous')
- `startTime`: ISO format date string for the start of the time range
- `endTime`: ISO format date string for the end of the time range
- `limit`: Maximum number of weather records to return (default: 100)
- `offset`: Starting index for pagination (default: 0)

**AQI Latest Endpoint**
```
GET /api/v1/map/devices/:deviceId/aqi/latest
```
Returns the most recent AQI data for the specified device, including measurements for different parameters and organizations.

**AQI Historical Endpoint**
```
GET /api/v1/map/devices/:deviceId/aqi/historical?startTime=2025-04-20T00:00:00Z&endTime=2025-04-22T23:59:59Z&pollutant=PM2.5-24h&organization=epa&limit=100&offset=0&getAllPages=true
```
- `startTime`: ISO format date string for the start of the time range
- `endTime`: ISO format date string for the end of the time range
- `pollutant`: Optional filter for specific pollutant (e.g., 'PM2.5-24h', 'PM10-24h')
- `standard`: Optional filter for specific standard
- `organization`: Optional filter for specific organization (e.g., 'epa' for US-EPA, 'eea' for EEA, 'my' for Malaysia, 'tr' for Turkiye)
- `limit`: Maximum number of AQI records to return (default: 100)
- `offset`: Starting index for pagination (default: 0)
- `getAllPages`: If true, retrieves all pages of AQI data (default: false)

**Wind Field Endpoint**
```
GET /api/v1/map/wind-field?bounds={"north":51.55,"south":51.45,"east":0.08,"west":-0.26}&startTime=2025-05-20T00:00:00Z&endTime=2025-05-21T00:00:00Z&animate=true&timeSteps=12&gridSize=15
```
- `bounds`: JSON object with map bounds in format `{"north":51.55,"south":51.45,"east":0.08,"west":-0.26}` (optional if deviceIds provided)
- `deviceIds`: Comma-separated list of device IDs to include in wind field calculation (optional if bounds provided)
- `startTime`: ISO format date string for the start of the time range
- `endTime`: ISO format date string for the end of the time range
- `gridSize`: Number of points in the grid for interpolation (default: 10)
- `animate`: If true, returns time-series data for animation (default: false)
- `timeSteps`: Number of time steps for animation (default: 10, max: 50, only used when animate=true)
- `timeInterval`: Interval between time steps (e.g., '1h' for hourly, '30m' for every 30 minutes, optional)
- `requestedTimePoints`: Comma-separated ISO timestamps for specific time points (for time-scrubbing optimization)
- `optimizeForScrubbing`: Enable scrubbing optimizations (default: false)
- `includeMetadata`: Include performance metadata (default: false)
- `compressionEnabled`: Enable response compression hints (default: false)

**Bulk Telemetry Endpoint**
```
GET /api/v1/map/devices/telemetry-bulk?deviceIds=device1,device2&startTime=2025-06-01T00:00:00Z&endTime=2025-06-02T00:00:00Z&pollutants=PM25,NO2,O3&interval=1h&includeMetadata=true
```
- `deviceIds`: Comma-separated device IDs (MongoDB ObjectIds supported)
- `startTime`: ISO format date string for the start of the time range
- `endTime`: ISO format date string for the end of the time range
- `pollutants`: Comma-separated pollutant IDs (e.g., 'PM25,NO2,O3,H2S,VOC,NOISE')
- `interval`: Time interval ('1h', '24h'), defaults to '1h'
- `limit`: Max records per device
- `includeMetadata`: Include device metadata in response

**Note**: The bulk telemetry endpoint now supports additional pollutants including H2S, VOC, and NOISE with proper PostgreSQL field mappings.

**Latest Telemetry Endpoint**
```
GET /api/v1/map/devices/:deviceId/telemetry/latest
```
Returns the most recent telemetry data for the specified device.

### Devices API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/devices` | List devices for the authenticated tenant |
| PATCH | `/api/v1/devices/:id` | Partially update a device's name and/or location |

#### GET /api/v1/devices
- Returns `{ data: IDeviceEntity[] }` where each item has:
  - `id`, `name`, `label`, `location { latitude, longitude }`, `status ('active'|'inactive'|'maintenance')`, `updatedAt`
- Tenant-scoped: returns devices for the authenticated user's tenant.

#### PATCH /api/v1/devices/:id
- Updates device metadata in `basemapDB.Devices`.
- Path param:
  - `id`: Mongo `Devices.Id` (ObjectId string)
- Request body (send only what changed):
```json
{
  "name": "New Device Name",
  "location": { "latitude": 39.862222, "longitude": 26.238611 }
}
```
- Validation:
  - `name`: 1–200 chars, trimmed
  - `location.latitude`: [-90, 90]
  - `location.longitude`: [-180, 180]
  - At least one of `name` or `location` must be provided
- Security:
  - Tenant isolation via `request.user.TenantSlug`; admin users can update across tenants
- Response:
  - Returns the updated device in `IDeviceEntity` shape

Example curl (update name):
```bash
curl -X PATCH 'http://localhost:3000/api/v1/devices/66f51ffe99b95aefdf962071' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: lens_auth=YOUR_JWT' \
  -d '{ "name": "AQ-M7 - airQuality_cedo" }'
```

Example curl (update location):
```bash
curl -X PATCH 'http://localhost:3000/api/v1/devices/66f51ffe99b95aefdf962071' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: lens_auth=YOUR_JWT' \
  -d '{ "location": { "latitude": 39.862222, "longitude": 26.238611 } }'
```

Example curl (update name + location):
```bash
curl -X PATCH 'http://localhost:3000/api/v1/devices/66f51ffe99b95aefdf962071' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: lens_auth=YOUR_JWT' \
  -d '{ "name": "New Name", "location": { "latitude": 39.8623, "longitude": 26.2387 } }'
```

### Image Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/images/upload-url` | Generate pre-signed URL for image upload |
| GET | `/api/v1/images` | Get images with optional filtering and pagination |
| GET | `/api/v1/images/view/:key` | View an image through API proxy (public endpoint) |
| DELETE | `/api/v1/images/:id` | Delete an image |

### Request & Response Examples

#### Get All Reports

**Request:**
```http
GET /api/v1/reports?status=draft&year=2023
```

Note: The tenant_slug is automatically applied based on the authenticated user's tenant.

**Response:**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "template_id": "template-123",
      "tenant_slug": "acme",
      "year": 2023,
      "month": 4,
      "language": "en",
      "status": "draft",
      "content": "# Monthly Report\n\nThis is the monthly report for April 2023.",
      "version": "1.0.0",
      "metadata": {
        "author": "John Doe",
        "department": "Environmental Science"
      },
      "created_at": "2023-04-01T12:00:00Z",
      "updated_at": "2023-04-15T14:30:00Z"
    }
  ],
  "count": 1
}
```

#### Create a Report

**Request:**
```http
POST /api/v1/reports
Content-Type: application/json

{
  "template_id": "template-123",
  "tenant_slug": "acme", // This will be overridden by the authenticated user's tenant
  "year": 2023,
  "month": 5,
  "language": "en",
  "status": "draft",
  "content": "# Monthly Report\n\nThis is the monthly report for May 2023.",
  "version": "1.0.0",
  "metadata": {
    "author": "Jane Smith",
    "department": "Environmental Science"
  }
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "template_id": "template-123",
  "tenant_slug": "acme",
  "year": 2023,
  "month": 5,
  "language": "en",
  "status": "draft",
  "content": "# Monthly Report\n\nThis is the monthly report for May 2023.",
  "version": "1.0.0",
  "metadata": {
    "author": "Jane Smith",
    "department": "Environmental Science"
  },
  "created_at": "2023-05-01T12:00:00Z",
  "updated_at": "2023-05-01T12:00:00Z"
}
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Login with email and password |
| GET | `/api/v1/auth/me` | Get current user information including admin status |
| GET | `/api/v1/auth/tenants` | Get available tenants (admin users only) |
| POST | `/api/v1/auth/logout` | Logout current user |

### Legacy Assessment Reports (S3-based)

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/v1/legacy-reports/assessment/*` | Proxy to S3-stored assessment reports |

### Map Data Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/v1/map/devices` | Get devices within map bounds |
| GET | `/api/v1/map/devices/:deviceId/telemetry` | Get telemetry data for a specific device |
| GET | `/api/v1/map/aqi` | Get AQI data for devices |

#### Get Assessment Report

**Request:**
```http
GET /api/v1/legacy-reports/assessment/report-2023.pdf
```

Note: The user's ID from the authentication token is automatically prepended to the path when accessing S3, ensuring users can only access their own reports.

**Response:**
The actual report file (PDF, Excel, etc.) is streamed directly from S3 to the client.

#### Get a Single Report

**Request:**
```http
GET /api/v1/reports/550e8400-e29b-41d4-a716-446655440000
```

To include console logs in the response:
```http
GET /api/v1/reports/550e8400-e29b-41d4-a716-446655440000?include_console_log=true
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "template_id": "template-123",
  "tenant_slug": "acme",
  "year": 2023,
  "month": 4,
  "language": "en",
  "status": "draft",
  "content": "# Monthly Report\n\nThis is the monthly report for April 2023.",
  "version": "1.0.0",
  "metadata": {
    "author": "John Doe",
    "department": "Environmental Science"
  },
  "created_at": "2023-04-01T12:00:00Z",
  "updated_at": "2023-04-15T14:30:00Z",
  "console_log": "[2023-04-01] Processing started...\n[2023-04-01] Data retrieved from sources...\n[2023-04-15] Report updated with new data..." // Only included when include_console_log=true
}
```

#### Export Report as PDF

**Request:**
```http
GET /api/v1/reports/550e8400-e29b-41d4-a716-446655440000/export/pdf
```

**Response:**
The PDF file is streamed directly to the client with Content-Type: application/pdf.

#### Get Available Tenants (Admin Only)

**Request:**
```http
GET /api/v1/auth/tenants
```

Note: This endpoint is only accessible to users with admin privileges.

**Response:**
```json
{
  "tenants": [
    {
      "name": "Akçansa",
      "slug": "akcansa"
    },
    {
      "name": "Tüpraş",
      "slug": "tupras"
    },
    {
      "name": "Fernas",
      "slug": "fernas"
    },
    {
      "name": "Kadikoy Municipality",
      "slug": "kadikoy-municipality"
    }
  ]
}
```

## Project Structure

```
lens-api/
├── src/
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   │   ├── v1/                 # API v1 controllers
│   │   └── BaseController.ts   # Base controller class
│   ├── domains/                # Domain services and entities
│   │   ├── ReportDomain/       # Report domain
│   │   └── DomainServices.ts   # Domain services factory
│   ├── handlers/               # Error handlers
│   ├── middlewares/            # Middleware functions
│   ├── routes/                 # API routes
│   │   └── v1/                 # API v1 routes
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── index.ts                # Application entry point
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── Dockerfile                  # Docker configuration
├── package.json                # Package configuration
├── pnpm-lock.yaml             # pnpm lock file
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Development

### Database Migrations

To set up the database schema:

```bash
pnpm migrate:up
```

To roll back migrations:

```bash
pnpm migrate:down
```

### Testing

Run tests with:

```bash
pnpm test
```

### Linting

Check code style with:

```bash
pnpm lint
```

Fix linting issues automatically:

```bash
pnpm lint:fix
```

## Deployment

### Docker

The project includes a `Dockerfile` for containerized deployment. 
The `Dockerfile` (based on `node:20.14.0-alpine`) installs system Chromium for Puppeteer, simplifying PDF generation in containers.

Build the Docker image:

```bash
docker build -t lens-api .
```

Run the container:

```bash
docker run -p 3000:3000 --env-file .env lens-api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
