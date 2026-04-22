# Airqoon Base Map UI

A comprehensive air quality monitoring web application that provides real-time environmental data visualization and user interaction capabilities for hyperlocal air pollution management.

## Features

- 🗺️ **Interactive Map Interface** - Leaflet-based mapping with real-time device locations
- 📊 **Air Quality Monitoring** - Multi-standard AQI display (EEA, US-EPA, US-EPA-Nowcast, Turkiye)
- 🌡️ **Heat Map Visualizations** - IDW-interpolated pollution and temperature distribution maps
- 🔥 **Smart Fire Detection System** - Satellite fire detection with 24-hour fresh data, confidence-based sorting (top 100 highest-quality fires), and multilanguage support
- 📈 **Device Detail Views** - Comprehensive monitoring station information
- 🎨 **Multi-language Support** - Available in English and Turkish
- 🎫 **User Feedback System** - Location-based air quality issue reporting
- ⚙️ **Customizable Settings** - Theme, language, and unit preferences

## Tech Stack

- **Frontend**: React 18.2.0 + TypeScript
- **Build Tool**: Vite 4.3.9
- **State Management**: Redux with Redux Toolkit
- **Styling**: SCSS with modular architecture
- **Maps**: Leaflet 1.9.4
- **Charts**: Recharts 2.6.2
- **HTTP Client**: Axios with retry logic
- **Internationalization**: i18next

## Prerequisites

- Node.js >= 18.12.1
- pnpm (recommended package manager)

## Installation

```bash
# Install dependencies
pnpm install
```

## Development

```bash
# Start development server (runs on port 3000)
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run serve

# Run linting
pnpm run lint
```

## Environment Configuration

Create a `.env.development` file with the following variables:

```env
API_URL=https://your-api-endpoint.com
DEFAULT_LANGUAGE=en
CURRENT_MAP_LATITUDE=40.7128
CURRENT_MAP_LONGITUDE=-74.0060
CURRENT_MAP_ZOOM=10
IS_TELEMETRY_V2_ENABLED=false
ROOT_PATH=/
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── views/             # Main application views
├── store/             # Redux store and state management
├── services/          # API services and HTTP clients
├── hooks/             # Custom React hooks
├── models/            # TypeScript interfaces and types
├── assets/            # Stylesheets and static assets
├── locales/           # Internationalization files
└── domain/            # Business logic and utilities
```

## Key Features

### Air Quality Monitoring
- Multi-standard AQI calculations (EEA, US-EPA, US-EPA-Nowcast, Turkiye)
- API v2 integration with pre-computed AQI values
- Multi-pollutant tracking (PM2.5, PM10, NO2, SO2, O3, CO)
- Color-coded quality indicators matching international standards
- Historical data visualization

### Interactive Mapping
- Device location markers with real-time status
- IDW-interpolated heat map overlays for multi-standard AQI visualization
- Fire detection markers with satellite confidence levels
- Temperature heat maps with spatial interpolation
- Layer toggle controls for different data views
- Responsive zoom and pan controls

### User Experience
- Multi-language support (English/Turkish)
- Theme selection (Light/Dark/System)
- Mobile-responsive design
- Accessibility features

## API Integration

The application supports both v1 and v2 API endpoints:
- Toggle via `IS_TELEMETRY_V2_ENABLED` environment variable
- Automatic error handling and retry logic
- Maintenance page display for service unavailability

## Docker Support

```bash
# Build Docker image
docker build -t airqoon-map-ui .

# Run with Docker Compose
docker-compose up
```

## Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for all new code
3. Add appropriate tests for new features
4. Update documentation as needed
5. Use the established path aliases for imports

## License

This project is proprietary software owned by Airqoon.

## Support

For technical support or questions, please contact the development team.
