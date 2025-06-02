
/**
 * Notification Controller - Basic Implementation
 */

import { Request, Response } from 'express';
import { ApiResponse, AuthenticatedRequest } from '@/types';

export const getNotifications = async (req: AuthenticatedRequest, res: Response) => {
  const response: ApiResponse = { success: true, message: 'Notifications retrieved', data: [] };
  res.json(response);
};

export const markAsRead = async (req: AuthenticatedRequest, res: Response) => {
  const response: ApiResponse = { success: true, message: 'Notification marked as read' };
  res.json(response);
};

export const markAllAsRead = async (req: AuthenticatedRequest, res: Response) => {
  const response: ApiResponse = { success: true, message: 'All notifications marked as read' };
  res.json(response);
};
