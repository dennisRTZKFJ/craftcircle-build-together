
/**
 * Challenge Model
 * 
 * Defines the MongoDB schema for DIY challenges.
 */

import mongoose, { Schema } from 'mongoose';
import { IChallenge } from '@/types';

const challengeSchema = new Schema<IChallenge>({
  title: {
    type: String,
    required: [true, 'Challenge title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Challenge description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'FURNITURE_BUILDING', 'DECORATION', 'RENOVATION', 'KIDS_FURNITURE',
      'OUTDOOR', 'ORGANISATION', 'UPCYCLING', 'ART'
    ]
  },
  difficulty: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    required: true
  },
  duration: {
    type: Number,
    required: true // in days
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: [String],
  requirements: [String],
  prizes: [String],
  rules: [String],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  maxParticipants: Number,
  submissionDeadline: {
    type: Date,
    required: true
  },
  votingDeadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'voting', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  judges: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  stats: {
    participants: { type: Number, default: 0 },
    submissions: { type: Number, default: 0 },
    totalVotes: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes
challengeSchema.index({ status: 1 });
challengeSchema.index({ category: 1 });
challengeSchema.index({ startDate: 1 });
challengeSchema.index({ endDate: 1 });

const Challenge = mongoose.model<IChallenge>('Challenge', challengeSchema);

export default Challenge;
