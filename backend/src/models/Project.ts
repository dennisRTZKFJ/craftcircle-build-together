
/**
 * Project Model
 * 
 * Defines the MongoDB schema for user projects based on tutorials.
 */

import mongoose, { Schema } from 'mongoose';
import { IProject, ITimeSession } from '@/types';

const timeSessionSchema = new Schema<ITimeSession>({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  notes: String
}, { _id: false });

const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  tutorial: {
    type: Schema.Types.ObjectId,
    ref: 'Tutorial'
  },
  status: {
    type: String,
    enum: ['COMPLETED', 'PLANNED', 'IN_PROGRESS', 'ABANDONED'],
    default: 'PLANNED'
  },
  difficulty: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [String],
  images: [String],
  materials: [{
    name: String,
    quantity: Number,
    unit: String,
    cost: Number
  }],
  tools: [{
    name: String,
    required: Boolean,
    alternative: String
  }],
  progress: {
    currentStep: { type: Number, default: 0 },
    totalSteps: { type: Number, default: 0 },
    completedSteps: [Number],
    percentage: { type: Number, default: 0 }
  },
  timeTracking: {
    estimatedHours: Number,
    actualHours: Number,
    sessions: [timeSessionSchema]
  },
  budget: {
    estimated: Number,
    actual: Number,
    currency: { type: String, default: 'USD' }
  },
  notes: String,
  isPublic: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  completedAt: Date
}, {
  timestamps: true
});

// Indexes
projectSchema.index({ user: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ isPublic: 1 });

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
