# Express + MongoDB

A minimal Express 5 application using ES modules and Mongoose, configured to run with environment variables (dotenvx) and a Dockerized MongoDB for local development.

## Overview
- HTTP API built with Express 5 (ESM)
- MongoDB connection via Mongoose
- Environment variables managed with dotenvx
- Development server with nodemon
- Docker Compose provides a local MongoDB instance

## Tech Stack
- Node.js (ES Modules)
- Express 5
- Mongoose 8
- dotenvx
- Docker + Docker Compose (for MongoDB)

## Requirements
- Node.js and npm installed
- Docker and Docker Compose

## Getting Started
1) Install dependencies
```
npm install
# or, for clean installs matching package-lock.json
npm ci
```

2) Start MongoDB (via Docker Compose)
```
# from the project root
docker compose up
```
This uses the provided `.env.develop` to configure the MongoDB container and will also run initialization scripts from `./mongo-init`.

3) Run the API
- Development (uses `.env.develop`):
```
npm run dev
```
- Standard start (loads `.env` by default):
```
# create and populate an .env file first (see Environment Variables below)
npm start
```

The server listens on `API_PORT` (defaults to 4000 in code if not set).

## Scripts
- `npm start` — Runs the server with dotenvx (loads `.env` by default)
- `npm run dev` — Runs server with nodemon and dotenvx using `.env.develop`
- `npm run debug` — Runs server with `DEBUG=express:*`
- `npm test` — Placeholder (no tests yet)

## Environment Variables
These are read by the application (server.js) and/or Docker Compose:

Application (required unless noted):
- `API_PORT` — Port the API listens on (default: 4000 if unset)
- `MONGO_URI` — MongoDB host or IP (e.g., `127.0.0.1`)
- `MONGO_PORT` — MongoDB port (e.g., `27017`)
- `MONGO_DEV_USERNAME` — MongoDB username used by the app
- `MONGO_DEV_PASSWORD` — MongoDB password used by the app
- `MONGO_INITDB_DATABASE` — Database name (e.g., `circle`)

Docker Compose (MongoDB container):
- `MONGO_HOST_PORT` — Host port to map to container 27017 (default: 27017)
- `MONGO_INITDB_ROOT_USERNAME` — Root user for Mongo init
- `MONGO_INITDB_ROOT_PASSWORD` — Root password for Mongo init
- `MONGO_INITDB_DATABASE` — Database to initialize (e.g., `circle`)

Examples are provided in `.env.develop`:
```
API_PORT=3000
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
MONGO_INITDB_DATABASE=circle
MONGO_DEV_USERNAME=dev
MONGO_DEV_PASSWORD=dev
MONGO_PORT=27017
MONGO_URI=127.0.0.1
```

Notes:
- The `mongo-init/01-create-dev-user.js` script creates the dev user in the `circle` database using `MONGO_DEV_USERNAME` and `MONGO_DEV_PASSWORD` when the container starts.
- For local dev without Docker, ensure a MongoDB instance is running and the above variables point to it.

## Docker Notes
- Only the MongoDB service is defined in `docker-compose.yml`.
- The API is run with Node locally; it is not included as a Compose service.
- Bring the DB down when finished:
```
docker compose down
# to also remove persisted data volume
# docker compose down -v
```
