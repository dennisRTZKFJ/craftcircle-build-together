
/**
 * Community Post Model
 * 
 * Defines the MongoDB schema for community forum posts.
 */

import mongoose, { Schema } from 'mongoose';
import { IForumThread } from '@/types';

const communityPostSchema = new Schema<IForumThread>({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['PUBLISHED', 'COMMENTED', 'POSTED', 'PARTICIPATED']
  },
  tags: [String],
  status: {
    type: String,
    enum: ['open', 'closed', 'solved', 'pinned'],
    default: 'open'
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isSolved: {
    type: Boolean,
    default: false
  },
  solutionReply: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  stats: {
    views: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    lastActivity: { type: Date, default: Date.now }
  },
  imageUrl: String
}, {
  timestamps: true
});

// Indexes
communityPostSchema.index({ author: 1 });
communityPostSchema.index({ category: 1 });
communityPostSchema.index({ status: 1 });
communityPostSchema.index({ isPinned: -1, 'stats.lastActivity': -1 });

const CommunityPost = mongoose.model<IForumThread>('CommunityPost', communityPostSchema);

export default CommunityPost;
