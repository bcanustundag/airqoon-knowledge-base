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
