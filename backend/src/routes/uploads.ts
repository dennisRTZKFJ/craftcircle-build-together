
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
  dest: 'uploads/temp/',
  limits: {
    fileSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760') // 10MB default
  },
  fileFilter: (req, file, cb) => {
    // Basic file type validation
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/ogg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

/**
 * POST /api/uploads/image
 * Upload image file
 */
router.post('/image', [
  authenticateToken(),
  upload.single('image')
], uploadImage);

/**
 * POST /api/uploads/video
 * Upload video file
 */
router.post('/video', [
  authenticateToken(),
  upload.single('video')
], uploadVideo);

/**
 * DELETE /api/uploads/:filename
 * Delete uploaded file
 */
router.delete('/:filename', authenticateToken(), deleteFile);

export default router;
