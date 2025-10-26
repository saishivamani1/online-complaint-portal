import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';
import { createComplaint, myComplaints, getAll, getOne, addUpdate, changeStatus } from '../controllers/complaintController.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.resolve('uploads')),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', requireAuth, upload.single('photo'), createComplaint);
router.get('/mine', requireAuth, myComplaints);

router.get('/', requireAuth, requireRole('authority', 'admin'), getAll);
router.patch('/:id/status', requireAuth, requireRole('authority', 'admin'), changeStatus);
router.post('/:id/updates', requireAuth, requireRole('authority', 'admin'), addUpdate);

router.get('/:id', requireAuth, getOne);

export default router;