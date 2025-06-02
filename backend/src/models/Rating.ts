
/**
 * Rating Model
 * 
 * Defines the MongoDB schema for user ratings on tutorials, challenges, etc.
 */

import mongoose, { Schema } from 'mongoose';

export interface IRating extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  target: mongoose.Types.ObjectId;
  targetModel: string;
  stars: number;
  ratingDate: Date;
}

const ratingSchema = new Schema<IRating>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  target: {
    type: Schema.Types.ObjectId,
    refPath: 'targetModel',
    required: true
  },
  targetModel: {
    type: String,
    required: true,
    enum: ['Tutorial', 'Challenge', 'Project']
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  ratingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate ratings
ratingSchema.index({ user: 1, target: 1, targetModel: 1 }, { unique: true });

const Rating = mongoose.model<IRating>('Rating', ratingSchema);

export default Rating;
