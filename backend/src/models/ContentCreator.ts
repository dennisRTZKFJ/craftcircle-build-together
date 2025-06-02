
/**
 * Content Creator Model
 * 
 * Defines the MongoDB schema for content creator profiles and earnings.
 */

import mongoose, { Schema } from 'mongoose';

export interface IContentCreator extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  creatorRating: number;
  bio: string;
  monthlyEarning: number;
  totalEarning: number;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  socialLinks: {
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
  specialties: string[];
  joinedDate: Date;
}

const contentCreatorSchema = new Schema<IContentCreator>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  creatorRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    trim: true
  },
  monthlyEarning: {
    type: Number,
    default: 0,
    min: 0
  },
  totalEarning: {
    type: Number,
    default: 0,
    min: 0
  },
  verificationStatus: {
    type: String,
    enum: ['PENDING', 'VERIFIED', 'REJECTED'],
    default: 'PENDING'
  },
  socialLinks: {
    youtube: {
      type: String,
      match: [/^https?:\/\/(www\.)?youtube\.com\/.+/, 'Please enter a valid YouTube URL']
    },
    instagram: {
      type: String,
      match: [/^https?:\/\/(www\.)?instagram\.com\/.+/, 'Please enter a valid Instagram URL']
    },
    tiktok: {
      type: String,
      match: [/^https?:\/\/(www\.)?tiktok\.com\/.+/, 'Please enter a valid TikTok URL']
    },
    website: {
      type: String,
      match: [/^https?:\/\/.+/, 'Please enter a valid URL']
    }
  },
  specialties: [{
    type: String,
    trim: true
  }],
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
contentCreatorSchema.index({ user: 1 });
contentCreatorSchema.index({ creatorRating: -1 });
contentCreatorSchema.index({ verificationStatus: 1 });

const ContentCreator = mongoose.model<IContentCreator>('ContentCreator', contentCreatorSchema);

export default ContentCreator;
