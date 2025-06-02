/**
 * CraftCircle Backend Server
 * 
 * This is the main entry point for the CraftCircle API server.
 * It sets up Express.js with all necessary middleware, routes, and database connections.
 * 
 * Features:
 * - RESTful API endpoints for all CraftCircle features
 * - JWT-based authentication
 * - MongoDB database integration
 * - File upload handling
 * - Rate limiting and security
 * - Comprehensive error handling
 * - Development and production configurations
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

import { connectDatabase } from '@/config/database';
import { seedDatabase } from '@/config/seedData';
import { errorHandler, notFoundHandler } from '@/middlewares/errorHandler';
import { logger } from '@/utils/logger';

// Import all route modules
import authRoutes from '@/routes/auth';
import userRoutes from '@/routes/users';
import tutorialRoutes from '@/routes/tutorials';
import projectRoutes from '@/routes/projects';
import challengeRoutes from '@/routes/challenges';
import communityRoutes from '@/routes/community';
import partnerRoutes from '@/routes/partners';
import adminRoutes from '@/routes/admin';
import analyticsRoutes from '@/routes/analytics';
import subscriptionRoutes from '@/routes/subscriptions';
import notificationRoutes from '@/routes/notifications';
import uploadRoutes from '@/routes/uploads';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * Security Middleware Configuration
 * 
 * Sets up essential security headers and protections:
 * - Helmet for security headers
 * - CORS for cross-origin requests
 * - Rate limiting to prevent abuse
 */

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api/', limiter);

/**
 * General Middleware Setup
 * 
 * Configures Express.js middleware for:
 * - Request/response compression
 * - JSON/URL parsing
 * - Request logging
 * - Static file serving
 */

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

/**
 * API Routes Configuration
 * 
 * All API endpoints are prefixed with /api and organized by feature:
 * 
 * Authentication & Users:
 * - /api/auth/* - Login, register, password reset
 * - /api/users/* - User profiles, settings, preferences
 * 
 * Content Management:
 * - /api/tutorials/* - Tutorial CRUD operations
 * - /api/projects/* - User projects and project management
 * - /api/challenges/* - DIY challenges and submissions
 * 
 * Community Features:
 * - /api/community/* - Forum posts, comments, interactions
 * - /api/notifications/* - User notifications
 * 
 * Business Features:
 * - /api/partners/* - Partner dashboard and analytics
 * - /api/subscriptions/* - Premium subscriptions and payments
 * - /api/analytics/* - Creator analytics and insights
 * 
 * Administration:
 * - /api/admin/* - Admin dashboard and moderation tools
 * 
 * File Management:
 * - /api/uploads/* - File upload handling
 */

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tutorials', tutorialRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/uploads', uploadRoutes);

/**
 * Error Handling
 * 
 * Centralized error handling for:
 * - 404 Not Found errors
 * - Application errors
 * - Database errors
 * - Validation errors
 */

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

/**
 * Server Startup with Database Seeding
 */
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase();
    logger.info('Database connected successfully');

    // Seed database with dummy data (only if empty)
    if (process.env.NODE_ENV === 'development') {
      await seedDatabase();
    }

    // Start the server
    const server = app.listen(PORT, () => {
      logger.info(`CraftCircle API Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Health check: http://localhost:${PORT}/api/health`);
      
      if (process.env.NODE_ENV === 'development') {
        logger.info('\n=== DUMMY USER CREDENTIALS ===');
        logger.info('Regular User: user@example.com / password123');
        logger.info('Creator: creator@example.com / password123');
        logger.info('Partner: partner@example.com / password123');
        logger.info('Admin: admin@example.com / password123');
        logger.info('===============================\n');
      }
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully');
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;
