
/**
 * Validation Utilities
 * 
 * Common validation functions and schemas for the application.
 * Provides reusable validation logic for various data types.
 */

import { body, param, query, ValidationChain } from 'express-validator';

/**
 * Common validation patterns
 */
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  url: /^https?:\/\/.+/,
  mongoId: /^[0-9a-fA-F]{24}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/
};

/**
 * User validation schemas
 */
export const userValidation = {
  register: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(patterns.password)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    body('role')
      .optional()
      .isIn(['user', 'creator', 'partner'])
      .withMessage('Invalid role specified')
  ],

  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],

  updateProfile: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Bio cannot exceed 500 characters'),
    
    body('location')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Location cannot exceed 100 characters'),
    
    body('website')
      .optional()
      .matches(patterns.url)
      .withMessage('Please provide a valid URL'),
    
    body('socialLinks.instagram')
      .optional()
      .matches(/^https?:\/\/(www\.)?instagram\.com\/.+/)
      .withMessage('Please provide a valid Instagram URL'),
    
    body('socialLinks.youtube')
      .optional()
      .matches(/^https?:\/\/(www\.)?youtube\.com\/.+/)
      .withMessage('Please provide a valid YouTube URL')
  ]
};

/**
 * Tutorial validation schemas
 */
export const tutorialValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Title must be between 5 and 200 characters'),
    
    body('description')
      .trim()
      .isLength({ min: 20, max: 1000 })
      .withMessage('Description must be between 20 and 1000 characters'),
    
    body('content')
      .notEmpty()
      .withMessage('Tutorial content is required'),
    
    body('category')
      .isIn([
        'woodworking', 'furniture', 'tools', 'upcycling', 'gardening',
        'electronics', 'textiles', 'metalworking', 'ceramics', 'jewelry',
        'home_improvement', 'storage', 'lighting', 'decoration', 'repairs'
      ])
      .withMessage('Invalid category specified'),
    
    body('difficulty')
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Invalid difficulty level'),
    
    body('duration')
      .isInt({ min: 5 })
      .withMessage('Duration must be at least 5 minutes'),
    
    body('thumbnail')
      .notEmpty()
      .withMessage('Thumbnail is required'),
    
    body('materials')
      .optional()
      .isArray()
      .withMessage('Materials must be an array'),
    
    body('materials.*.name')
      .if(body('materials').exists())
      .notEmpty()
      .withMessage('Material name is required'),
    
    body('materials.*.quantity')
      .if(body('materials').exists())
      .isFloat({ min: 0 })
      .withMessage('Material quantity must be a positive number'),
    
    body('tools')
      .optional()
      .isArray()
      .withMessage('Tools must be an array'),
    
    body('steps')
      .optional()
      .isArray()
      .withMessage('Steps must be an array')
  ],

  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Title must be between 5 and 200 characters'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ min: 20, max: 1000 })
      .withMessage('Description must be between 20 and 1000 characters'),
    
    body('category')
      .optional()
      .isIn([
        'woodworking', 'furniture', 'tools', 'upcycling', 'gardening',
        'electronics', 'textiles', 'metalworking', 'ceramics', 'jewelry',
        'home_improvement', 'storage', 'lighting', 'decoration', 'repairs'
      ])
      .withMessage('Invalid category specified'),
    
    body('difficulty')
      .optional()
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Invalid difficulty level')
  ],

  rate: [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5')
  ]
};

/**
 * Project validation schemas
 */
export const projectValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    
    body('description')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),
    
    body('difficulty')
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
      .withMessage('Invalid difficulty level'),
    
    body('category')
      .notEmpty()
      .withMessage('Category is required'),
    
    body('tutorial')
      .optional()
      .matches(patterns.mongoId)
      .withMessage('Invalid tutorial ID')
  ],

  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 10 and 1000 characters'),
    
    body('status')
      .optional()
      .isIn(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED'])
      .withMessage('Invalid status'),
    
    body('difficulty')
      .optional()
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
      .withMessage('Invalid difficulty level')
  ]
};

/**
 * Challenge validation schemas
 */
export const challengeValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Title must be between 5 and 200 characters'),
    
    body('description')
      .trim()
      .isLength({ min: 20, max: 2000 })
      .withMessage('Description must be between 20 and 2000 characters'),
    
    body('category')
      .isIn([
        'FURNITURE_BUILDING', 'DECORATION', 'RENOVATION', 'KIDS_FURNITURE',
        'OUTDOOR', 'ORGANISATION', 'UPCYCLING', 'ART'
      ])
      .withMessage('Invalid category'),
    
    body('difficulty')
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
      .withMessage('Invalid difficulty level'),
    
    body('duration')
      .isInt({ min: 1 })
      .withMessage('Duration must be at least 1 day'),
    
    body('startDate')
      .isISO8601()
      .withMessage('Invalid start date'),
    
    body('endDate')
      .isISO8601()
      .withMessage('Invalid end date'),
    
    body('submissionDeadline')
      .isISO8601()
      .withMessage('Invalid submission deadline'),
    
    body('votingDeadline')
      .isISO8601()
      .withMessage('Invalid voting deadline')
  ]
};

/**
 * Comment validation schemas
 */
export const commentValidation = {
  create: [
    body('content')
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Comment must be between 1 and 1000 characters'),
    
    body('parentReply')
      .optional()
      .matches(patterns.mongoId)
      .withMessage('Invalid parent reply ID')
  ]
};

/**
 * Query parameter validation
 */
export const queryValidation = {
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],

  mongoId: [
    param('id')
      .matches(patterns.mongoId)
      .withMessage('Invalid ID format')
  ]
};

/**
 * File upload validation
 */
export const fileValidation = {
  image: {
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxSize: 5 * 1024 * 1024 // 5MB
  },
  
  video: {
    allowedTypes: ['video/mp4', 'video/webm', 'video/ogg'],
    maxSize: 100 * 1024 * 1024 // 100MB
  }
};

/**
 * Sanitization utilities
 */
export const sanitize = {
  /**
   * Remove HTML tags from string
   */
  stripHtml: (str: string): string => {
    return str.replace(/<[^>]*>/g, '');
  },

  /**
   * Sanitize user input for safe storage
   */
  userInput: (str: string): string => {
    return str.trim().replace(/[<>]/g, '');
  },

  /**
   * Sanitize search query
   */
  searchQuery: (str: string): string => {
    return str.trim().replace(/[^\w\s-]/g, '').substring(0, 100);
  }
};
