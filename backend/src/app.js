// backend/src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import complaintRoutes from './routes/complaints.js';

const app = express();

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Core middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (allow multiple comma-separated origins via CLIENT_ORIGIN)
const allowed = (process.env.CLIENT_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(
  cors({
    origin: allowed.length ? allowed : true, // true = reflect request origin
    credentials: true,
  })
);

// Static uploads (note: ephemeral on Render unless you attach a Disk)
app.use('/uploads', express.static(path.resolve('uploads')));

// Healthcheck + APIs
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// ==== SPA static (built Angular app) ====
// These files are copied to backend/public by render.yaml build step
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// SPA fallback — keep LAST so it doesn't swallow /api/*
app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

export default app;
