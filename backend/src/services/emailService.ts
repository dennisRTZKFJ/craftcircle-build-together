
/**
 * Email Service
 * 
 * Handles sending emails for various purposes:
 * - Welcome emails
 * - Password reset emails
 * - Notification emails
 * - Newsletter emails
 */

import nodemailer from 'nodemailer';
import { EmailOptions } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Email transporter configuration
 * 
 * Uses nodemailer to send emails via SMTP.
 * Configure your email provider settings in environment variables.
 */
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Email Templates
 * 
 * Simple HTML email templates for different purposes.
 * In production, you might want to use a template engine or service.
 */
const emailTemplates = {
  welcome: (data: any) => ({
    subject: 'Welcome to CraftCircle!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B4513;">Welcome to CraftCircle, ${data.name}!</h1>
        <p>Thank you for joining our DIY community. We're excited to have you on board!</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Explore our tutorial library</li>
          <li>Start your first DIY project</li>
          <li>Join community challenges</li>
          <li>Connect with other makers</li>
        </ul>
        <p>Happy crafting!</p>
        <p>The CraftCircle Team</p>
      </div>
    `
  }),
  
  passwordReset: (data: any) => ({
    subject: 'Reset Your CraftCircle Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B4513;">Password Reset Request</h1>
        <p>Hi ${data.name},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetUrl}" 
             style="background-color: #8B4513; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>The CraftCircle Team</p>
      </div>
    `
  }),
  
  notification: (data: any) => ({
    subject: data.title,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8B4513;">${data.title}</h1>
        <p>${data.message}</p>
        ${data.actionUrl ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.actionUrl}" 
               style="background-color: #8B4513; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              View Details
            </a>
          </div>
        ` : ''}
        <p>The CraftCircle Team</p>
      </div>
    `
  })
};

/**
 * Send Email Function
 * 
 * Sends an email using the configured transporter and template.
 * 
 * @param options - Email options including recipient, template, and data
 */
export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    // Check if email is configured
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
      logger.warn('Email service not configured, skipping email send');
      return;
    }
    
    const transporter = createTransporter();
    const template = emailTemplates[options.template as keyof typeof emailTemplates];
    
    if (!template) {
      throw new Error(`Email template '${options.template}' not found`);
    }
    
    const { subject, html } = template(options.data);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject || subject,
      html
    };
    
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Email sent successfully to ${options.to}`, {
      messageId: result.messageId,
      template: options.template
    });
    
  } catch (error) {
    logger.error('Failed to send email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      recipient: options.to,
      template: options.template
    });
    throw error;
  }
};

/**
 * Send Bulk Emails Function
 * 
 * Sends emails to multiple recipients.
 * Includes rate limiting to avoid overwhelming the email service.
 * 
 * @param recipients - Array of email addresses
 * @param template - Email template name
 * @param data - Template data
 * @param delay - Delay between emails in milliseconds (default: 1000)
 */
export const sendBulkEmails = async (
  recipients: string[],
  template: string,
  data: any,
  delay: number = 1000
): Promise<void> => {
  for (const recipient of recipients) {
    try {
      await sendEmail({
        to: recipient,
        subject: '',
        template,
        data
      });
      
      // Add delay to avoid rate limiting
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
    } catch (error) {
      logger.error(`Failed to send email to ${recipient}:`, error);
      // Continue with next recipient
    }
  }
};

/**
 * Test Email Configuration
 * 
 * Sends a test email to verify the email service is working.
 * Useful for setup and debugging.
 */
export const testEmailConfig = async (testEmail: string): Promise<boolean> => {
  try {
    await sendEmail({
      to: testEmail,
      subject: 'CraftCircle Email Test',
      template: 'notification',
      data: {
        title: 'Email Configuration Test',
        message: 'If you receive this email, your email configuration is working correctly!'
      }
    });
    return true;
  } catch (error) {
    logger.error('Email configuration test failed:', error);
    return false;
  }
};
