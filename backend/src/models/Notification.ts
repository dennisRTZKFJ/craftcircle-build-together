
/**
 * Notification Model
 * 
 * Defines the MongoDB schema for user notifications and system messages.
 */

import mongoose, { Schema } from 'mongoose';

export interface INotification extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  type: 'tutorial_like' | 'comment' | 'follow' | 'challenge_winner' | 'subscription' | 'system';
  title: string;
  message: string;
  data?: any; // Additional data based on notification type
  isRead: boolean;
  actionUrl?: string;
}

const notificationSchema = new Schema<INotification>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['tutorial_like', 'comment', 'follow', 'challenge_winner', 'subscription', 'system'],
    required: true
  },
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  data: {
    type: Schema.Types.Mixed // Flexible data storage for notification-specific information
  },
  isRead: {
    type: Boolean,
    default: false
  },
  actionUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;
