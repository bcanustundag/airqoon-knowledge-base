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
