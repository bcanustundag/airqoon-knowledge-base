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