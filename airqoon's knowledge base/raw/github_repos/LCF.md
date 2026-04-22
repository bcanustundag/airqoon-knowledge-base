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