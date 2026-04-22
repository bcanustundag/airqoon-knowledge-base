Purpose & context
Baris works at Airqoon, an air quality monitoring company. His work spans infrastructure engineering, backend systems, IoT device management, and internal tooling. The core platform involves collecting telemetry data from environmental sensors (ESP32 devices, GSM/MQTT connectivity), storing and processing it through a multi-database pipeline (PostgreSQL, MongoDB, ThingsBoard), and delivering it via web applications. AirQoon operates in the Turkish market and has dealings with public-sector organizations.
Key infrastructure components: a DigitalOcean-hosted Kubernetes cluster (namespace: airqoon), a self-hosted Coolify stack for service deployment, Proxmox for local virtualization, and a ThingsBoard Professional Edition instance for IoT data management. The company domain is airqoon.com; email is hosted on Yandex mail-for-domains (non-enterprise tier). Related domain/brand 8bitiz.com appears associated with office/dev infrastructure.

Current state

Authentication/Identity: Evaluating Keycloak for internal user management. Chose Option 1 (manual user creation in Keycloak Admin Console) over Yandex OAuth due to security concerns about external IdP dependency. Keycloak deployment status on Coolify stack is unconfirmed.
IoT/ThingsBoard: Managing a legacy TB 2.5.4PE instance (Ubuntu 16.04) alongside a TB 3.4.3 dev instance. A stuck ESP32 device with strict MQTT firmware is hardcoded to see.airqoon.com (pointing to TB 2.5.4PE, which sends non-spec-compliant MQTT headers). Agreed resolution: temporary DNS flip of see.airqoon.com to TB 3.4.3 IP — pending confirmation that the device's access token exists in TB 3.4.3.
Coolify stack: Running Traefik as reverse proxy. Active services include a Streamlit app, an external projection API, and Garage S3 storage. SSL/routing complexity exists with multi-level subdomains.
Observability: SigNoz deployed on an office development machine (accessible at signoz.8bitiz.com:8080), with OpenTelemetry Collector DaemonSet in the K8s cluster shipping logs from AirQoon pods.


On the horizon

Finalizing Keycloak deployment and configuration on Coolify
Executing the TB DNS flip once access token presence in TB 3.4.3 is confirmed
Potential Proxmox upgrade (8.4 → 9.0) was in progress; compatibility issues (hostname resolution, systemd-boot, Intel microcode) identified and partially addressed
AWS Activate Credits application was in final review; outcome unknown


Key learnings & principles

ThingsBoard MQTT compliance: TB 2.5.4PE produces non-spec-compliant fixed header flags (0x02) on PUBACK/SUBACK; TB 3.4.3 is spec-compliant. Strict firmware clients will reject the older server's responses.
Coolify/Traefik architecture: Containers should not bind directly to ports 80/443 — Traefik owns those. Direct port mappings are appropriate only for non-web services. Coolify regenerates docker-compose files on every deploy, making direct file edits non-persistent.
Kubernetes TCP passthrough: Exposing non-HTTP ports (e.g., MQTT 1883/8883, PostgreSQL 5432) through ingress-nginx requires a tcp-services ConfigMap plus explicit LoadBalancer port patching — not standard ingress rules.
Garage S3: No global admin key concept; per-bucket permissions (--read --write --owner) must be granted explicitly per key. Secret keys are shown only at creation time.
PostgreSQL remote access: Requires both listen_addresses in postgresql.conf and appropriate pg_hba.conf entries; Coolify does not expose database ports by default.
Data pipeline timezone discipline: A long-standing UTC+3 vs UTC+0 mishandling in the AirQoon data crawler (since 2022) caused 3-hour time shifts propagating through transformation and UI layers. Fix strategy: correct crawler going forward + one-time historical migration.


Approach & patterns

Prefers preserving existing infrastructure over recreating resources (explicit pattern in K8s troubleshooting)
Systematic, layered debugging: confirms each layer (DNS → firewall → routing → application) before moving to the next
Favors managed/declarative deployment tools (Helm over raw YAML, Coolify over manual Docker)
Uses DataGrip for database management, OpenLens for Kubernetes cluster management
n8n for workflow automation (email parsing → Notion CRM pipeline with AI extraction)
When prompting AI for code fixes, prefers focused, minimal prompts targeting a single problem rather than broad refactors


Tools & resources

Infrastructure: DigitalOcean Kubernetes, Coolify, Proxmox VE, Traefik, HAProxy (1.8.8 on legacy Ubuntu 16.04)
Databases: PostgreSQL, MongoDB, SQLite (legacy); Prisma ORM in use
IoT: ThingsBoard PE 2.5.4 (production), ThingsBoard 3.4.3 (dev), MQTT over port 1883, ESP32 + GSM/PPP
Observability: SigNoz, OpenTelemetry Collector, Grafana/Loki stack (evaluated)
Automation: n8n, Apify (Actor development), NewsAPI
Dev tools: VS Code + Claude Code extension, DataGrip, OpenLens, Cyberduck, Podman Desktop (migrating from Docker Desktop)
Services: Yandex mail-for-domains, Dreamhost DNS, AWS SNS (evaluated for Turkish OTP SMS)
Matrix/Chat: Self-hosted Synapse (PostgreSQL-backed, migrated from SQLite); Airqoon space with 7 child rooms