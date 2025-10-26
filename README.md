# Online Complaint Portal (MEAN)

A civic grievance portal where citizens can register complaints (with photos), view status updates, and authorities track resolution progress.

## Quick Start

### Backend
```bash
cd backend
npm i
npm run dev
# API -> http://localhost:4000
```
> Your MongoDB connection string is already embedded in `backend/.env`.

### Frontend (Angular)
This repo contains starter Angular app files under `frontend/src/app/*`. To create a runnable Angular app:
```bash
npm i -g @angular/cli
ng new online-complaint-portal --routing --style=scss
# copy the files from frontend/src/* in this zip into your Angular project's src/*
# add the proxy config from frontend/proxy.conf.json and start with:
ng serve --proxy-config proxy.conf.json
```
Then open http://localhost:4200.

## API Endpoints
- `POST /api/auth/register` — `{ name, email, password, role? }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `POST /api/complaints` (auth; multipart/form-data with optional `photo`)
- `GET /api/complaints/mine` (auth)
- `GET /api/complaints` (authority/admin)
- `GET /api/complaints/:id` (auth)
- `POST /api/complaints/:id/updates` (authority/admin) → `{ message }`
- `PATCH /api/complaints/:id/status` (authority/admin) → `{ status, assignedTo? }`

## Notes
- Images are stored on disk under `/uploads` and served at `/uploads/<filename>`.
- Do not commit `backend/.env` to source control.# online-complaint-portal
# online-complaint-portal
