
/**
 * Challenge Participant Model
 * 
 * Defines the MongoDB schema for challenge participants and submissions.
 */

import mongoose, { Schema } from 'mongoose';
import { IChallengeSubmission } from '@/types';

const challengeParticipantSchema = new Schema<IChallengeSubmission>({
  challenge: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  region: String,
  winner: {
    type: Boolean,
    default: false
  },
  // Submission details
  title: String,
  description: String,
  images: [String],
  videoUrl: String,
  materials: [{
    name: String,
    quantity: Number,
    unit: String,
    cost: Number
  }],
  timeSpent: Number,
  difficulty: {
    type: Number,
    min: 1,
    max: 5
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  votes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  rank: Number,
  prize: String,
  submittedAt: Date
}, {
  timestamps: true
});

// Compound index to prevent duplicate registrations
challengeParticipantSchema.index({ challenge: 1, user: 1 }, { unique: true });

const ChallengeParticipant = mongoose.model<IChallengeSubmission>('ChallengeParticipant', challengeParticipantSchema);

export default ChallengeParticipant;
