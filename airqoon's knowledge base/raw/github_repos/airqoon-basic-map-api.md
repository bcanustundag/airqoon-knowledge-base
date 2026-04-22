# Airqoon Basic Map API

Fastify-based REST API for Airqoon's map services with MongoDB backend.

## Quick Start
```bash
pnpm install
pnpm dev
```

**Requirements:** Node.js >=20.0.0, pnpm >=8.0.0

**Development Commands:**
```bash
pnpm dev              # Start development server
pnpm dev:watch        # Start with file watching
pnpm dev:debug        # Start with debugger
pnpm start            # Production start
```

**Custom port:**
```bash
NODE_PORT=5001 pnpm dev
```

## API Endpoints

### Device Heatmap Data
- **GET** `/api/v1/devices` - Device heatmap with basic telemetry + AQI data
- **GET** `/api/v2/devices/heatmaps/latest.geojson` - Enhanced heatmap with multi-standard AQI values

Both endpoints return AQI data for three standards:
- `computedAQI_EEA` - European Environment Agency
- `computedAQI_USEPA` - US Environmental Protection Agency  
- `computedAQI_Turkiye` - Turkish Air Quality Standards

### Individual Device Data
- **GET** `/api/v2/devices/:deviceId/DeviceAqiTelemetries` - Raw AQI telemetry data
- **GET** `/api/v2/devices/:deviceId/telemetries/latest` - Latest device telemetry

## Environment Configuration
Copy `.env.example` to `.env` and configure:
- `MONGO_DB_URI` - MongoDB connection string
- `JWT_ENABLED` - Enable/disable authentication (set to `false` for development)
- `ROOT_PATH` - API root path prefix (default: `/`)
