---
title: "Cesva TA150 Communication Protocols (Platform / Internet)"
type: source
tags: [competitor, cesva, noise_sensor, integration, protocol, mqtt, sentilo, json, http, ultralight, iot, audio]
created: 2026-05-15
updated: 2026-05-15
sources: [raw/articles/PR_TA150_v0008_20240729_EN.pdf]
related:
  - "[[wiki/entities/cesva|Cesva]]"
  - "[[wiki/sources/cesva-ta150-datasheet|Datasheet]]"
  - "[[wiki/sources/cesva-ta150-user-manual|User Manual]]"
  - "[[wiki/sources/cesva-ta150-external-output-protocols|External Output Protocols]]"
---

# Cesva TA150 Communication Protocols (Platform / Internet)

> Reference: PR_TA150_v0008_20240729_EN

## Overview
This document describes the **internet-facing / platform** communication protocols used by the TA150 to push data to cloud servers. It does **not** cover the local external-output interfaces (RS-232, RS-485, 4-20 mA); those are covered in the companion [[wiki/sources/cesva-ta150-external-output-protocols|External Output Protocols]] document.

All configuration is performed through the sensor's built-in web server (activated by holding the front-panel button). While web-server mode is active, data is buffered locally but **not** sent to the internet platform (except for modules CL150, RS-485, RS-232, which continue transmitting).

---

## 1 Measured Functions

### 1.1 Overall Functions
| Function   | Key   | Overload | Underrange |
|-----------|-------|----------|------------|
| LAT       | `la`  | `la-o`   | `la-u`     |
| LCT       | `lc`  | `lc-o`   | `lc-u`     |
| LZT       | `lz`  | `lz-o`   | `lz-u`     |
| LAIT      | `lai` | `lai-o`  | `lai-u`    |
| LAFmaxT   | `lafmx` | `lafmx-o` | `lafmx-u` |
| LASmaxT   | `lasmx` | `lasmx-o` | `lasmx-u` |
| LAImaxT   | `laimx` | `laimx-o` | `laimx-u` |
| LCpeakT   | `lcpk` | `lcpk-o` | `lcpk-u`  |
| LZpeakT   | `lzpk` | `lzpk-o` | `lzpk-u`  |
| L10       | `L10` | `L10-o`  | `L10-u`   |
| L50       | `L50` | `L50-o`  | `L50-u`   |
| L90       | `l90` | `l90-o`  | `l90-u`   |

### 1.2 1/3-Octave Spectrum Functions (requires FR150 module)
30 bands from **6.3 Hz** to **20 kHz** (keys `l006` → `l20k`), each with overload/underrange flags.

---

## 2 Online Command Table
Commands can be sent **from the server to the sensor** via the response body.

| Command | Value | Format | Description |
|---------|-------|--------|-------------|
| `tl`    | 0001–3600 | 4-digit number | Averaging time in seconds (default 0060) |
| `fa-ou` | 0/1   | Boolean | Enable/disable LAT overload/underrange |
| `fc`, `fz`, `fai`, `fafmx`, `fasmx`, `faimx`, `fcpk`, `fzpk`, `f10`, `f50`, `f90` | 0/1 | Boolean | Enable/disable function registers |
| `fex-ou` | 0/1  | Boolean | Enable/disable function overload/underrange |
| `f1s`   | 0/1   | Boolean | Enable/disable 1-second registers (only if TLeq ≤ 60 s) |
| `f1s_n` | 1–9   | Number  | Select 1 s function: 1=LA, 2=LC, 3=LZ, 4=LAI, 5=LAFmax, 6=LASmax, 7=LAImax, 8=LCpeak, 9=LZpeak |
| `f1s-ou` | 0/1  | Boolean | Enable/disable 1 s overload/underrange (requires FR150) |
| `fto`   | 0/1   | Boolean | Enable/disable 1/3-octave registers (requires FR150) |
| `fto-ou`| 0/1   | Boolean | Enable/disable 1/3-octave overload/underrange (requires FR150) |

---

## 3 Platform Register Protocols

### 3.1 UltraLight 2.0 (UL2.0)

| Property | Value |
|----------|-------|
| **Transport** | HTTP, HTTPS, MQTT-TCP, MQTT-TLS |
| **Method** | POST |
| **Body format** | Pipe-delimited key-value pairs |

**Request header:**
```
POST /<path>?k=<key>&i=TA150-<serial>&t=<time>&getCmd=<gc>
Host: <host>
Content-Type: text/plain; charset=UTF-8
```

**Body structure** (5 sections, `|`-separated):
1. **Overall values** – `tl|<tl>|la|<la>|la-o|<la-o>| … |l90-u|<l90-u>`
2. **1-second values** – `|f1s_n|<func>|l1s|v1;v2;…;vN|l1s-o|…|l1s-u|…` (if TLeq ≤ 60 s)
3. **Spectrum values** – `|l006|<v>|l006-o|<v>| … |l20k-u|<v>` (requires FR150)
4. **System values** – `pwr|<1–4>|wifi|<%>|bat|<%>|modem|<%>|gps|<lat,lon>`

**System value codes:**
- `pwr`: 1 = 230 V mains, 2 = battery, 3 = 12 V, 4 = PoE

**Server response:**
- HTTP 200 → accepted. Any other code → sensor retries next cycle.
- To send a command: body `TA150-<serial>@setConfig|<cmd>=<value>`

### 3.2 Generic JSON

| Property | Value |
|----------|-------|
| **Transport** | HTTP, HTTPS, MQTT-TCP, MQTT-TLS |
| **Method** | PUT |
| **Body format** | JSON |

**Request header:**
```
PUT /<path>
Host: <host>
API-KEY: <token>
Content-Type: application/json; charset=UTF-8
```

**JSON body structure:**
```json
{
  "name": "TA150-<serial>",
  "manufacturer": "CESVA",
  "model": "TA150",
  "serial": "<serial>",
  "timestamp": "yyyy-mm-ddThh:ii:ssZ",
  "averagingtime": 60,
  "overall": {
    "la": 63.2, "la-o": false, "la-u": false,
    "lc": 63.2, "...": "..."
  },
  "system": {
    "pwr": 1,
    "bat": 78,
    "modem": 89,
    "gps": "41.44195, 2.20366"
  },
  "seconds": {
    "f1s_n": "lz",
    "l1s": "63.2;63.2;...;63.2",
    "l1s-o": "false;false;...;false",
    "l1s-u": "false;false;...;false"
  },
  "spectrum": {
    "l006": 59.1, "l006-o": false, "l006-u": false,
    "...": "...",
    "l20k": 59.1, "l20k-o": false, "l20k-u": false
  }
}
```

**Command response:**
```json
{ "setConfig": { "tl": 30, "1s": 0 } }
```

### 3.3 Sentilo API

| Property | Value |
|----------|-------|
| **Transport** | HTTP, HTTPS, MQTT-TCP, MQTT-TLS |
| **Method** | PUT (data), GET (orders) |
| **Body format** | Sentilo JSON |

**Data push:**
```
PUT /data/<provider_id>
Host: <host>:<port>
IDENTITY_KEY: <token>
Content-Type: application/json; charset=UTF-8
```

Each measurement is sent as an individual "sensor" entry:
```json
{"sensors":[
  {"sensor":"TA150-<serial>-la", "observations":[{"value":"22.7","timestamp":"dd/mm/yyyyThh:ii:ssUTC"}]},
  {"sensor":"TA150-<serial>-lc", "observations":[{"value":"31.3","timestamp":"..."}]}
]}
```

**Order retrieval:**
```
GET /order/<provider_id>/TA150-<serial>
Host: <host>:<port>
API-KEY: <token>
```
Response: `{"orders":[{"order":"t 0030"}]}`

---

## 4 Platform Audio Protocols (requires GA150 module)

Audio files can be captured in **MP3**, **FLAC**, or **WAV** and uploaded via HTTP POST.

**Request header:**
```
POST /<audiopath>
Host: <audiohost>
IDKEY: <audiokey>
Model: TA150
Serialnum: <serial>
Version: <firmware_version>
filename: <serial>_yyyy_mm_dd_hh-ii_ss
filetype: flac
```

**Body:** binary audio file content.

**Trigger modes:** continuous (configurable interval, e.g. 24 h), level-based, time-based, or emergency.

---

## 5 Integration Relevance for Airqoon
- The TA150 supports **HTTP/HTTPS** and **MQTT** which are the same transports Airqoon's cloud backend consumes, making direct ingestion feasible.
- The **Generic JSON** format is the most straightforward to parse; the `overall`, `seconds`, and `spectrum` blocks map cleanly to Airqoon's time-series schema.
- **Sentilo** compatibility is notable for Spanish smart-city deployments where Sentilo is the municipal platform standard.
- The **UltraLight 2.0** pipe-delimited format is lightweight and suited for constrained connectivity scenarios.
- Audio file upload capability (GA150 module) could complement noise-event characterisation workflows.

## Source
- [[raw/articles/PR_TA150_v0008_20240729_EN.pdf]]
