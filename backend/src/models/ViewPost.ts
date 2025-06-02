
/**
 * View Post Model
 * 
 * Defines the MongoDB schema for tracking post views and analytics.
 */

import mongoose, { Schema } from 'mongoose';

export interface IViewPost extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  viewDate: Date;
  sessionDuration?: number; // in seconds
  deviceType?: string;
  ipAddress?: string;
}

const viewPostSchema = new Schema<IViewPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'CommunityPost',
    required: true
  },
  viewDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  sessionDuration: {
    type: Number,
    min: 0 // in seconds
  },
  deviceType: {
    type: String,
    trim: true
  },
  ipAddress: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for analytics and preventing duplicate views
viewPostSchema.index({ user: 1, post: 1, viewDate: 1 });
viewPostSchema.index({ post: 1 });
viewPostSchema.index({ viewDate: -1 });

const ViewPost = mongoose.model<IViewPost>('ViewPost', viewPostSchema);

export default ViewPost;
