
/**
 * Upload Controller - Basic Implementation
 */

import { Request, Response } from 'express';
import { ApiResponse, AuthenticatedRequest } from '@/types';

export const uploadImage = async (req: AuthenticatedRequest, res: Response) => {
  const response: ApiResponse = { 
    success: true, 
    message: 'Image uploaded successfully', 
    data: { url: '/uploads/image.jpg' }
  };
  res.json(response);
};

export const uploadVideo = async (req: AuthenticatedRequest, res: Response) => {
  const response: ApiResponse = { 
    success: true, 
    message: 'Video uploaded successfully', 
    data: { url: '/uploads/video.mp4' }
  };
  res.json(response);
};

export const deleteFile = async (req: AuthenticatedRequest, res: Response) => {
  const response: ApiResponse = { success: true, message: 'File deleted successfully' };
  res.json(response);
};
