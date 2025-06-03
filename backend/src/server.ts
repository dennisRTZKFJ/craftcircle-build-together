
/**
 * CraftCircle Backend Server
 * 
 * Main Express.js server setup with MongoDB connection,
 * middleware configuration, and route registration.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { connectDatabase } from '@/config/database';
import { errorHandler } from '@/middlewares/errorHandler';
import { logger } from '@/utils/logger';

// Import routes
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
import transactionRoutes from '@/routes/transactions';
import paymentRoutes from '@/routes/payments';
import videoRoutes from '@/routes/videos';

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Security Middleware
 */
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

/**
 * Rate Limiting
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

/**
 * CORS Configuration
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

/**
 * Body Parsing Middleware
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/**
 * Compression Middleware
 */
app.use(compression());

/**
 * Logging Middleware
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

/**
 * Health Check Endpoint
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

/**
 * API Routes Registration
 */
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
app.use('/api/transactions', transactionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/videos', videoRoutes);

/**
 * 404 Handler for undefined routes
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: 'Not Found'
  });
});

/**
 * Global Error Handler
 */
app.use(errorHandler);

/**
 * Database Connection and Server Startup
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    logger.info('Connected to MongoDB successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`
🚀 CraftCircle Backend Server Started Successfully!

📱 Environment: ${process.env.NODE_ENV || 'development'}
🌐 Server running on: http://localhost:${PORT}
📊 Health check: http://localhost:${PORT}/health
📚 API Base URL: http://localhost:${PORT}/api

🔗 Available Endpoints:
   • Authentication: /api/auth
   • Users: /api/users  
   • Tutorials: /api/tutorials
   • Projects: /api/projects
   • Challenges: /api/challenges
   • Community: /api/community
   • Partners: /api/partners
   • Admin: /api/admin
   • Analytics: /api/analytics
   • Subscriptions: /api/subscriptions
   • Notifications: /api/notifications
   • Uploads: /api/uploads
   • Transactions: /api/transactions
   • Payments: /api/payments
   • Videos: /api/videos

💡 Ready to handle requests!
      `);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();

export default app;
