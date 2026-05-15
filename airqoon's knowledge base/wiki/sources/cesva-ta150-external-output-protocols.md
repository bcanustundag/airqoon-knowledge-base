---
title: "Cesva TA150 External Output Protocols (RS-232 / RS-485 / 4-20 mA)"
type: source
tags: [competitor, cesva, noise_sensor, integration, protocol, rs232, rs485, modbus, current_loop, industrial]
created: 2026-05-15
updated: 2026-05-15
sources: [raw/articles/PR2_TA150_v0002_20250415_EN.pdf]
related:
  - "[[wiki/entities/cesva|Cesva]]"
  - "[[wiki/sources/cesva-ta150-datasheet|Datasheet]]"
  - "[[wiki/sources/cesva-ta150-user-manual|User Manual]]"
  - "[[wiki/sources/cesva-ta150-communication-protocols|Communication Protocols (Platform)]]"
---

# Cesva TA150 External Output Protocols (RS-232 / RS-485 / 4-20 mA)

> Reference: PR_TA150output_v0002_20250415_EN

## Overview
This document covers the **local / wired external output** protocols for the TA150. These are industrial interfaces used to connect the sensor to PLCs, SCADA systems, data-acquisition equipment, or local displays. Each interface requires purchasing a specific optional hardware module:

| Interface | Required Module | Protocols Available |
|-----------|----------------|---------------------|
| RS-232    | RS152*         | Disabled, CESVA proprietary, Modbus RTU |
| RS-485    | RS154*         | Disabled, CESVA proprietary, Modbus RTU (2-wire), Modbus RTU (4-wire) |
| 4-20 mA current loop | CL150* | Disabled, CESVA proprietary |

> **Important:** Only **one** hardware module can be installed per sensor. Once installed, it cannot be changed.

---

## 1 RS-232 (Module RS152)

### 1.1 CESVA Proprietary Protocol

**Configuration (via web server):**
- Averaging time (TLeq): 1–3600 s
- Flow control: None / CTS / RTS / RTS+CTS
- Baud rate: up to 115200 bps
- Parity: None / Even / Odd
- Stop bits: 1 / 1.5 / 2

**Protocol flow:**
- **Master → TA150:** `"M"` + CR(13) = start transmission; `"m"` + CR(13) = stop transmission
- **TA150 → Master:** Every second, transmits a binary packet:

```
STX(02) M <t_of_T: 4 chars> <LAT> <LCT> <LZT> <LAIT>
<LAFmaxT> <LASmaxT> <LAImaxT> <LCpeakT> <LZpeakT>
ETX(03) CR(13) LF(10)
```

Each level is 5 characters:
- 1 char saturation flag: `'-'` = normal, `'o'` = overload, `'u'` = underrange, `'b'` = both
- 4 chars hex-encoded level × 10

**Example:**
```
M0035u0286-0364-0392-0356-0479-0431-0406-0301-0320
```
- `0035` → 35 seconds elapsed
- `u` → underrange
- `0286` → hex 646 → LAT = 64.6 dB
- `-0364` → no flag, hex 868 → LCT = 86.8 dB

### 1.2 Modbus RTU (over RS-232)

**Configuration (via web server):**
- Averaging time (TLeq): 1–3600 s
- Flow control: None
- Baud rate: up to 115200 bps
- Parity: None / Even / Odd
- Stop bits: 1 / 1.5 / 2
- Modbus Address: default `001`

**Register Map (Holding Registers, function 0x03):**

| Register | Parameter | Data Type | Range |
|----------|-----------|-----------|-------|
| 0x0000   | Elapsed time of interval T (seconds) | uint16 | 1–3600 |
| 0x0001   | LAT level | uint16 | 0–1600 (= 0.0–160.0 dB) |
| 0x0002   | LAT overload/underrange | uint16 | 0–3 |
| 0x0003   | LCT level | uint16 | 0–1600 |
| 0x0004   | LCT overload/underrange | uint16 | 0–3 |
| 0x0005   | LZT level | uint16 | 0–1600 |
| 0x0006   | LZT overload/underrange | uint16 | 0–3 |
| 0x0007   | LAIT level | uint16 | 0–1600 |
| 0x0008   | LAIT overload/underrange | uint16 | 0–3 |
| 0x0009   | LAFmaxT level | uint16 | 0–1600 |
| 0x000A   | LAFmaxT overload/underrange | uint16 | 0–3 |
| 0x000B   | LASmaxT level | uint16 | 0–1600 |
| 0x000C   | LASmaxT overload/underrange | uint16 | 0–3 |
| 0x000D   | LAImaxT level | uint16 | 0–1600 |
| 0x000E   | LAImaxT overload/underrange | uint16 | 0–3 |
| 0x000F   | LCpeakT level | uint16 | 0–1600 |
| 0x0010   | LCpeakT overload/underrange | uint16 | 0–3 |
| 0x0011   | LZpeakT level | uint16 | 0–1600 |
| 0x0012   | LZpeakT overload/underrange | uint16 | 0–3 |

**Overload/Underrange codes:**
- `0` = none
- `1` = underrange
- `2` = overload
- `3` = both

**Example query (read first 3 registers):**
```
Request:  01 03 00 00 00 03 05 CB
Response: 01 03 06 00 13 02 41 00 00 F5 1A
```
- `0013` hex = 19 → elapsed 19 s
- `0241` hex = 577 → 57.7 dB
- `0000` → no overload/underrange

---

## 2 RS-485 (Module RS154)

### 2.1 CESVA Proprietary Protocol
Same protocol and packet format as RS-232 CESVA (see §1.1), with additional RS-485 parameters:
- **RXR** (Receiver Termination Resistor A/B): True/False
- **TXR** (Transmitter Termination Resistor Y/Z): True/False
- Transmission on Y/Z, reception on A/B (optional)
- Automatic transmission; no other slaves on bus

### 2.2 Modbus RTU (2-Wire)
Same register map as RS-232 Modbus (see §1.2). Additional config:
- RXR, TXR termination resistors
- Supports multiple slaves on the bus
- Transmission and reception on Y/Z lines

### 2.3 Modbus RTU (4-Wire)
Identical register map and protocol to 2-wire Modbus. Configuration also identical but uses dedicated transmit (Y/Z) and receive (A/B) pairs on 4 wires.

---

## 3 Current Loop 4-20 mA (Module CL150)

### 3.1 CESVA Protocol

**Configuration:**
- Averaging time (TLeq): 1–3600 s
- Function to output: LAT, LCT, LZT, LAIT, LAFmaxT, LASmaxT, LAImaxT, LCpeakT, or LZpeakT

**Technical characteristics:**
| Parameter | Value |
|-----------|-------|
| Power supply | 8–36 VDC |
| Output range | 4–20 mA → maps to 27.4–137.0 dB |
| Maximum error | ± 4 µA |
| Polarity | Yes |

**Transfer function:**
```
Iout = (LAT / 137) × 20  [mA]
```
- If overload occurs: `Iout = 24.0 mA`
- Output is updated every T (the programmed averaging time)

**Circuit topology:** The 4-20 mA current-loop forms a closed series circuit: sensor → power supply → receiver (DAQ). Current loops are inherently noise-immune, making them ideal for industrial environments.

---

## 4 Integration Relevance for Airqoon

### Modbus RTU (RS-485)
- **Most relevant for industrial deployments** (OIZ, fenceline monitoring): the TA150 can sit on the same Modbus bus as air-quality sensors if Airqoon's SU (Sensor Unit) supports an RS-485 master.
- All 9 noise functions + percentiles are available as 16-bit unsigned Holding Registers, trivially parsable.
- The register map is compact (0x0000–0x0012, 19 registers) — a single `0x03` read of 19 registers fetches all data.

### 4-20 mA
- Single-function output only. Useful for legacy PLCs or quick analog tie-ins but not for full-spectrum data.

### CESVA Serial Protocol
- Proprietary binary format (hex-encoded dB × 10). Would require custom parsing in Airqoon firmware.
- 1 Hz update rate is its advantage over the Modbus polling model.

## Source
- [[raw/articles/PR2_TA150_v0002_20250415_EN.pdf]]
