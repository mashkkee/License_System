# License System

A web dashboard for software vendors to issue and track licences for their **clients** and
**distribution partners**. It shows each licence's status, environment and expiry date, and every
connected dashboard updates live when a record changes.

## Features

- **JWT login.** Express issues a 1-day token and the React app checks it on load (`AuthContext`).
- **Client and partner management.** A protected admin page with forms to create clients (tax ID, contact details, environment,
  partner) and partners. New licences default to a 30-day expiry.
- **Real-time sync with Socket.io.** Creating a client or partner pushes the change to every
  open dashboard straight away.
- **Searchable licence table.** Filter by client, partner, status, issue date or expiry date.
- **MySQL schema** (`server/licenca.sql`) with `auth`, `client` and `parthner` tables and a client→partner relation.

## Tech

React 18 · Vite · React Router · Axios · Socket.io · Node.js · Express · MySQL (mysql2) · JWT

## Project structure

```
client/   React + Vite frontend (components, auth context, socket client, CSS modules)
server/   Express + Socket.io API, MySQL schema
```

## Run locally

```bash
# database
mysql -u root -e "CREATE DATABASE license" && mysql -u root license < server/licenca.sql

# API (port 5000)
cd server && npm install && npm run dev

# frontend (port 5173)
cd client && npm install && npm run dev
```

## Notes

Built in 2023 as one of my first full-stack projects. If I rebuilt it today I would hash passwords
with bcrypt, move the JWT secret and DB credentials into environment variables, and add a public
licence-verification endpoint for client applications.
