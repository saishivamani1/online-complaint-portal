// backend/src/server.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 4000;

// Ensure uploads dir exists (optional)
const uploadsPath = path.resolve('uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 API running on http://localhost:${port}`);
  });
};

start();
