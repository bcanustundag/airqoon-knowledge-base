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
