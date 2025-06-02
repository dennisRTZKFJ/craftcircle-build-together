
/**
 * Upload Routes
 * 
 * Handles file uploads for images, videos, and other media.
 */

import express from 'express';
import multer from 'multer';
import {
  uploadImage,
  uploadVideo,
  deleteFile
} from '@/controllers/uploadController';
import { authenticateToken } from '@/middlewares/auth';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760') // 10MB
  }
});

router.post('/image', [authenticateToken(), upload.single('image')], uploadImage);
router.post('/video', [authenticateToken(), upload.single('video')], uploadVideo);
router.delete('/:filename', authenticateToken(), deleteFile);

export default router;
