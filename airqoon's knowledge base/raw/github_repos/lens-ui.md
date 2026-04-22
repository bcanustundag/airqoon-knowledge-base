# Airqoon Lens (Enterprise Dashboard)

Airqoon Lens is an enterprise dashboard for air quality monitoring, data visualization, report management, and environmental alarm monitoring. The application features comprehensive data export capabilities, time-based map visualization, advanced reporting tools with markdown editing and PDF export, and a complete alarm system for real-time environmental monitoring and notifications.

## Requirements

- Node: >=22.14.0
- pnpm: >=10.7.1

## Installation

```shell
pnpm install
```

## Development

```shell
pnpm run dev
```

## Build

```shell
pnpm run build
```

## Features

### Dashboard Analytics
- **System Overview Widget**
  - Total devices count with device icon
  - Active devices ratio with ring progress indicator
  - Last hour activity tracking
  - Last data received and update timestamps
  - Avg Battery mini gauge (samples up to 30 devices using existing endpoints)

- **Advanced Heatmap Visualizations**
  - Daily Average Calendar Heatmap with AQI color standards
  - Hourly Average Table Heatmap with device rows and time columns
  - Dynamic parameter selection with API-driven pollutant options
  - Separate date range controls for daily and hourly views
  - Parameter-specific color scales for accurate AQI representation

- **Real-time Data Widgets**
  - Pollutant statistics with min/max values and device locations
  - Device status distribution with interactive charts
  - 24-hour trends visualization
  - Location rankings for different pollutants
  - Recent device activity monitoring
  - Consistent refresh buttons with loading indicators

### Interactive Map Interface
- Full-screen map with semi-transparent overlay controls
- Advanced device filtering with status and pollutant selection
  - Filter by device status (Active, Inactive, Error, or All)
  - Filter by pollutant type (PM2.5, H2S, BATTERY, etc.)
  - Smart filter reset with sensible defaults
- Compact tile layer selection menu (e.g., Streets, Satellite) integrated into map controls
- **Time-Based Data Visualization**
  - Interactive TimeAxisControl with 48-hour historical data playback
  - Hourly time resolution slider with formatted time tooltips on thumb hover
  - Real-time device marker updates showing historical pollutant data
  - Time-synchronized wind field visualization with historical data
  - Play/pause controls with configurable playback speeds
  - Efficient historical data caching (10-minute timeout) for smooth performance
- Wind field visualization (Beta) showing direction and speed with color-coded arrows
- Advanced wind field clustering with configurable distance parameters
- Visual distinction between different wind field clusters with color coding
- Automatic centroid calculation for better cluster visualization
- Support for various API response formats including nested arrays
- Time-based wind field data with historical playback capabilities
- Professional loading states instead of test/dummy data for production readiness
- Adjustable wind field grid density via dropdown settings menu
- Resizable device details panel with custom resize handle
- Multi-device monitoring with tabbed interface
- Toggle selection for devices (click to select/deselect)
- Interactive elliptical markers showing pollutant data with color coding
- Blue border and scale effect for selected devices
- Smart map positioning that maintains view during device selection/deselection
- Hover tooltips with device and pollutant information
- Responsive design that adapts to different screen sizes

### Device Comparison
- Compare multiple devices with interactive bar charts and line charts
- Optimized PM2.5 comparison chart with consolidated data structure for improved performance
- Properly spaced x-axis tick marks with smart interval configuration
- Toggle visibility of pollutants directly from chart legends
- Interactive tooltips showing device names and relative timestamps
- Hover functionality to display exact date/time information
- Visual feedback for toggled-off pollutants with grayed-out styling
- Automatic tab selection for seamless user experience
- Consistent scrolling behavior across all comparison views
- Unit toggle system for gaseous pollutants to switch between μg/m³ and ppb measurements
- Consolidated visualization of multiple pollutants (NO₂, O₃, CO, SO₂) with reusable components
- User-friendly parameter names with proper chemical notation and consistent unit formatting

### Historical Data Visualization
- Specialized charts for different parameter groups:
  - Particulate Matter (PM2.5, PM10)
  - Environmental Conditions (Temperature, Humidity, Pressure) with multiple Y-axes
  - Gas Measurements (NO2, O3, SO2, CO) with both μg/m³ and ppb units
  - Battery metrics (Battery, Battery on load in V; Battery % on secondary axis)
- Time-based filtering (12h, 1d, 2d, 3d, 7d) with consistent behavior in both single device and comparison modes
- Optimized data loading that prevents duplicate API calls when switching time ranges
- Toggle visibility of individual parameters
- Smart default visibility settings (μg/m³ visible, ppb hidden by default)
- Enhanced tooltips with parameter values, proper units, and timestamp formatting
- Multiple Y-axes with appropriate units for parameters with different scales
- Conditional rendering that only shows relevant charts based on available data
- Responsive design that adapts to different screen sizes

### Role-Based Report Management

- **Admin Users:**
  - Can permanently delete reports using the `DELETE /api/v1/reports/:id` endpoint. Permanently deleted reports are still visible in the UI with a red "DELETED" badge for audit purposes.
  - Can soft-delete (hide) reports using the `PATCH /api/v1/reports/:id/soft-delete` endpoint with a "Hide Report" button.
  - Can undelete (restore) soft-deleted reports using the `PATCH /api/v1/reports/:id/undelete` endpoint, which returns them to draft status.
- **Regular Users:**
  - Can soft-delete reports using the `PATCH /api/v1/reports/:id/soft-delete` endpoint. Soft-deleted reports are hidden from regular users but remain accessible to admins.
- **UI Behavior:**
  - The delete options are context-aware: admins see both "Hide Report" and "Delete Permanently" options.
  - Confirmation dialogs clearly indicate whether the action is permanent or reversible.
  - Admins see all reports, including deleted ones; regular users only see active reports.
  - Undelete button appears for soft-deleted reports, allowing admins to restore them.
- **API Endpoints:**
  - **Soft Delete:** `PATCH /api/v1/reports/:id/soft-delete` (marks a report as deleted, status = 'deleted')
  - **Hard Delete (Admins only):** `DELETE /api/v1/reports/:id` (permanently removes the report from the database)
  - **Undelete (Admins only):** `PATCH /api/v1/reports/:id/undelete` (restores a soft-deleted report to draft status)

### Report Management
- Create and edit reports in markdown format with enhanced navigation
- Save reports as drafts
- Publish finalized reports
- Export published reports as PDF
- Interactive navigation template with large icons for easy section access

### Data Export Functionality
- Export environmental data in Excel or CSV formats
- Multi-step wizard interface for configuring exports
- Select specific devices from the device inventory
- Choose between telemetry, weather, or AQI data types
- Configure time ranges with an intuitive date picker interface
- Set data resolution (raw or averaged data with different intervals)
- Dynamic parameter selection based on data type with API integration
- Parameter display with units and descriptions via tooltips
- Option to include all parameters or select specific ones
- Email notification for large exports with asynchronous processing
- Automatic file download for immediate exports
- Descriptive filenames including data type, date, and device information
- Support for both synchronous (immediate) and asynchronous (job-based) exports

### Markdown Editor
- Lightweight custom implementation for better performance
- Tab-based interface with Write/Preview modes
- Image resizing controls (small, medium, large)
- Content-aware cursor position tracking

### User Experience
- Global loading animation during page refreshes
- Comprehensive error handling with user-friendly messages
- Consistent styling with a unified color scheme
- Optimized API calls to prevent duplicate requests
- Parameter options are deduplicated to avoid duplicate selections in dropdowns (e.g., BATTERY)
- Production-ready logging with clean error handling (no debug noise)
- Smooth time-based transitions with proper loading states
- Intuitive time controls with hour-only resolution to prevent accidental adjustments

## Project Structure

- `/src/pages` - Main application pages
- `/src/services` - API services and types
- `/src/components` - Reusable UI components
  - `/TimeAxisControl` - Time-based playback controls for historical data visualization
- `/src/pages/Map/DeviceMap/TimeBasedDataService.ts` - Specialized service for historical data management

## Development Log

See [dev-log.md](./dev-log.md) for a history of development updates and changes.
