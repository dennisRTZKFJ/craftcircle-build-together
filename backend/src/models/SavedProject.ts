
/**
 * Saved Project Model
 * 
 * Defines the MongoDB schema for user's saved/bookmarked projects.
 */

import mongoose, { Schema } from 'mongoose';

export interface ISavedProject extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  savedDate: Date;
  progress: 'COMPLETED' | 'PLANNED' | 'IN_PROGRESS' | 'ABANDONED';
}

const savedProjectSchema = new Schema<ISavedProject>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  savedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  progress: {
    type: String,
    enum: ['COMPLETED', 'PLANNED', 'IN_PROGRESS', 'ABANDONED'],
    default: 'PLANNED'
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate saves
savedProjectSchema.index({ user: 1, project: 1 }, { unique: true });

const SavedProject = mongoose.model<ISavedProject>('SavedProject', savedProjectSchema);

export default SavedProject;
