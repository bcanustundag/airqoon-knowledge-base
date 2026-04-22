# Airqoon Base Map Tile Server

Vector tile server for Airqoon air quality monitoring map. Serves Mapbox Vector Tiles (MVT) in Protocol Buffer format (.pbf) for efficient map rendering.

## Overview

This service provides air quality device data as vector tiles, enabling:
- Efficient spatial data loading (only visible area)
- Smooth pan/zoom without refetching all data
- Automatic clustering at different zoom levels
- Client-side styling flexibility with MapLibre GL JS

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Clients                                  │
│  (airqoon-base-map-ui, airqoon-widget-ui, third-party apps)    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               Airqoon Base Map Tile Server                      │
│                                                                 │
│  GET /tiles/devices/{z}/{x}/{y}.pbf                            │
│  GET /tiles/aqi/{z}/{x}/{y}.pbf                                │
│  GET /health                                                    │
│                                                                 │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────┐   │
│  │  GeoJSON-VT │ -> │   VT-PBF     │ -> │ Protocol Buffer │   │
│  │  (spatial   │    │ (serialize)  │    │    Response     │   │
│  │   index)    │    │              │    │                 │   │
│  └─────────────┘    └──────────────┘    └─────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MongoDB (Devices)                            │
│                    or sync from basic-map-api                   │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Set environment variables
cp .env.example .env
# Edit .env with your MONGO_DB_URI

# Start the server
pnpm start

# Development with auto-reload
pnpm dev
```

## API Endpoints

### Vector Tiles

#### `GET /tiles/devices/{z}/{x}/{y}.pbf`

Returns device locations as vector tiles.

- `z`: Zoom level (0-22)
- `x`: Tile X coordinate
- `y`: Tile Y coordinate

**Response**: Protocol Buffer encoded vector tile

**Layers**:
- `devices`: Point features with properties:
  - `deviceId`: Device identifier
  - `name`: Device name
  - `label`: Device label
  - `tenantName`: Tenant display name
  - `deviceSource`: "Airqoon" or "State"
  - `hasAqi`: Boolean indicating if AQI data is available

#### `GET /tiles/aqi/{z}/{x}/{y}.pbf`

Returns device locations with AQI values as vector tiles.

**Layers**:
- `aqi`: Point features with properties:
  - All device properties plus:
  - `aqiEea`: EEA AQI value
  - `aqiUsepa`: US-EPA AQI value
  - `aqiTurkiye`: Turkiye AQI value
  - `temperature`: Latest temperature reading
  - `status`: "Active" or "Inactive"

### Metadata

#### `GET /tiles/devices.json`

Returns TileJSON metadata for the devices tileset.

```json
{
  "tilejson": "3.0.0",
  "name": "Airqoon Devices",
  "tiles": ["https://tiles.airqoon.com/tiles/devices/{z}/{x}/{y}.pbf"],
  "minzoom": 0,
  "maxzoom": 14,
  "bounds": [26.0, 36.0, 45.0, 42.0]
}
```

### Health Check

#### `GET /health`

Returns server health status.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_PORT` | Server port | `3001` |
| `MONGO_DB_URI` | MongoDB connection string | Required |
| `CACHE_TTL_SECONDS` | Tile cache duration | `1800` (30 min) |
| `MAX_ZOOM` | Maximum zoom level for tiles | `14` |
| `CORS_ORIGIN` | Allowed CORS origins | `*` |

## Frontend Integration

### Leaflet with leaflet-vector-tile-layer (Recommended)

The recommended approach for Leaflet integration is using `leaflet-vector-tile-layer`:

```typescript
import L from 'leaflet';
import LeafletVectorTileLayer from 'leaflet-vector-tile-layer';

const map = L.map('map').setView([39.9334, 32.8597], 6);

// Add base tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

// Add vector tile layer for AQI data
const vectorLayer = new LeafletVectorTileLayer(
  'https://api.example.com/v2/tiles/aqi/{z}/{x}/{y}.pbf',
  {
    interactive: true,
    maxNativeZoom: 14,
    minNativeZoom: 0,
    // Style function receives (feature, layerName, zoom)
    style: (feature, layerName, zoom) => {
      const properties = feature.properties || {};
      const aqiValue = properties.aqiTurkiye; // or aqiEea, aqiUsepa

      // Determine color based on AQI value
      let fillColor = '#888888'; // default gray
      if (properties.hasAqi && aqiValue != null) {
        if (aqiValue <= 50) fillColor = '#6bc926';      // Good
        else if (aqiValue <= 100) fillColor = '#d1cf1d'; // Moderate
        else if (aqiValue <= 150) fillColor = '#efbb0f'; // Unhealthy for Sensitive
        else if (aqiValue <= 200) fillColor = '#ef7120'; // Unhealthy
        else if (aqiValue <= 300) fillColor = '#ef2a36'; // Very Unhealthy
        else fillColor = '#b00057';                      // Hazardous
      }

      // Adjust radius for high zoom levels
      const radius = zoom > 14 ? 8 / Math.pow(2, zoom - 14) : 8;

      return {
        radius,
        fillColor,
        color: '#ffffff',
        weight: 2,
        fillOpacity: 0.9,
      };
    },
    getFeatureId: (feature) => feature.properties?.deviceId,
  }
);

vectorLayer.addTo(map);

// Handle click events
vectorLayer.on('click', (e) => {
  const deviceId = e.layer?.properties?.deviceId;
  if (deviceId) {
    console.log('Clicked device:', deviceId);
  }
});
```

### Why leaflet-vector-tile-layer?

| Library | Status | Issue |
|---------|--------|-------|
| `leaflet-vector-tile-layer` | **Recommended** | Works with Leaflet 1.9.x, proper pan/zoom sync |
| `maplibre-gl-leaflet` | Not recommended | WebGL layer doesn't sync with Leaflet pan/zoom |
| `leaflet.vectorgrid` | Not recommended | Unmaintained, Leaflet 1.9.x compatibility issues |

### MapLibre GL JS (Standalone)

For standalone MapLibre GL JS applications (not embedded in Leaflet):

```javascript
import maplibregl from 'maplibre-gl';

const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'airqoon-aqi': {
        type: 'vector',
        tiles: ['https://api.example.com/v2/tiles/aqi/{z}/{x}/{y}.pbf'],
        minzoom: 0,
        maxzoom: 14
      }
    },
    layers: [
      {
        id: 'aqi-markers',
        type: 'circle',
        source: 'airqoon-aqi',
        'source-layer': 'aqi',
        paint: {
          'circle-radius': 8,
          'circle-color': [
            'case',
            ['<=', ['get', 'aqiTurkiye'], 50], '#6bc926',
            ['<=', ['get', 'aqiTurkiye'], 100], '#d1cf1d',
            ['<=', ['get', 'aqiTurkiye'], 150], '#efbb0f',
            ['<=', ['get', 'aqiTurkiye'], 200], '#ef7120',
            ['<=', ['get', 'aqiTurkiye'], 300], '#ef2a36',
            '#b00057'
          ],
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      }
    ]
  },
  center: [32.8597, 39.9334],
  zoom: 6
});
```

## Data Flow

1. **Data Sync** (every 30 minutes by default):
   - Fetch active devices from MongoDB
   - Build GeoJSON FeatureCollection
   - Create spatial index with `geojson-vt`

2. **Tile Request**:
   - Parse z/x/y from URL
   - Check tile cache
   - If miss: extract tile from spatial index with `geojson-vt`
   - Encode to Protocol Buffer with `vt-pbf`
   - Return with appropriate headers

## Comparison with Current Approach

| Aspect | Current (GeoJSON API) | Vector Tiles |
|--------|----------------------|--------------|
| Data format | JSON | Protocol Buffer (binary) |
| Data size | ~100KB for 100 devices | ~5-10KB per tile |
| Initial load | All devices at once | Only visible area |
| Pan/zoom | Re-fetch all | Smooth, cached |
| Clustering | Client-side IDW | Native at zoom levels |
| Styling | Limited | Full MapLibre GL style spec |

## Similar Implementations

- [OpenAQ Explorer](https://explore.openaq.org/) - Uses MapLibre GL with custom tile server
- [Airly Map](https://airly.org/map/) - Uses vector tiles at tiles.airly.eu
- [IQAir Visual](https://www.iqair.com/air-quality-map) - Similar tile-based approach

## Development

### Project Structure

```
src/
├── index.js              # Entry point, Fastify server setup
├── config.js             # Environment configuration
├── database/
│   └── connection.js     # MongoDB connection
├── services/
│   ├── TileService.js    # Tile generation logic
│   └── DataSyncService.js # Device data synchronization
├── routes/
│   └── tilesRouter.js    # Tile endpoint routes
└── utils/
    └── Cache.js          # In-memory tile caching
```

### Adding New Tile Layers

1. Create data sync function in `DataSyncService.js`
2. Create tile index in `TileService.js`
3. Add route in `tilesRouter.js`
4. Document in README

## License

MIT
