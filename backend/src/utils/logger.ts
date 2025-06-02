
/**
 * Logging Utility
 * 
 * Provides consistent logging across the application.
 * Includes different log levels and formatting for development vs production.
 */

/**
 * Logger Configuration
 * 
 * Simple logger that outputs to console with timestamps and color coding.
 * In production, you might want to use a more sophisticated logging library
 * like Winston or Pino, and send logs to external services.
 */

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

class Logger {
  private level: LogLevel;
  
  constructor() {
    // Set log level based on environment
    const envLevel = process.env.LOG_LEVEL?.toUpperCase();
    switch (envLevel) {
      case 'ERROR':
        this.level = LogLevel.ERROR;
        break;
      case 'WARN':
        this.level = LogLevel.WARN;
        break;
      case 'INFO':
        this.level = LogLevel.INFO;
        break;
      case 'DEBUG':
        this.level = LogLevel.DEBUG;
        break;
      default:
        this.level = process.env.NODE_ENV === 'production' 
          ? LogLevel.INFO 
          : LogLevel.DEBUG;
    }
  }
  
  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const baseMessage = `[${timestamp}] ${level}: ${message}`;
    
    if (data) {
      if (typeof data === 'object') {
        return `${baseMessage} ${JSON.stringify(data, null, 2)}`;
      }
      return `${baseMessage} ${data}`;
    }
    
    return baseMessage;
  }
  
  private shouldLog(level: LogLevel): boolean {
    return level <= this.level;
  }
  
  error(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage('ERROR', message, data));
    }
  }
  
  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('WARN', message, data));
    }
  }
  
  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage('INFO', message, data));
    }
  }
  
  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage('DEBUG', message, data));
    }
  }
  
  /**
   * Request Logger Middleware
   * 
   * Logs HTTP requests with relevant information.
   */
  requestLogger() {
    return (req: any, res: any, next: any) => {
      const start = Date.now();
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        const message = `${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`;
        
        if (res.statusCode >= 400) {
          this.error(message);
        } else {
          this.info(message);
        }
      });
      
      next();
    };
  }
}

export const logger = new Logger();
