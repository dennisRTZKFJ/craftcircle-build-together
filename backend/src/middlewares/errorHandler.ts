
/**
 * Error Handling Middleware
 * 
 * Provides centralized error handling for the entire application.
 * Handles different types of errors and returns consistent responses.
 */

import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { ApiResponse } from '../types';
import { logger } from '../utils/logger';

/**
 * Not Found Handler
 * 
 * Handles 404 errors for undefined routes.
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const response: ApiResponse = {
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: 'Not Found'
  };
  
  res.status(404).json(response);
};

/**
 * Global Error Handler
 * 
 * Centralized error handling for all application errors.
 * Provides different handling for different error types.
 */
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorDetails: string | undefined;
  
  // Log the error for debugging
  logger.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });
  
  // Mongoose Validation Error
  if (error instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errorDetails = Object.values(error.errors)
      .map((err: any) => err.message)
      .join(', ');
  }
  
  // Mongoose Cast Error (Invalid ObjectId)
  else if (error instanceof MongooseError.CastError) {
    statusCode = 400;
    message = 'Invalid ID format';
    errorDetails = `Invalid ${error.path}: ${error.value}`;
  }
  
  // Mongoose Duplicate Key Error
  else if (error.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
    const field = Object.keys(error.keyValue)[0];
    errorDetails = `${field} already exists`;
  }
  
  // JWT Errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    errorDetails = 'Please provide a valid authentication token';
  }
  
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    errorDetails = 'Authentication token has expired';
  }
  
  // Custom Application Errors
  else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
    errorDetails = error.details;
  }
  
  // Rate Limiting Error
  else if (error.status === 429) {
    statusCode = 429;
    message = 'Too Many Requests';
    errorDetails = 'Please slow down your requests';
  }
  
  // File Upload Errors
  else if (error.code === 'LIMIT_FILE_SIZE') {
    statusCode = 400;
    message = 'File too large';
    errorDetails = 'Please upload a smaller file';
  }
  
  else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = 'Invalid file upload';
    errorDetails = 'Unexpected file field or too many files';
  }
  
  // Generic Error Handling
  else if (error.message) {
    message = error.message;
  }
  
  const response: ApiResponse = {
    success: false,
    message,
    error: errorDetails || message
  };
  
  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.data = {
      stack: error.stack
    };
  }
  
  res.status(statusCode).json(response);
};

/**
 * Async Error Handler
 * 
 * Wrapper function to catch async errors and pass them to the error handler.
 * Use this to wrap async route handlers.
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Custom Error Class
 * 
 * Create custom errors with status codes.
 */
export class AppError extends Error {
  statusCode: number;
  details?: string | undefined;
  
  constructor(message: string, statusCode: number = 500, details?: string | undefined) {
    super(message);
    this.statusCode = statusCode;
    if (details !== undefined) {
      this.details = details;
    }
    this.name = 'AppError';
    
    Error.captureStackTrace(this, this.constructor);
  }
}
