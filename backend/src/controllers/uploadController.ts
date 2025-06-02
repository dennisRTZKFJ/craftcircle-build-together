
/**
 * Upload Controller
 * 
 * Handles file uploads for images, videos, and other media.
 */

import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Upload image file
 * POST /api/uploads/image
 */
export const uploadImage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      const response: ApiResponse = {
        success: false,
        message: 'No image file provided'
      };
      return res.status(400).json(response);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      
      const response: ApiResponse = {
        success: false,
        message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'
      };
      return res.status(400).json(response);
    }

    // Generate unique filename
    const fileExtension = path.extname(req.file.originalname);
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
    const newPath = path.join('uploads/images', uniqueFilename);

    // Create directory if it doesn't exist
    const dir = path.dirname(newPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Move file to final location
    fs.renameSync(req.file.path, newPath);

    const imageUrl = `/uploads/images/${uniqueFilename}`;

    const response: ApiResponse = {
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: uniqueFilename,
        url: imageUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Upload image error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    const response: ApiResponse = {
      success: false,
      message: 'Failed to upload image',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Upload video file
 * POST /api/uploads/video
 */
export const uploadVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      const response: ApiResponse = {
        success: false,
        message: 'No video file provided'
      };
      return res.status(400).json(response);
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      
      const response: ApiResponse = {
        success: false,
        message: 'Invalid file type. Only MP4, WebM, and OGG are allowed.'
      };
      return res.status(400).json(response);
    }

    // Generate unique filename
    const fileExtension = path.extname(req.file.originalname);
    const uniqueFilename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
    const newPath = path.join('uploads/videos', uniqueFilename);

    // Create directory if it doesn't exist
    const dir = path.dirname(newPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Move file to final location
    fs.renameSync(req.file.path, newPath);

    const videoUrl = `/uploads/videos/${uniqueFilename}`;

    const response: ApiResponse = {
      success: true,
      message: 'Video uploaded successfully',
      data: {
        filename: uniqueFilename,
        url: videoUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Upload video error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    const response: ApiResponse = {
      success: false,
      message: 'Failed to upload video',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Delete uploaded file
 * DELETE /api/uploads/:filename
 */
export const deleteFile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { filename } = req.params;
    
    // Security: prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      const response: ApiResponse = {
        success: false,
        message: 'Invalid filename'
      };
      return res.status(400).json(response);
    }

    // Try to find file in images or videos directory
    const imagePath = path.join('uploads/images', filename);
    const videoPath = path.join('uploads/videos', filename);

    let filePath = null;
    if (fs.existsSync(imagePath)) {
      filePath = imagePath;
    } else if (fs.existsSync(videoPath)) {
      filePath = videoPath;
    }

    if (!filePath) {
      const response: ApiResponse = {
        success: false,
        message: 'File not found'
      };
      return res.status(404).json(response);
    }

    // Delete file
    fs.unlinkSync(filePath);

    const response: ApiResponse = {
      success: true,
      message: 'File deleted successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Delete file error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to delete file',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
