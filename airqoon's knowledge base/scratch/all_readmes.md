=== raw/github_repos/AirqoonCalibrationToolBackend.md ===
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



=== raw/github_repos/LCF.md ===
# ESP32 ADC Data Logger & Environmental Monitoring System

A high-performance, multi-task ESP32 application for reading analog data from dual ADS7828 12-bit ADCs and environmental data from BME280 sensor, transmitting to both local UART and cloud (ThingsBoard) with real-time status indication via RGB LED.

## 🚀 Features

- **Dual ADS7828 ADC Support**: 16 channels (2x 8-channel ADCs) with fault tolerance
- **BME280 Environmental Sensing**: Temperature, humidity, and pressure monitoring
- **Device Fault Management**: Continues operation if one ADS7828 fails
- **Shared I2C Bus**: Efficient 400kHz I2C communication for both ADC and environmental sensor
- **Multi-Level Data Processing**: Raw ADC + BME280 → averaged → super-averaged
- **Unified Output Streams**: Identical diagnostic-rich data to both UART and Cloud MQTT
- **Real-Time Timestamps**: SNTP-synchronized global UTC timestamps
- **Visual Status Indication**: RGB LED shows system connectivity status
- **ThingsBoard Integration**: MQTT telemetry with device authentication & environmental data
- **FreeRTOS Multi-Tasking**: 4 parallel tasks with queue-based communication
- **Comprehensive Monitoring**: Queue usage, stack usage, device health, and environmental data

## 📊 System Architecture

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│ADC+BME280   │───▶│ Serial Task  │───▶│ Cloud Task  │───▶│ ThingsBoard  │
│   Task      │    │  Priority 3  │    │ Priority 2  │    │    MQTT      │
│  Priority 5 │    │              │    │             │    │ (ADC+BME280) │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
       │                    │                   │                          
       │                    ▼                   │                          
       │            ┌──────────────┐            │                          
       │            │ UART Output  │            ▼                          
       │            │   GPIO25/26  │    ┌──────────────┐                   
       │            └──────────────┘    │ Performance  │                   
       │                                │  Monitor     │                   
       ▼                                │  Component   │                   
┌─────────────┐                        └──────────────┘                   
│ RGB LED     │                                │                          
│ Status      │                                ▼                          
│ GPIO15/0/2  │                        ┌──────────────┐                   
└─────────────┘                        │ Comprehensive│                   
                                       │ Performance  │                   
                                       │   Reports    │                   
                                       └──────────────┘                   
```

### Performance Monitor Component
The dedicated `performance_monitor` component provides:
- **Real-time timing measurements** for all system operations
- **Start-to-start interval tracking** for true sample rate calculation
- **Start-to-stop duration monitoring** for bottleneck identification
- **Statistical analysis** with min/max/average values
- **Comprehensive reporting** printed after each MQTT transmission

## 🔧 Hardware Requirements

### ESP32 Development Board
- Any ESP32 board with sufficient GPIO pins

### ADC Configuration
- **2x ADS7828** 12-bit ADCs on shared I2C bus
- **Device #1**: I2C address `0x48` (channels 0-7)
- **Device #2**: I2C address `0x4A` (channels 8-15)
- **External 5V reference** voltage
- **Single-ended** input configuration

### Environmental Sensor Configuration
- **BME280** temperature, humidity, pressure sensor
- **I2C Address**: `0x76` (primary) or `0x77` (secondary)
- **Shared I2C Bus**: Same 400kHz bus as ADS7828 devices
- **Operating Range**: -40°C to 85°C, 0-100% RH, 300-1100 hPa

### GPIO Pin Assignment
| Component | GPIO | Function |
|-----------|------|----------|
| I2C SCL | 21 | I2C Clock (ADS7828 + BME280) |
| I2C SDA | 22 | I2C Data (ADS7828 + BME280) |
| UART TX | 25 | Serial Output |
| UART RX | 26 | Serial Input |
| RGB Red | 15 | Status LED Red |
| RGB Green | 0 | Status LED Green |
| RGB Blue | 2 | Status LED Blue |

### RGB LED
- **Common-anode** RGB LED
- **Current limiting resistors** (220Ω recommended)
- **Inverted PWM** logic (255 = OFF, 0 = FULL ON)

## 📱 Data Output Formats

### Unified JSON Format (UART & Cloud - Identical Data)
Real-time UART and cloud telemetry now send identical diagnostic-rich data:

**All sensors available:**
```json
{"ts":1703123456789123,"ch0":2450,"ch1":1230,"ch2":3670,"ch3":890,"ch4":4120,"ch5":2780,"ch6":1560,"ch7":3340,"ch8":670,"ch9":4450,"ch10":2110,"ch11":1890,"ch12":3230,"ch13":980,"ch14":4670,"ch15":2560,"temp":23.45,"hum":65.20,"press":1013.25,"exec_us":125000,"adc1":true,"adc2":true,"bme":true}
```

**Device 2 failed (channels 8-15 excluded):**
```json
{"ts":1703123456789123,"ch0":2450,"ch1":1230,"ch2":3670,"ch3":890,"ch4":4120,"ch5":2780,"ch6":1560,"ch7":3340,"temp":23.45,"hum":65.20,"press":1013.25,"exec_us":125000,"adc1":true,"adc2":false,"bme":true}
```

**BME280 failed (environmental data excluded):**
```json
{"ts":1703123456789123,"ch0":2450,"ch1":1230,"ch2":3670,"ch3":890,"ch4":4120,"ch5":2780,"ch6":1560,"ch7":3340,"ch8":670,"ch9":4450,"ch10":2110,"ch11":1890,"ch12":3230,"ch13":980,"ch14":4670,"ch15":2560,"exec_us":125000,"adc1":true,"adc2":true,"bme":false}
```

**Data Format Notes:**
- `ts`: UTC timestamp in microseconds
- `ch0-ch15`: Channel values in millivolts (excluded if device unavailable)
- `temp/hum/press`: Environmental data (excluded if BME280 unavailable)
- `exec_us`: ADC + BME280 reading execution time (microseconds)
- `adc1`: Device 1 (0x48) health status
- `adc2`: Device 2 (0x4A) health status  
- `bme`: BME280 sensor health status

**Smart Filtering:** Failed sensors don't send zero values - their data is completely excluded from JSON output.

## 🌈 RGB LED Status Indicators

| Status | Color | Pattern | Meaning |
|--------|-------|---------|---------|
| **Booting** | Pure Blue (0,0,255) | Blinking (500ms) | System initializing |
| **Connecting** | Light Blue (61,150,245) | Breathing | WiFi/MQTT connecting |
| **Connected** | Pure Green (0,255,0) | Solid | Fully connected |
| **Error** | Pure Red (255,0,0) | Blinking | Boot error |
| **Connection Error** | Pure Red (255,0,0) | Breathing | Connection failed |
| **Runtime Error** | Pure Red (255,0,0) | Solid | Connected but error |

## ⚙️ Configuration

### WiFi Settings
```c
#define CLOUD_WIFI_SSID         "8Bitiz_2G"
#define CLOUD_WIFI_PASSWORD     "aborogandi75"
```

### MQTT/ThingsBoard Settings
```c
#define CLOUD_MQTT_URI          "mqtt://lab.airqoon.com"
#define CLOUD_MQTT_SECRET_KEY   "fa9ca519d3c7590c862e84779df142e9"
```

### ADC Settings
```c
#define ADC_SAMPLE_COUNT        16    // Samples per ADC reading
#define SERIAL_ACCUMULATE_COUNT 10    // Readings to average for cloud
```

### Task Priorities
```c
#define ADC_TASK_PRIORITY       5     // Highest (time-critical)
#define SERIAL_TASK_PRIORITY    3     // Medium  
#define CLOUD_TASK_PRIORITY     2     // Lower
#define RGB_LED_TASK_PRIORITY   1     // Lowest (visual feedback)
```

## 🔌 Device Authentication

The system uses MD5-based device authentication:
```
Username = MD5(SECRET_KEY + MAC_ADDRESS)
Password = (none - username serves as access token)
```

Example:
- MAC: `ec:62:60:55:a1:10` → `ec626055a110`
- Hash Input: `fa9ca519d3c7590c862e84779df142e9ec626055a110`
- Username: `ca236142887f356b269029e49a57c17d`

## 📈 Performance Characteristics

### Real-Time Performance Monitoring
The system includes comprehensive **start-to-start interval timing** and **start-to-stop duration measurements** for complete pipeline visibility:

#### **Sample Rates (Start-to-Start Intervals)**
- **Channel Read Rate**: 2,342 Hz (individual channel acquisition)
- **Device Read Rate**: 278 Hz (8-channel device completion)
- **Cycle Read Rate**: 136 Hz (16-channel cycle completion)
- **System Read Rate**: 8.3 Hz (full sampling with averaging)
- **UART Transmission Rate**: 8.3 Hz (serial data output)
- **MQTT Publication Rate**: 0.8 Hz (cloud telemetry)

#### **Operation Durations (Start-to-Stop Timing)**
- **Channel Duration**: 419 μs average (single channel read)
- **Device Duration**: 3,591 μs average (8 channels)
- **Cycle Duration**: 7,369 μs average (16 channels, 1 sample)
- **System Duration**: 120,979 μs average (16 channels, 16 samples)
- **UART Duration**: 409 μs average (transmission)
- **MQTT Duration**: 3,056 μs average (publication)

#### **System Performance Summary**
- **Effective Channel Rate**: 132.1 Hz (8.3 Hz × 16 channels)
- **True ADC Cycle Rate**: 136 Hz (single-sample 16-channel cycles)
- **ADC Utilization**: 0.3% of 50kSPS theoretical maximum
- **Total Data Points**: 16 channels × 8.3 Hz = 132 samples/second

### Timing Precision
- **Global Timestamps**: SNTP-synchronized UTC microseconds
- **Performance Monitoring**: Microsecond precision with min/max/average statistics
- **Queue Buffering**: 10 items (ADC→Serial), 5 items (Serial→Cloud)

### System Resources
- **Total Tasks**: 4 (ADC, Serial, Cloud, RGB LED)
- **Memory Usage**: ~20KB total stack allocation
- **I2C Speed**: 400kHz Fast Mode
- **UART Speed**: 115200 baud

## 🚀 Getting Started

### Prerequisites
- ESP-IDF v4.4+ installed
- Hardware assembled according to pin assignments
- WiFi network access
- ThingsBoard instance running

### Build & Flash
```bash
# Clone repository
git clone <repository-url>
cd LCF

# Configure project
idf.py menuconfig

# Build firmware
idf.py build

# Flash to ESP32
idf.py flash

# Monitor output
idf.py monitor
```

### Initial Setup
1. **Hardware Check**: Verify all connections and LED functionality
2. **WiFi Connection**: System will show blue breathing during connection
3. **MQTT Authentication**: Check console for generated username/token
4. **Data Verification**: Monitor UART output and ThingsBoard telemetry

## 🐛 Troubleshooting

### Common Issues

**RGB LED not working**
- Check common-anode wiring and current limiting resistors
- Verify GPIO pin assignments match hardware

**ADC readings show 0**
- Verify I2C connections and 5V reference voltage
- Check ADS7828 device addresses (0x48, 0x4A)
- Check device availability status in system logs
- System continues with working devices only

**WiFi connection fails**
- Verify SSID and password in configuration
- Check 2.4GHz network availability

**MQTT authentication fails**
- Verify generated username in console output
- Ensure ThingsBoard device exists with matching access token

**No cloud telemetry**
- Verify local UART output works first
- Check queue status in console monitoring

### Debug Commands
```bash
# Monitor with verbose output
idf.py monitor --print_filter="*:DEBUG"

# Check stack usage
idf.py monitor | grep "Stack usage"

# Monitor queue status  
idf.py monitor | grep "Queue usage"
```

## � Connection Resilience

### Automatic Recovery
- **WiFi**: Unlimited reconnection attempts with 1-second delay
- **MQTT**: Auto-reconnect every 5 seconds via background task
- **Sensor-Independent**: System connects to internet even if all sensors fail

### Fault Tolerance Matrix
| Failure | System Response |
|---------|-----------------|
| ADS7828 init fails | Continues, connects WiFi, sends BME280 data |
| BME280 init fails | Continues normally with ADC data |
| WiFi disconnects | Auto-reconnect (unlimited retries) |
| MQTT disconnects | Auto-reconnect every 5 seconds |
| All sensors fail | System runs, sends status-only data |

## �📋 Project Status

✅ **Complete Features**
- Dual ADS7828 ADC reading with fault tolerance
- BME280 environmental sensing (temperature, humidity, pressure)
- Device health monitoring and management
- Multi-task FreeRTOS architecture  
- UART JSON output with global timestamps and environmental data
- ThingsBoard MQTT integration with authentication, device status, and environmental data
- RGB LED status indication with error handling
- System monitoring and comprehensive health checks
- **Internet connection resilience with auto-recovery**
- **Sensor-independent operation**

🔄 **Potential Enhancements**
- Web interface for configuration
- SD card data logging
- Over-the-air (OTA) updates
- Additional sensor integrations
- Advanced data filtering algorithms

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions and support:
- Check the troubleshooting section
- Review console output for error messages
- Verify hardware connections
- Test components individually

---

**Built with ESP-IDF and ❤️ for high-performance data acquisition**


=== raw/github_repos/LCM.md ===
# LCM Serial Data Plotter

A professional real-time serial data plotting application with modern UI and advanced data analysis features.

## Features

- **Real-time plotting** with microsecond precision
- **Multi-channel support** (up to 16 channels: ch0-ch15)
- **Modern UI** with Start/Stop/Pause controls
- **Excel export** with dual timestamp formats
- **Mouse hover tooltips** showing exact values and timestamps
- **Enhanced channel selection** with large, easy-to-use interface
- **Extended data buffering** supporting up to 30 minutes of continuous data
- **Configurable time windows** from 10 seconds to 30 minutes
- **Automatic data parsing** (JSON, key-value, CSV formats)
- **Real-time average values** displayed in graph legend
- **Numerical channel sorting** (ch0, ch1, ch2, ..., ch10, ch11)

## Installation

### Prerequisites

- Python 3.7 or higher
- PyQt5
- Required Python packages (see requirements.txt)

### Quick Install

```bash
# Clone or download the project
cd LCM

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py
```

### Dependencies

```bash
pip install PyQt5 pyserial matplotlib pandas openpyxl numpy
```

## Configuration

### Serial Port Settings

Edit `config.py` to modify serial port settings:

```python
SERIAL_PORT = '/dev/tty.usbserial-FT5UBSXT'  # Your serial port
BAUD_RATE = 115200                            # Baud rate
SERIAL_TIMEOUT = 1.0                          # Timeout in seconds
```

### Data Settings

```python
BUFFER_SIZE = 50000           # Maximum data points in memory (supports ~30min at 10Hz)
CHANNEL_UNIT = 'mV'           # Channel value unit
MAX_CHANNELS = 16             # Number of supported channels
```

## Usage

### Basic Usage

1. **Start the application**:
   ```bash
   python main.py
   ```

2. **Select channels** to monitor from the channel selection panel

3. **Click Start** to begin data acquisition and real-time plotting

4. **Use controls**:
   - **Start/Restart**: Begin or restart data collection
   - **Pause/Continue**: Pause or resume data collection
   - **Stop/Save**: Stop collection and save data to Excel

### Data Format

The application supports multiple serial data formats:

#### JSON Format
```json
{"ts":1752045761597494,"ch0":3710,"ch1":3718,"ch2":3757}
```

#### Key-Value Format
```
ch0=3710,ch1=3718,ch2=3757,ts=1752045761597494
```

#### CSV Format
```
1752045761597494,3710,3718,3757
```

### Excel Export

The exported Excel file contains:

- **Date column**: Full datetime format (2025-07-09 10:22:47.123456)
- **Timestamp column**: Raw microsecond values for calculations
- **Unit column**: Channel value units (mV)
- **Channel columns**: Selected channel values only
- **Summary sheet**: Statistics and formatting instructions

### Enhanced User Interface

**Large Channel Selector:**
- Bigger, more accessible channel selection interface
- Larger checkboxes for easier interaction
- Improved visual hierarchy and spacing
- Support for up to 16 channels with clear labeling

**Mouse Hover Feature:**
- Hover over any data line to see channel name and value
- Exact timestamp when data was received
- Precise measurements with microsecond timing
- Fixed tooltip positioning prevents graph resizing
- Reliable tooltip display with enhanced visibility

**Extended Time Windows:**
- View up to 30 minutes of continuous data
- Configurable time window from 10 seconds to 30 minutes
- Smart time axis formatting for different window sizes

## Command Line Options

```bash
# Show current configuration
python main.py --config

# Run component tests
python main.py --test

# Show help
python main.py --help
```

## File Structure

```
LCM/
├── main.py              # Application entry point
├── config.py            # Configuration settings
├── main_window.py       # Main UI window
├── serial_reader.py     # Serial port communication
├── data_manager.py      # Data storage and Excel export
├── plot_widget.py       # Real-time plotting
├── channel_selector.py  # Channel selection UI
├── requirements.txt     # Python dependencies
└── README.md           # This file
```

## Troubleshooting

### Common Issues

1. **Serial port not found**:
   - Check if the device is connected
   - Verify the port name in `config.py`
   - Ensure you have permission to access the serial port

2. **UTF-8 decode errors**:
   - The application automatically handles invalid UTF-8 data
   - Check your serial device's data format

3. **Application won't start**:
   - Ensure all dependencies are installed
   - Check Python version (3.7+ required)

### Performance Tips

- Default `BUFFER_SIZE` of 50,000 supports 30 minutes of continuous data
- Use shorter time windows for better performance on older hardware
- The enhanced channel selector makes it easy to select only needed channels
- Time window can be adjusted from 10 seconds to 30 minutes using the slider

## Development

### Testing Individual Components

```bash
# Test serial reader
python serial_reader.py

# Test data manager
python data_manager.py

# Test plot widget
python plot_widget.py
```

### Configuration Options

See `config.py` for all configurable options including:
- Serial port settings
- UI appearance
- Data buffer settings
- Export formats
- Error messages

## License

This project is developed for educational and research purposes.

## Support

For issues and questions, please check:
1. This README file
2. The configuration in `config.py`
3. The FEATURES.md file for detailed feature documentation
4. The DEV-LOGS.md file for development history


=== raw/github_repos/acme_aq_simulator.md ===
# Airqoon Environmental Sensor Simulator

Simulates a network of environmental monitoring devices that send realistic telemetry data to ThingsBoard via MQTT. Generates 15+ environmental parameters including air quality, weather, noise, and battery data with location-based adjustments and **realistic time-based oscillations**.

## Key Features

- **Multi-device simulation** with persistent MQTT connections
- **Realistic oscillation patterns** for air quality parameters (ozone peaks midday, NO2 peaks during rush hours)
- **Day type variations** (clean/moderate/polluted days with appropriate pollution levels)
- **Location-based telemetry** with realistic environmental data  
- **Battery simulation** with solar charging cycles
- **Docker deployment** with production-ready configuration
- **Configurable intervals** and device parameters
- **Simulation mode** for testing without MQTT broker

## Quick Start

### Production Deployment
```bash
# Start production simulator (5 devices, 5min intervals)
docker compose -f docker-compose.production.yml up --build -d

# View logs
docker compose -f docker-compose.production.yml logs -f
```

### Development/Testing
```bash
# Test mode (no MQTT connection)
SIMULATION_MODE=true docker compose -f docker-compose.production.yml up

# Custom interval (60 seconds)
TELEMETRY_INTERVAL=60 docker compose -f docker-compose.production.yml up
```

### Python Direct
```bash
# Install dependencies
pip install -r requirements.txt

# Single device
python -m src.main --simulation

# Multi-device production
python run_production.py
```

### Kubernetes (DOKS)

This repo supports deployment to a Kubernetes cluster using:

- `tools/k8s/production/deployment.yaml`
- `.github/workflows/github-actions-ci.yml`

#### Deploy via GitHub Actions

On every push to `main`, GitHub Actions:

- builds and pushes an image to `ghcr.io`
- applies the Kubernetes deployment

Required GitHub repository secrets:

- `DIGITALOCEAN_ACCESS_TOKEN`
- `DO_CLUSTER_NAME`
- `GH_USERNAME`
- `GH_PASSWORD`

#### Deploy manually from your terminal

1. Configure kubectl for DOKS:

```bash
doctl auth init
doctl kubernetes cluster kubeconfig save "<DO_CLUSTER_NAME>"
kubectl get nodes
```

2. Build and push the Docker image:

```bash
export REGISTRY=ghcr.io
export IMAGE_NAME="OWNER/REPO"
export TAG="$(git rev-parse --short HEAD)"

export IMAGE_ID="$REGISTRY/$IMAGE_NAME"
export IMAGE_ID="$(echo "$IMAGE_ID" | tr '[:upper:]' '[:lower:]')"

echo "<GITHUB_TOKEN_OR_PAT>" | docker login ghcr.io -u "<GH_USERNAME>" --password-stdin

docker build --platform linux/amd64 -f Dockerfile.production \
  -t "$IMAGE_ID:$TAG" -t "$IMAGE_ID:latest" .

docker push "$IMAGE_ID:$TAG"
docker push "$IMAGE_ID:latest"
```

3. Create/Update the image pull secret in the cluster:

```bash
kubectl create namespace airqoon --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret docker-registry github-registry \
  --docker-server="ghcr.io" \
  --docker-username="<GH_USERNAME>" \
  --docker-password="<GH_PASSWORD_OR_PAT>" \
  --docker-email="info@airqoon.com" \
  -n airqoon \
  --dry-run=client -o yaml | kubectl apply -f -
```

4. Apply the deployment:

```bash
export NAMESPACE=airqoon
export DOCKER_IMAGE_URL="$IMAGE_ID:$TAG"

envsubst < tools/k8s/production/deployment.yaml | kubectl apply -f -
kubectl rollout status deployment/aq-simulator-app -n "$NAMESPACE"
kubectl logs -n "$NAMESPACE" deployment/aq-simulator-app -f
```

## Configuration

### Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `TELEMETRY_INTERVAL` | 300 | Send interval (seconds) |
| `MQTT_BROKER` | see.airqoon.com | MQTT broker address |
| `MQTT_PORT` | 1883 | MQTT broker port |
| `SIMULATION_MODE` | false | Test without MQTT |

### Device Configuration
Edit `config/devices.json`:
```json
[
  {
    "device_id": "demo-dev-01",
    "access_token": "your-token",
    "latitude": 43.7460723,
    "longitude": 23.7688066,
    "location_note": "sensor-center"
  }
]
```

## Telemetry Parameters

**Environmental Data:**
- Particulate Matter: PM2.5, PM10
- Gases: NO2, O3, SO2, CO, VOC, H2S, NH3 (PPB + µg/m³)
- Weather: temperature, humidity, pressure
- Wind: speed, direction
- Noise level
- Battery: voltage, voltage under load

**Features:**
- Location-based adjustments near industrial facilities
- Battery simulation with solar charging cycles
- Realistic value ranges and unit conversions
- Configurable telemetry intervals (default: 5 minutes)



=== raw/github_repos/airqoon-alarm-worker.md ===
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



=== raw/github_repos/airqoon-aqi-calculator.md ===
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


=== raw/github_repos/airqoon-autoreporter.md ===
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



=== raw/github_repos/airqoon-base-map-consumer.md ===
# Airqoon Base Map Consumer

A Node.js backend service for consuming, processing, and synchronizing air quality and weather telemetry data from distributed IoT devices. It integrates with AWS SQS, RabbitMQ, MongoDB, and external services such as ThingsBoard and Airqoon Weather Service to aggregate, compute, and publish air quality metrics.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Core Features](#core-features)
- [Configuration](#configuration)
- [Installation](#installation)
- [Development](#development)
- [Contributing](#contributing)

## Overview

This service acts as a data consumer and processor for the Airqoon platform, handling telemetry from air quality sensors and weather stations. It ingests messages from AWS SQS and RabbitMQ, processes and aggregates the data, computes AQI (Air Quality Index) metrics, and forwards results to downstream consumers and dashboards.

## Architecture

### SQS Message Type Filtering & Event Skipping

- Both **AttributesEvent** and **PostTelemetryEvent** consume messages from the same AWS SQS queue.
- Each event handler processes only the message types relevant to its responsibility:
  - **AttributesEvent**: `POST_ATTRIBUTES_REQUEST`, `ATTRIBUTES_UPDATED`, `ATTRIBUTES_DELETED`
  - **PostTelemetryEvent**: `POST_TELEMETRY_REQUEST`
- If an event handler receives a message of a type it does not handle, it skips and logs the message (e.g., `AttributesEvent skipping message with type: POST_TELEMETRY_REQUEST`).
- Skipped messages are **not lost**; they are processed by the appropriate handler.
- This design prevents duplicate processing and maintains clear separation of concerns between telemetry and attribute handling.

### Tenant Management & Device Association

- The service automatically manages device-tenant associations by checking the ThingsBoard customer ID for each device.
- When a device sends telemetry data, the system verifies if its customer ID matches the expected tenant in the database.
- If a device has been reassigned to a different customer in ThingsBoard, the system automatically updates the device's `TenantSlugName` in the database.
- This ensures data consistency and proper tenant association, especially when devices are transferred between customers.


- **Node.js (TypeScript)**: Main runtime and language.
- **Prisma ORM**: Database access and migrations (MongoDB).
- **AWS SQS**: Receives telemetry data for processing.
- **RabbitMQ**: Handles event-based messaging and synchronization.
- **ThingsBoard Service**: Fetches device metadata and attributes.
- **Airqoon Weather Service**: Retrieves current weather data for devices.
- **Schedulers**: Periodic jobs for data aggregation and weather sync.
- **Dockerized**: Container-ready for production deployments.

### Main Flow
1. **Startup**: Loads configuration, connects to MongoDB, and initializes event listeners.
2. **Telemetry Ingestion**: Consumes messages from SQS and RabbitMQ queues.
3. **Processing**: Aggregates telemetry, calculates AQI using EPA and national standards, and enriches with weather data.
4. **Publishing**: Sends processed results to queues or external services.
5. **Scheduling**: Periodic jobs for weather updates and AQI calculations.

## Core Features
- **Telemetry Data Consumer**: Ingests and processes sensor data from SQS and RabbitMQ.
- **AQI Calculation**: Computes air quality indices using configurable pollutant keys.
- **Weather Data Integration**: Fetches and caches weather data per device.
- **MODIS Fire Data Scheduler**: Automated fire detection data collection from NASA FIRMS API for Turkey (every 3 hours).
- **Device Metadata Enrichment**: Integrates with ThingsBoard for device attributes.
- **Robust Logging**: Structured logging for all operations.
- **Error Handling & Retries**: Retries failed events and dead-letter queue support.
- **Docker Support**: Easily deployable in containerized environments.

## Configuration

Configuration is managed via environment variables. See `.env.development` and `.env.production` for all available options. Key configuration includes:
- `MONGODB_URI`: MongoDB connection string
- `RABBITMQ_URI`: RabbitMQ connection string
- `AWS_SQS_URI`, `AWS_SQS_ACCESS_KEY_ID`, `AWS_SQS_SECRET_ACCESS_KEY`, `AWS_SQS_REGION`: AWS SQS credentials
- `THINGSBOARD_SERVICE_URI`, `THINGSBOARD_SERVICE_AUTH_USERNAME`, `THINGSBOARD_SERVICE_AUTH_PASSWORD`: ThingsBoard API access
- `AIRQOON_WEATHER_SERVICE_URI`, `AIRQOON_WEATHER_SERVICE_AUTH_USERNAME`, `AIRQOON_WEATHER_SERVICE_AUTH_PASSWORD`: Weather service access
- `FIRMS_API_KEY`: NASA FIRMS API key for MODIS fire data collection
- `AQIComputableTelemetryKeys`: Pollutant keys used for AQI calculation

## Installation

**NodeJS version:** 18.16.0 (LTS)

```shell
pnpm install
```

## Development

**Schema model creation:**

```shell
pnpm  run prisma:pull
pnpm run prisma:generate
```

**Schema model update:**

```shell
pnpm run prisma:push
```

**Running the application:**

```shell
# Development
pnpm run start:dev
```

**Docker Compose:**

To run the service in Docker:

```shell
docker-compose up --build
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

© 2025 Airqoon. All rights reserved.



=== raw/github_repos/airqoon-base-map-external-api.md ===
# Airqoon Base Map External API

A high-performance, extensible REST API for accessing, aggregating, and serving air quality and environmental sensor data for the Airqoon platform. This service acts as a backend for map-based and analytical applications, providing device, telemetry, AQI, weather, and tenant-based data with multi-tenant support and robust access control.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Overview

**Airqoon Base Map External API** is the core API for the Airqoon ecosystem. It provides secure, multi-tenant access to air quality and environmental data collected from distributed IoT devices. The API is designed for integration with dashboards, analytics tools, and external partners, supporting features such as:
- Device discovery and metadata
- Real-time and historical telemetry (pollutants, weather, AQI)
- Multi-organization AQI standards
- Tenant and area management
- Secure authentication and authorization

## Features
- **Fastify-based**: High-performance Node.js backend using Fastify
- **Prisma ORM**: Robust database access and migrations
- **Multi-tenant**: Segregated data access for organizations/tenants
- **Comprehensive AQI support**: Multiple AQI standards (Malaysia, EEA, Turkiye, US-EPA)
- **Device and area management**: Query by device, area, or tenant
- **Swagger/OpenAPI**: Auto-generated API docs
- **Zod validation**: Type-safe request/response schemas
- **Authentication**: JWT-based login and access control

## API Endpoints (v1)

### Auth
- `POST /v1/auth/login` — Obtain JWT token

### Devices
- `GET /v1/devices` — List all devices (with filters)
- `GET /v1/devices/id/:deviceId` — Get device metadata
- `GET /v1/devices/id/:deviceId/telemetry/latest` — Latest telemetry for device
- `GET /v1/devices/id/:deviceId/telemetry/hourly` — Hourly telemetry (aggregated)
- `GET /v1/devices/id/:deviceId/telemetry/historical` — Historical telemetry (with pagination)
- `GET /v1/devices/id/:deviceId/aqi/latest` — Latest AQI (with organization filter)
- `GET /v1/devices/id/:deviceId/aqi/historical` — Historical AQI (with date range, pagination, organization)
- `GET /v1/devices/id/:deviceId/weather/current` — Current weather for device

### Tenants
- `GET /v1/tenants/slug/:tenantSlugName/devices` — Devices for a tenant
- `GET /v1/tenants/slug/:tenantSlugName/areas` — Areas for a tenant

> See `/src/routes/v1/` and [TODO.md](TODO.md) for planned and implemented endpoints.

## Architecture
- **Entry Point**: `src/application.ts` initializes environment, DB, services, and web server
- **Web Server**: `src/webServer.ts` configures Fastify, plugins, routes, and OpenAPI docs
- **Routing**: `/src/routes/v1/` for versioned API endpoints (`devices`, `tenants`, `auth`)
- **Controllers**: `/src/controllers/v1/` handle business logic
- **Domain/Services**: `/src/domain/services/` encapsulate core logic and data access
- **Prisma ORM**: `/prisma/` for schema and migrations
- **Validation**: Zod schemas for all DTOs and queries

## Installation

```shell
pnpm install
pnpm run prisma:generate
```

## Usage

### Start in Development
```shell
pnpm run start:dev
```

### Build for Production
```shell
pnpm run build
```

### Run Tests
```shell
pnpm run test:vitest
```

## Environment Variables
- Configure `.env.development` and other `.env.*` files for DB, JWT, and other secrets.
- See `src/config.ts` and `src/application.ts` for usage.

## Documentation
- Swagger UI is available at `/docs` when running the server.
- DTOs and response types are defined with Zod in `src/routes/v1/*/*.dtos.ts`.

## License
Proprietary — (c) Airqoon. All rights reserved.

---

## Contributing
For internal Airqoon development. For issues or feature requests, contact the Airqoon development team.



=== raw/github_repos/airqoon-base-map-tile-server.md ===
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



=== raw/github_repos/airqoon-base-map-ui.md ===
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



=== raw/github_repos/airqoon-basic-map-api.md ===
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



=== raw/github_repos/airqoon-brief.md ===
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



=== raw/github_repos/airqoon-data-external-projection.md ===
# Airqoon Data External Projection

## Installation

```bash
pnpm install
pnpm run prisma:generate
```

## How to use?

```bash
# Development
pnpm run start
```



=== raw/github_repos/airqoon-ops-engine.md ===
# Airqoon Ops Engine

Internal production tracking tool for Airqoon sensor units. Manages batches, components, QR code generation, and assembly workflows backed by Notion.

## Local Development

### Prerequisites

- Node.js 20+
- A Notion integration with access to the Airqoon workspace databases

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the env template and fill in your values:
   ```bash
   cp .env.local.example .env.local
   ```

   Required env vars (see `.env.local.example` for full list):
   - `NEXTAUTH_SECRET` — `openssl rand -base64 32`
   - `NEXTAUTH_URL` — `http://localhost:3000`
   - `KEYCLOAK_ID` — Keycloak client ID (e.g. `airqoon-ops`)
   - `KEYCLOAK_SECRET` — Keycloak client secret
   - `KEYCLOAK_ISSUER` — Keycloak realm issuer URL (e.g. `https://keycloak.example.com/realms/airqoon`)
   - `NOTION_TOKEN` — Notion integration token
   - `NOTION_*_DB_ID` — Notion database IDs

3. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Tests

```bash
npm test
```

---

## Deployment (Coolify)

The app is deployed via Docker on Coolify.

### First-time setup

1. In Coolify, connect your Git repository
2. Select **Dockerfile** as the build pack
3. Set port to **3000**
4. Add all environment variables from `.env.local.example` in Coolify's UI:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` — set to your public domain (e.g. `https://intops.airqoon.com`)
   - `KEYCLOAK_ID` — Keycloak client ID
   - `KEYCLOAK_SECRET` — Keycloak client secret
   - `KEYCLOAK_ISSUER` — e.g. `https://keycloak.example.com/realms/airqoon`
   - `NOTION_TOKEN`
   - `NOTION_BATCHES_DB_ID`
   - `NOTION_ITEMS_DB_ID`
   - `NOTION_PRODUCT_DEFS_DB_ID`
   - `NOTION_BOM_ITEMS_DB_ID`
   - `NOTION_ITEM_HISTORY_DB_ID`
   - `NEXT_PUBLIC_APP_URL` — same as `NEXTAUTH_URL`
5. Deploy — Coolify handles TLS, reverse proxy, and restarts

### Managing users

Users are managed in Keycloak. Log in to the Keycloak admin console, navigate to the **airqoon** realm, and add/remove users there. No redeployment is needed.

### Building the Docker image locally

```bash
docker build -t airqoon-ops-engine .
docker run --rm -p 3000:3000 --env-file .env.local airqoon-ops-engine
```

### Note on `NEXT_PUBLIC_APP_URL`

`NEXT_PUBLIC_APP_URL` is currently used only in server-side code (`src/lib/ids.ts`) and has a hardcoded fallback of `https://intops.airqoon.com`. It is safe to set it at runtime via Coolify's UI.

**If `itemQRUrl()` is ever called from a Client Component**, `NEXT_PUBLIC_APP_URL` must be provided at Docker build time (as a `--build-arg`), otherwise Next.js will inline the fallback URL into the client bundle, silently breaking any deployment to a different domain.



=== raw/github_repos/airqoon-sim-feeder.md ===
# Airqoon SIM Feeder


### Installation
```shell
pnpm install
pnpm run prisma:generate
```

### Development
```shell
pnpm run start:dev
```


=== raw/github_repos/airqoon-su-fw.md ===
# Smart IoT Modules (SMs) - Firmware
![Build Status](http://52.25.123.72/app/rest/builds/buildType%3A%28id%3ASmartModuleFirmware%5FBuild%29/statusIcon)

## Module Application
Module application manages core functions of SMs. Initialization, application configuration handling, regular operation, management are handled with this state machine.

### State Machine
![](https://www.lucidchart.com/publicSegments/view/42ad5d48-8356-4b13-8c1a-3919eca421af/image.png)
#### Initialize Module (Init MCU)

#### Application Configuration (Config APP)

#### Regular Operation

##### Regular Operation State Machine

###### Reg-OP Housekeeping

###### REG-OP 
### Manager

## Cloud Communication Client

### State Machine

## Local Communication Client


## OTA Procedure ( RPC + Attribute + FTP)

Over-the-air (OTA) update procedure is one of the key features of Inovatink Smart IoT Modules (SMs). Inovatink can update firmware of a device deployed to the field whenever necessary. 

Components that are used in this procedure are as follows:
- RPC: To pass FTP credentials & OTA parameters to the device and to initiate the procedure
- FTP: To store and serve new firmware to the device
- Attribute: A Client attribute is used as an indication for the current version of the firmware


A two-way RPC command is issued using RPC widget and this publishes to the `v1/devices/me/rpc/request/<request-id>` topic following message : 
```json
{  
	"method":"OTARequired",  
	"params":{  
		"FTP_IP":<ftp-ip>,  
		"FTP_USER":<ftp-user>,  
		"FTP_PASS":<ftp-pass>,  
		"FTP_PATH":<ftp-path>,  
		"FTP_FW_NAME":<fw-name>  
	}  
}
``` 
 Due to the two-way nature of this command it also expects response from the device within a certain timeout. This timeout can be changed from the settings of the OTA widget. Further requests cannot be issued until a response is received from the target device.

Target device subscribes `v1/devices/me/rpc/request/+` topic and receives the message given above. It publishes a response message to the `v1/devices/me/rpc/response/<request-id>` topic. Then it parses incoming message and configures itself for the OTA procedure. It connects with the given credentials to the FTP server in order to download updated firmware to the RAM of the GSM Module.

After the download, target device starts reading the firmware from UART and writing it to its flash. During this r/w operation, firmware crc is also calculated by esp-ota component. If something unexpected happens, it stops the operation and restarts itself. After successfully writing the firmware image to the intended place in the flash memory, target device changes its boot partition and restarts to boot itself with the new firmware.

When the target device boots with the updated firmware, it updates client attribute "fw_version" by publishing
```json 
{
	"fw_version":<fw-version>
}
```
message to the `v1/devices/me/attributes` topic.

####Readme TODO:
- Attribute Update


=== raw/github_repos/airqoon-su-local-fw.md ===
# Airqoon Sensor Unit Local Firmware

**ESP32-based sensor data acquisition system with Modbus RTU interface**

[![Platform](https://img.shields.io/badge/Platform-ESP32-blue.svg)](https://www.espressif.com/en/products/socs/esp32)
[![Framework](https://img.shields.io/badge/Framework-ESP--IDF%205.4+-green.svg)](https://docs.espressif.com/projects/esp-idf/)
[![Protocol](https://img.shields.io/badge/Protocol-Modbus%20RTU-orange.svg)](http://www.modbus.org/)

---

## Overview

Industrial-grade sensor data logger with Modbus RTU slave interface. Designed for remote monitoring applications requiring reliable RS485 communication with SCADA/HMI systems.

**Key Features:**
- 🔧 **Modular Task Framework** - Unified error handling and recovery
- 📡 **Modbus RTU Slave** - Function codes 0x03/0x04 (16 float channels)
- 🔋 **Battery Monitoring** - Integrated voltage monitoring on Channel 0
- 🌡️ **Sensor Management** - Support for 20+ sensor types via submodule
- 💚 **Health Monitoring** - Automatic diagnostics and NVS persistence
- 🔄 **Error Recovery** - Automatic recovery with configurable thresholds

---

## Quick Start

### Prerequisites

- **ESP-IDF 5.4+** ([Installation Guide](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/))
- **ESP32 Development Board** (DevKit V1 or similar)
- **MAX485 RS485 Transceiver Module**

### Build and Flash

```bash
# Clone repository
git clone <repository-url>
cd airqoon-su-local-fw

# Initialize submodules
git submodule update --init --recursive

# Set target
idf.py set-target esp32

# Build
idf.py build

# Flash and monitor
idf.py -p /dev/ttyUSB0 flash monitor
```

### First Boot

The system will:
1. Initialize NVS (first boot: erase if needed)
2. Load diagnostics (boot count: 1)
3. Start all tasks (Sensor, Modbus, Health Monitor)
4. Begin Modbus RTU slave on default ID = 1

**Default Configuration:**
- Modbus Slave ID: `1`
- Baud Rate: `9600 baud, 8N1`
- Sensor Interval: `30 seconds`
- Watchdog Timeout: `60 seconds`

---

## Hardware Setup

### Power Control

```
ESP32 GPIO    Connection     Function
─────────────────────────────────────────
GPIO 32   →   5V Switch      Power enable (HIGH = ON)
```

**5V Power Switch:**
- **GPIO32 = HIGH** enables 5V power rail for sensors
- Initialized first (before any sensor init)
- Critical for sensor operation

### Battery Voltage Monitoring

```
ESP32 GPIO    Connection     Function
─────────────────────────────────────────
GPIO 34   ←   Battery (+)    ADC1_CH6 (Input Only)
                via divider  Voltage range: 0-5V
```

**Battery Configuration:**
- **Voltage Divider:** 2:1 ratio (5V → 2.5V max to ADC)
- **ADC Range:** 0-3.1V (ADC_ATTEN_DB_12)
- **Full Voltage:** 4.3V
- **Empty Voltage:** 3.0V
- **Sampling:** 64 samples averaged for accuracy
- **Modbus:** Available on Channel 0 (Register 1)

### RS485 Connection (MAX485)

```
ESP32 GPIO    MAX485 Pin    Function
─────────────────────────────────────────
GPIO 26   →   DI            UART TX (Driver Input)
GPIO 25   ←   RO            UART RX (Receiver Output)
GPIO 18   →   DE            Driver Enable (HIGH = TX)
GPIO 23   →   RE            Receiver Enable (LOW = RX)
GND       ─   GND           Ground
3.3V      ─   VCC           Power (via level shifter if needed)
```

**Important:**
- DE and RE are controlled **separately** (not tied together)
- Use 120Ω termination resistors on RS485 bus ends
- Verify voltage levels (MAX485 may be 5V, ESP32 is 3.3V)

### Modbus Register Map

Each channel is accessed by its register number (1-16). Each channel returns 2 registers (32-bit float).

| Request Register | Channel | Returns Registers | Data Type    | Description           |
|------------------|---------|-------------------|--------------|----------------------|
| 1                | Ch 0    | 1-2               | 32-bit Float | Battery Voltage (V)  |
| 2                | Ch 1    | 2-3               | 32-bit Float | Sensor Channel 1     |
| 3                | Ch 2    | 3-4               | 32-bit Float | Sensor Channel 2     |
| ...              | ...     | ...               | ...          | ...                  |
| 16               | Ch 15   | 16-17             | 32-bit Float | Sensor Channel 15    |

**Mapping:** Register number = Channel number (1:1 direct mapping)
**Float Format:** Big-endian ABCD (IEEE 754, Modbus standard)
**Note:** Register 0 and Channel 0 do NOT exist (1-based addressing)

**Example Queries:**
```
Read Register 1, Count 2  → Returns Channel 1 (4 bytes)
Read Register 5, Count 4  → Returns Channel 5 & 6 (8 bytes)
Read Register 1, Count 32 → Returns All 16 channels (64 bytes)
```

---

## Configuration

### Runtime Configuration (main/main.c)

```c
/* Timing Configuration */
#define SENSOR_READ_INTERVAL_MS     30000   // Sensor read interval (30s)
#define HEALTH_CHECK_INTERVAL_MS    10000   // Health check interval (10s)
#define NVS_SAVE_INTERVAL_MS        600000  // NVS save interval (10 min)

/* Modbus Configuration */
#define MODBUS_SLAVE_ID             1       // Modbus slave address (1-247)
#define MODBUS_BAUD_RATE            9600    // RS485 baud rate
```

### GPIO Pin Configuration (main/main.c)

```c
#define POWER_SWITCH_GPIO           32      // 5V power switch control
#define MODBUS_UART_TX_PIN          26      // DI pin of MAX485
#define MODBUS_UART_RX_PIN          25      // RO pin of MAX485
#define MODBUS_UART_DE_PIN          18      // DE control (Driver Enable)
#define MODBUS_UART_RE_PIN          23      // RE control (Receiver Enable)
```

---

## Project Architecture

### Task Overview

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐
│ Sensor Task │────▶│Data Buffer  │◀────│ Modbus Task  │
│  (30s)      │     │(Mutex Lock) │     │(Event-driven)│
└─────────────┘     └──────┬──────┘     └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │Health Monitor│
                    │    (10s)     │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │     NVS      │
                    │   (Flash)    │
                    └──────────────┘
```

**Task Priorities:**
1. **Modbus Task** (Priority 5) - Real-time response
2. **Health Monitor** (Priority 4) - System monitoring
3. **Sensor Task** (Priority 3) - Periodic data acquisition

### File Structure

```
main/
├── main.c                      # System initialization, task creation
├── task_framework.c/h          # Generic task lifecycle management
├── sensor_task.c/h             # Sensor reading task
├── modbus_task.c/h             # Modbus RTU slave implementation
├── health_monitor_task.c/h     # Health monitoring and diagnostics
├── data_buffer.c/h             # Thread-safe data storage
└── diagnostics.c/h             # System statistics and NVS persistence

components/
└── sensor-drivers/             # Sensor driver library (git submodule)
    ├── bme280/                 # 20+ sensor drivers available
    ├── scd30/
    ├── sps30/
    └── ...
```

**For detailed architecture, see [FEATURES.md](FEATURES.md)**

---

## Diagnostics

The system automatically tracks:

**System Information:**
- Boot count (NVS-persistent)
- Uptime and reset reasons
- Watchdog and panic reset counters

**Sensor Statistics:**
- Total/successful/failed read counts
- Per-sensor error tracking
- Last error codes

**Modbus Statistics:**
- Request/response counts
- CRC and protocol errors

**Storage:**
- Saved to NVS every 10 minutes
- Namespace: `"diag"`, Key: `"data"`
- Survives power cycles and resets

---

## Testing Modbus Communication

Use the included Python sniffer tool:

```bash
python modbus_sniffer.py /dev/ttyUSB0 1 9600
```

Or use standard Modbus tools:
- **QModMaster** (GUI, cross-platform)
- **mbpoll** (CLI, Linux/macOS)
- **Modbus Poll** (GUI, Windows)

**Example with mbpoll:**
```bash
# Read 8 registers (4 floats) starting from register 1
mbpoll -a 1 -r 1 -c 8 -t 4:float /dev/ttyUSB0 -b 9600
```

---

## Adding New Sensors

**Step 1:** Choose sensor driver from `components/sensor-drivers/`

**Step 2:** Update `sensor_task.c`:

```c
// Include driver header
#include "bme280/bme280.h"

// In sensor_task_init():
bme280_init(&i2c_config);

// In sensor_task_do_work():
float temp, hum, pres;
bme280_read_data(&temp, &hum, &pres);
data_buffer_write_channel(0, temp, timestamp);
data_buffer_write_channel(1, hum, timestamp);
data_buffer_write_channel(2, pres, timestamp);
```

**Step 3:** Update channel mapping (optional)

For detailed sensor integration guide, see [FEATURES.md](FEATURES.md)

---

## Documentation

- **[FEATURES.md](FEATURES.md)** - Detailed technical documentation, architecture, API reference
- **[DEV_LOG.md](DEV_LOG.md)** - Development changelog and version history
- **[components/sensor-drivers/](components/sensor-drivers/)** - Sensor driver documentation

---

## Troubleshooting

### Modbus Not Responding

1. Check RS485 wiring (TX/RX swapped?)
2. Verify slave ID matches (default: 1)
3. Test with `modbus_sniffer.py`
4. Check DE/RE pin levels with oscilloscope

### Watchdog Resets

1. Check sensor read time (must complete < 30s)
2. Increase watchdog timeout in `main.c:112`
3. Check logs for task stuck in infinite loop

### NVS Errors

1. Erase flash: `idf.py erase-flash`
2. Check partition table: `partitions.csv`
3. Verify flash size matches configuration

### Sensor Read Errors

**Current Status:** Expected (using test data, real drivers pending)

After driver integration:
1. Check I2C/UART/ADC connections
2. Verify sensor power supply (3.3V or 5V)
3. Check diagnostics: `diagnostics_print()`

---

## TODO

See [FEATURES.md#todo-list](FEATURES.md#todo-list) for detailed roadmap.

**High Priority:**
- [ ] Integrate sensor drivers from submodule
- [ ] Fix diagnostics thread safety (add mutex)
- [ ] Implement task event queue

**Medium Priority:**
- [ ] Move configuration to NVS
- [ ] Add Modbus diagnostics registers
- [ ] WiFi/BT configuration portal

---

## License

[Add license information]

---

## Contributing

[Add contribution guidelines]

---

## Support

**Project:** Airqoon Sensor Unit Local Firmware
**Version:** 1.0.0
**Platform:** ESP32 (ESP-IDF 5.4+)

For issues and feature requests, see [repository issues page]

---

**Quick Links:**
- [Features & Architecture](FEATURES.md)
- [Development Log](DEV_LOG.md)
- [Sensor Drivers](components/sensor-drivers/)
- [ESP-IDF Documentation](https://docs.espressif.com/projects/esp-idf/)
- [Modbus Protocol](http://www.modbus.org/)



=== raw/github_repos/airqoon-widget-ui.md ===
# Airqoon Widget UI

Lightweight embeddable widget carousel that renders air quality snapshots per device. This UI consumes the Basic Map API and now targets the v2 widgets aggregate endpoint with AQI scheme selection.

---

## Features

- __v2/widgets__ data source with scheme-aware AQI (US EPA, EEA, Türkiye/HKI)
- Device carousel with AQI class coloring and Turkish labels
- Optional weather block and pollutant metrics
- Simple build via Gulp + Babel + Sass

---

## Getting started

Prereqs: Node 18+ (tested with Node 20), npm

Install deps:

```bash
npm install
```


```bash
npm start
```

Build assets (emits compiled files into `dist/assets/`):
```bash
npm run build
```

Open `src/index.html` in the browser (HTML references `/dist/assets/`). You can pass URL params like `?deviceIds=devA,devB&aqiScheme=tr`.

### Source vs Build

- **Source files** live in `src/styles/` (SCSS) and `src/scripts/` (JS).
- **Compiled output** is written to `dist/assets/`.
- Legacy prebuilt files remain under `src/assets/` for backward compatibility but are no longer regenerated by gulp.

Keys:

- `API_URL` – Base API host (e.g., `https://map.airqoon.com`)
- `API_VERSION` – API version (use `v2` for widgets)
- `ROOT_PATH` – Path prefix for assets and nginx config (e.g., `bursa/widget`)
- `TENANT_SLUG_NAME` – Tenant slug (e.g., `bursa`)
- `DEFAULT_LANGUAGE` – UI language (`en`/`tr`)
- `AQI_SCHEME` – AQI organization to use: `us-epa` | `eea` | `tr`

In Kubernetes (snippet):

```yaml
env:
  - name: NODE_ENV
    value: production
  - name: API_URL
    value: https://map.airqoon.com
  - name: DEFAULT_LANGUAGE
    value: en
  - name: API_VERSION
    value: v2
  - name: ROOT_PATH
    value: bursa/widget
  - name: TENANT_SLUG_NAME
    value: bursa
  - name: AQI_SCHEME
    value: tr
```

At runtime (Docker), these are injected into `window.Configs` by `utils/docker/docker-entrypoint.sh` replacing the `<!--ENVIRONMENT-->` marker in `src/index.html`.

---

## Usage and parameters

The widget fetches from:

```
${Configs.API_URL}/${Configs.TENANT_SLUG_NAME}/api/v2/widgets?deviceIds=...&aqiScheme=...
```

URL overrides:

- `deviceIds` – CSV of device IDs to display
- `aqiScheme` – overrides env `AQI_SCHEME` (`us-epa|eea|tr`)

If `deviceIds` is omitted, the API may return a default subset (per backend configuration).

---

## Code structure

- `development/js/` – Source JS files you edit during development. Entry: `development/js/main.js`.
- `development/scss/` – Source Sass.
- `src/assets/js/main.js` – Built, transpiled, and minified output from Gulp. Do not edit by hand.
- `src/` – Static site root served by BrowserSync in dev and by nginx in Docker.

Build pipeline: see `gulpfile.js`. It reads `development/js/**/*.js`, orders `main.js`, transpiles, concatenates, and writes `src/assets/js/main.js`.

Docker image copies `src/` to `/usr/share/nginx/html` and injects environment variables at container start.

---

## v1 → v2 migration notes

- Data source changed from `v1/widgets` to `v2/widgets` (aggregate endpoint to be provided by API service per API_REFERENCE.md).
- AQI scheme is configurable via `AQI_SCHEME` or `?aqiScheme=`.
- Templates (`weatherTemplate`, `parametersTemplate`) remain compatible with the v2/widgets response shape.

---

## Troubleshooting

- If `window.Configs` is undefined in production, ensure the Docker entrypoint injected the environment into `index.html` and that `ROOT_PATH` is correct.
- For local dev, you can supply query params (`aqiScheme`, `deviceIds`). If you need `window.Configs` locally, run via Docker or add a local `<script>window.Configs=...` block in `src/index.html` for testing only.



=== raw/github_repos/aq-prov-app.md ===
# Airqoon Provisioning App

Flutter application for provisioning Airqoon ESP32 air quality monitoring devices via SoftAP.

## Features

- ESP32 device provisioning over SoftAP (Wi-Fi)
- QR code scanning for device discovery (Android)
- Manual device connection flow (iOS)
- Wi-Fi network selection and credential transfer
- Multi-language support (English / Turkish) with in-app switcher
- Native platform channels for iOS (ESPProvision) and Android (esp-idf-provisioning)

## Provisioning Flow

1. **Welcome** — Permissions request, language selection
2. **Connect** — QR scan (Android) or manual Wi-Fi connection (iOS)
3. **Network** — Select target Wi-Fi network and enter password
4. **Setup** — Device connects to selected network
5. **Done** — Provisioning complete

## Setup

```bash
flutter pub get
flutter run
```

### iOS

- Minimum iOS 13.0
- Requires `ESPProvision` pod (installed via CocoaPods)
- User manually connects to device Wi-Fi via iOS Settings
- Native Swift platform channel for ESP provisioning

### Android

- Minimum SDK 21
- Uses `esp-idf-provisioning-android` library
- Automatic Wi-Fi connection via `WifiNetworkSpecifier`

## Build

### Debug

```bash
flutter run
```

### Release (iOS)

```bash
flutter build ipa --release --export-method development
ios-deploy --bundle build/ios/ipa/aq_prov_app.ipa
```

## Device Configuration

| Parameter | Value |
|-----------|-------|
| SoftAP Prefix | `AirqoonM_` |
| Transport | SoftAP (HTTP) |
| Security | Security1 |



=== raw/github_repos/cal-app.md ===
# 🌍 Air Quality Sensor Calibration System

This repository contains a modular Streamlit application for calibrating low‑cost air quality sensors using reference station data. The app helps you:

- Collect data from official reference stations and IoT sensors.
- Calibrate sensor measurements with multiple statistical/ML models.
- Validate model performance against international standards.
- Visualize, export and report calibration results.

The codebase is designed to be:

- Modular (separated into core, utils, ui, config).
- Fully typed (Python type hints).
- Bilingual on the UI side (Turkish/English) while keeping all code in English.

## ✨ Main Features

- **Data Collection**
  - Fetch time‑series data from the Turkish Ministry of Environment (CSB) reference stations.
  - Fetch telemetry from ThingsBoard IoT platform devices.
  - Smart defaults (where supported): PM2.5/PM10 parameters, last 28 days.
  - Direct station search (All Stations mode) or filter by city.

- **Timezone & Timestamps**
  - ThingsBoard telemetry timestamps are returned as **UTC epoch milliseconds** and are converted to timezone-aware `datetime` objects.
  - CSB timestamps are returned as **Türkiye local time** and are localized as `Europe/Istanbul` to preserve the correct global instant.
  - The app can display timestamps without the `+03:00` suffix in tables, while still keeping timezone-aware timestamps internally.

- **Data Cleaning & Outlier Detection**
  - **Automatic Detection** methods:
    - Value Range (manual upper/lower bounds)
    - IQR (Interquartile Range)
    - Z-Score / Modified Z-Score
    - Percentile thresholds
  - **Manual Selection** with interactive Plotly box/lasso select.
  - Dynamic preview - outliers update instantly as parameters change.
  - Actions: Set to NaN, Replace with Median/Mean, Interpolate.
  - **Two interpolation types**:
    - Outlier interpolation: Selected points → NaN → interpolate
    - Missing value fill: Fill all existing NaN gaps for data continuity

- **Calibration Engine**
  - End‑to‑end workflow from raw data to calibrated output.
  - Multiple calibration models: Linear, Polynomial, RandomForest, Manual.
  - Flexible train/validation period selection and timestamp alignment.

- **Quick Calibration** (NEW)
  - Automated 5-step wizard for rapid sensor calibration.
  - Auto-detection of sensor parameters (raw, temp, hum, interferent, old_model).
  - Two-stage resampling: 5min median → 1H mean → 1H reference shift.
  - Multi-device parallel calibration support.
  - Results with metrics table, JSON parameters (`a`, `b`, `c`, `intercept`), timeseries and scatter plots.

- **Validation & Reporting**
  - Automatic evaluation using EPA and CEN criteria.
  - Key metrics: R², slope, intercept, RMSE, NRMSE, data completeness, uncertainty.
  - Interactive charts (time series, scatter, residuals) and summary tables.
  - Export of aligned data, calibration parameters and results as CSV/Excel/JSON/Markdown.

- **User Experience**
  - Modern Streamlit UI with a wizard‑like workflow.
  - Language switcher (TR/EN).
  - Clear error and status messages.
  - Responsive parameter selection with stable state management.

## 🧱 Architecture Overview

High‑level layout:

```text
cal-app/
├── app.py              # Streamlit entry point
├── constants.py        # Global constants & thresholds
├── config/
│   └── settings.py     # Runtime configuration & environment handling
├── src/
│   ├── core/           # Business logic (scrapers, calibration, validation)
│   ├── utils/          # Utilities (conversions, processing, visualization, export, i18n)
│   └── ui/             # UI components and pages
└── tests/              # (Planned) automated tests
```

## 🚀 Getting Started

### Requirements

- Python 3.13+
- pip
- (Recommended) virtual environment

### Installation

```bash
# Go to project directory
cd cal-app

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate      # macOS / Linux
# or on Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# (Optional) environment configuration
cp .env.example .env
# then edit .env with your own credentials (CSB, ThingsBoard, etc.)
```

### Running the Application

```bash
streamlit run app.py
```

By default Streamlit will start on a local port such as `http://localhost:8501` or `http://localhost:8502` (shown in the terminal output).

## ⚙️ Configuration & Environment

Application behavior and credentials are controlled via environment variables and the `config/settings.py` module.

- **ThingsBoard tenants** (see `TenantConfig` in `config/settings.py`):
  - `TB_SEE_USERNAME`, `TB_SEE_PASSWORD`
  - `TB_LAB_USERNAME`, `TB_LAB_PASSWORD`
  - `TB_CSB_USERNAME`, `TB_CSB_PASSWORD`
- **CSB API**: base URL and endpoints are defined in `CSBConfig` and normally do not need changes.

You can keep these variables in a local `.env` file and load them in your environment (for example using `python-dotenv` or your shell profile).

## 🕒 Timezone Convention

- **UI date/time inputs** are treated as local time in Türkiye (`Europe/Istanbul`) unless explicitly timezone-aware.
- **Internal timestamps** should be treated as timezone-aware datetimes where possible.
- Converting a timezone-aware `Timestamp` to epoch always yields a **UTC+0** instant.

## 🧰 Tech Stack

- **Language**: Python 3.13+
- **Web UI**: Streamlit
- **Data processing**: Pandas, NumPy
- **Machine learning / models**: scikit‑learn
- **Visualization**: Plotly
- **HTTP / IO**: requests, openpyxl, etc.

## 👨‍💻 Development & Code Style

- **Language policy**
  - Code, comments, and docstrings are **English only**.
  - All user‑facing text goes through the i18n layer (`src/utils/i18n.py`) and supports **TR/EN**.

- **Naming conventions**
  - Files/modules: `snake_case` (for example `data_processing.py`, `calibration_engine.py`).
  - Classes: `PascalCase` (for example `CalibrationEngine`, `EPAValidator`).
  - Functions/variables: `snake_case` with descriptive names.
  - Constants: `UPPER_SNAKE_CASE` (for example `MOLECULAR_WEIGHTS`, `EPA_LIMITS`).

- **Type hints & docstrings**
  - All public functions and methods should have **type hints**.
  - Docstrings follow **Google style** for functions/classes/modules.

- **Formatting & imports**
  - Code is formatted with **Black** (line length 100).
  - Imports are grouped as: standard library → third‑party → local.

## 🧪 Testing

- Test files live under `tests/` with names like `test_*.py`.
- Use `pytest`‑style tests, for example:

  ```python
  def test_ugm3_to_ppb_no2():
      ...
  ```

- Static checks (optional but recommended):
  - **Black** for formatting.
  - **Ruff** (or a similar linter) for style and import checks.

## 📝 Commit Style

Commit messages generally follow a **`type: subject`** pattern, for example:

- `feat: add EPA validation metrics`
- `fix: correct NO2 molecular weight`
- `docs: update README and development notes`

You can keep a brief body when necessary to explain reasoning or link issues.

## 📓 Additional Documentation

- `DEVELOPMENT_NOTES.md`: lightweight development log / session notes.
- `REFACTOR_TODO.md`: refactoring status and TODO list.
- `ISSUES_AND_REQUESTS.md`: bug tracking, issues and feature requests.
- `ARCHITECTURE.md`: project structure and component documentation.

## ✅ Current Status (High Level)

- Calibration workflow: 12 steps (train/validation date ranges → fetch → clean → align → model → post-cal convert → post-cal mapping → validate → results).
- Charts: consistent Plotly template (`airqoon`) and train/validation visual separation in preview charts.
- i18n: calibration workflow largely migrated to `t()` (remaining cleanup in some components).

## ⏳ Known Pending Items

- Outlier cleaning v2: selection-related deletion issues when selecting many points.

## 📚 Reference Documents

Local reference PDFs/notebooks live under `standards/` (not intended for commit by default).

## 📄 License

This project is currently under active development. A formal license file may be added later; until then, please contact the author before using it in production.



=== raw/github_repos/lens-api.md ===
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



=== raw/github_repos/lens-ui.md ===
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



