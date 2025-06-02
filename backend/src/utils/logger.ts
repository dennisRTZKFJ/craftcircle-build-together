
/**
 * Logger Utility
 * 
 * Centralized logging system for the application.
 * Provides structured logging with different levels and formats.
 */

import fs from 'fs';
import path from 'path';

/**
 * Log levels enum
 */
enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

/**
 * Logger configuration interface
 */
interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  logDirectory: string;
  maxFileSize: number; // in bytes
  maxFiles: number;
}

/**
 * Default logger configuration
 */
const defaultConfig: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableFile: process.env.NODE_ENV === 'production',
  logDirectory: path.join(process.cwd(), 'logs'),
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5
};

/**
 * Logger class
 */
class Logger {
  private config: LoggerConfig;
  private logDirectory: string;

  constructor(config: LoggerConfig = defaultConfig) {
    this.config = config;
    this.logDirectory = config.logDirectory;
    
    if (config.enableFile) {
      this.ensureLogDirectory();
    }
  }

  /**
   * Ensure log directory exists
   */
  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }
  }

  /**
   * Format log message
   */
  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (data) {
      return `${formattedMessage}\n${JSON.stringify(data, null, 2)}`;
    }
    
    return formattedMessage;
  }

  /**
   * Write to log file
   */
  private writeToFile(level: string, message: string, data?: any): void {
    if (!this.config.enableFile) return;

    const logFile = path.join(this.logDirectory, `app-${new Date().toISOString().split('T')[0]}.log`);
    const formattedMessage = this.formatMessage(level, message, data);
    
    try {
      fs.appendFileSync(logFile, formattedMessage + '\n');
      this.rotateLogsIfNeeded(logFile);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  /**
   * Rotate logs if file size exceeds limit
   */
  private rotateLogsIfNeeded(logFile: string): void {
    try {
      const stats = fs.statSync(logFile);
      
      if (stats.size > this.config.maxFileSize) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const rotatedFile = logFile.replace('.log', `-${timestamp}.log`);
        fs.renameSync(logFile, rotatedFile);
        this.cleanupOldLogs();
      }
    } catch (error) {
      console.error('Failed to rotate logs:', error);
    }
  }

  /**
   * Clean up old log files
   */
  private cleanupOldLogs(): void {
    try {
      const files = fs.readdirSync(this.logDirectory)
        .filter(file => file.endsWith('.log'))
        .map(file => ({
          name: file,
          path: path.join(this.logDirectory, file),
          mtime: fs.statSync(path.join(this.logDirectory, file)).mtime
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

      if (files.length > this.config.maxFiles) {
        const filesToDelete = files.slice(this.config.maxFiles);
        filesToDelete.forEach(file => {
          fs.unlinkSync(file.path);
        });
      }
    } catch (error) {
      console.error('Failed to cleanup old logs:', error);
    }
  }

  /**
   * Log message based on level
   */
  private log(level: LogLevel, levelName: string, message: string, data?: any): void {
    if (level > this.config.level) return;

    const formattedMessage = this.formatMessage(levelName, message, data);

    // Console output
    if (this.config.enableConsole) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage);
          break;
        case LogLevel.DEBUG:
          console.debug(formattedMessage);
          break;
      }
    }

    // File output
    this.writeToFile(levelName, message, data);
  }

  /**
   * Log error message
   */
  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, 'error', message, data);
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, 'warn', message, data);
  }

  /**
   * Log info message
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, 'info', message, data);
  }

  /**
   * Log debug message
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, 'debug', message, data);
  }

  /**
   * Log HTTP request
   */
  request(req: any): void {
    const message = `${req.method} ${req.url} - ${req.ip}`;
    this.info(message, {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log database operation
   */
  database(operation: string, collection: string, data?: any): void {
    const message = `Database ${operation} on ${collection}`;
    this.debug(message, data);
  }

  /**
   * Log authentication event
   */
  auth(event: string, userId?: string, data?: any): void {
    const message = `Auth event: ${event}${userId ? ` for user ${userId}` : ''}`;
    this.info(message, { userId, ...data });
  }
}

// Export singleton logger instance
export const logger = new Logger();

// Export Logger class for custom instances
export { Logger, LogLevel, LoggerConfig };
