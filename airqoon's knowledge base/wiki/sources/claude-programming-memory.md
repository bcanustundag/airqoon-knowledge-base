---
title: Claude Programming Project Memory
type: source
tags:
  - claude
  - memory
  - engineering
  - infrastructure
  - architecture
source_file: raw/assets/claude-programming-project-memory.md
last_updated: 2026-04-23
---

# Claude Programming Project Memory

**Document Type**: AI Project Memory / Context File
**Subject**: Airqoon Infrastructure & Engineering

## Overview
This document represents Claude's synthesized project memory for Airqoon's technical infrastructure, DevOps stack, and backend engineering context.

## Key Insights

### Infrastructure Stack
- **Hosting**: DigitalOcean K8s (namespace: `airqoon`), Coolify (self-hosted), Proxmox VE (local virtualization).
- **Services**: Traefik (reverse proxy), HAProxy (legacy), Keycloak (evaluating for auth), Garage S3 (storage), SigNoz (observability, via OpenTelemetry Collector), Matrix Synapse (chat).
- **Databases**: PostgreSQL, MongoDB, SQLite. Prisma ORM in use.

### IoT & ThingsBoard
- **Current Setup**: ThingsBoard PE 2.5.4 (production, legacy Ubuntu 16.04) and ThingsBoard 3.4.3 (dev).
- **Issue**: TB 2.5.4PE sends non-spec-compliant MQTT headers (fixed header flags 0x02 on PUBACK/SUBACK), which strict ESP32 clients reject. Plan is to DNS flip `see.airqoon.com` to TB 3.4.3.
- **Connectivity**: MQTT over TLS port 8883, cellular 4G/NB-IoT.

### Technical Principles & Patterns
- **DevOps**: Prefers preserving existing infra over recreation. Uses managed declarative tools (Helm, Coolify).
- **Networking**: Kubernetes TCP passthrough for non-HTTP ports (MQTT, Postgres) requires `tcp-services` ConfigMap and explicit LoadBalancer patching, not standard ingress rules.
- **Debugging**: Systematic layered debugging (DNS -> firewall -> routing -> app).
- **Timezone Bug**: Long-standing UTC+3 vs UTC+0 bug in data crawler since 2022 causing 3-hour shifts.

### Tooling
- VS Code, Claude Code extension, DataGrip, OpenLens, Cyberduck, Podman Desktop.
- Automation via n8n and Apify.
