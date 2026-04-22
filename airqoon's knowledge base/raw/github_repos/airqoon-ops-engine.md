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
