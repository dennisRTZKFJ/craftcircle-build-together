
/**
 * Comment Model
 * 
 * Defines the MongoDB schema for comments on posts, tutorials, and challenges.
 */

import mongoose, { Schema } from 'mongoose';
import { IForumReply } from '@/types';

const commentSchema = new Schema<IForumReply>({
  thread: {
    type: Schema.Types.ObjectId,
    refPath: 'threadModel',
    required: true
  },
  threadModel: {
    type: String,
    required: true,
    enum: ['CommunityPost', 'Tutorial', 'Challenge', 'Project']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  parentReply: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  isSolution: {
    type: Boolean,
    default: false
  },
  isModerated: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
commentSchema.index({ thread: 1, threadModel: 1 });
commentSchema.index({ author: 1 });
commentSchema.index({ parentReply: 1 });

const Comment = mongoose.model<IForumReply>('Comment', commentSchema);

export default Comment;
