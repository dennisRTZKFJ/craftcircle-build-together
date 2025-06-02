
/**
 * Database Configuration
 * 
 * Handles MongoDB connection setup using Mongoose.
 * Includes connection options, error handling, and environment-specific configurations.
 */

import mongoose from 'mongoose';
import { logger } from '@/utils/logger';

/**
 * Connect to MongoDB Database
 * 
 * Establishes connection to MongoDB using the URI from environment variables.
 * Includes retry logic and proper error handling.
 * 
 * @returns Promise<void>
 */
export async function connectDatabase(): Promise<void> {
  try {
    const mongoUri = process.env.NODE_ENV === 'test' 
      ? process.env.MONGODB_TEST_URI 
      : process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MongoDB URI not found in environment variables');
    }

    // Connection options for production optimization
    const options = {
      maxPoolSize: 10, // Maximum number of connections in the connection pool
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    };

    await mongoose.connect(mongoUri, options);

    logger.info(`MongoDB connected: ${mongoose.connection.name}`);

    // Connection event handlers
    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB Database
 * 
 * Gracefully closes the database connection.
 * Used during application shutdown or testing cleanup.
 * 
 * @returns Promise<void>
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected successfully');
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}

/**
 * Clear Database (Test Helper)
 * 
 * Removes all data from the database.
 * Only available in test environment for safety.
 * 
 * @returns Promise<void>
 */
export async function clearDatabase(): Promise<void> {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('clearDatabase can only be used in test environment');
  }

  try {
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
      const collection = collections[key];
      if (collection) {
        await collection.deleteMany({});
      }
    }
    
    logger.info('Test database cleared');
  } catch (error) {
    logger.error('Error clearing test database:', error);
    throw error;
  }
}
