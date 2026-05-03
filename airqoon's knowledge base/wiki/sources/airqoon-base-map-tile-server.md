---
title: "Airqoon Base Map Tile Server"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["github/airqoon-base-map-tile-server.md"]
---

# Airqoon Base Map Tile Server

**Repository:** `airqoon-base-map-tile-server`
**Source File:** `github/airqoon-base-map-tile-server.md`

## Description
Vector tile server for Airqoon air quality monitoring map. Serves Mapbox Vector Tiles (MVT) in Protocol Buffer format (.pbf) for efficient map rendering.

## Role in Architecture

**Layer:** Backend Microservices (K8s)

Vector tile server rendering Mapbox Vector Tiles (.pbf) for efficient map rendering. Enables spatial data loading (only visible area), smooth pan/zoom without refetching, and automatic clustering at different zoom levels.

## Tech Stack

Node.js, Protocol Buffers, MapLibre GL JS, MongoDB

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon-map|Airqoon Map]]
- [[wiki/entities/airqoon|Airqoon]]
