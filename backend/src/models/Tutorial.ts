
/**
 * Tutorial Model
 * 
 * Defines the MongoDB schema for DIY tutorials in the CraftCircle platform.
 * Includes content, metadata, materials, tools, steps, and analytics.
 */

import mongoose, { Schema } from 'mongoose';
import { ITutorial, IMaterial, ITool, IStep } from '@/types';

const materialSchema = new Schema<IMaterial>({
  name: {
    type: String,
    required: [true, 'Material name is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Material quantity is required'],
    min: [0, 'Quantity cannot be negative']
  },
  unit: {
    type: String,
    required: [true, 'Material unit is required'],
    trim: true
  },
  cost: {
    type: Number,
    min: [0, 'Cost cannot be negative']
  },
  where_to_buy: String,
  amazon_link: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  }
}, { _id: false });

const toolSchema = new Schema<ITool>({
  name: {
    type: String,
    required: [true, 'Tool name is required'],
    trim: true
  },
  required: {
    type: Boolean,
    default: true
  },
  alternative: String
}, { _id: false });

const stepSchema = new Schema<IStep>({
  stepNumber: {
    type: Number,
    required: [true, 'Step number is required'],
    min: [1, 'Step number must be at least 1']
  },
  title: {
    type: String,
    required: [true, 'Step title is required'],
    trim: true,
    maxlength: [200, 'Step title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Step description is required'],
    maxlength: [2000, 'Step description cannot exceed 2000 characters']
  },
  image: String,
  video: String,
  duration: {
    type: Number,
    min: [0, 'Duration cannot be negative']
  },
  tips: [String]
}, { _id: false });

const tutorialSchema = new Schema<ITutorial>({
  title: {
    type: String,
    required: [true, 'Tutorial title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Tutorial description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  content: {
    type: String,
    required: [true, 'Tutorial content is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'woodworking', 'furniture', 'tools', 'upcycling', 'gardening',
      'electronics', 'textiles', 'metalworking', 'ceramics', 'jewelry',
      'home_improvement', 'storage', 'lighting', 'decoration', 'repairs'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [5, 'Duration must be at least 5 minutes']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required']
  },
  images: [String],
  videoUrl: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid video URL']
  },
  materials: [materialSchema],
  tools: [toolSchema],
  steps: [stepSchema],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'pending_review'],
    default: 'draft'
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  stats: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title cannot exceed 60 characters']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description cannot exceed 160 characters']
    },
    keywords: [String]
  },
  publishedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
tutorialSchema.index({ title: 'text', description: 'text' });
tutorialSchema.index({ author: 1 });
tutorialSchema.index({ category: 1 });
tutorialSchema.index({ difficulty: 1 });
tutorialSchema.index({ status: 1 });
tutorialSchema.index({ isPremium: 1 });
tutorialSchema.index({ publishedAt: -1 });
tutorialSchema.index({ 'stats.views': -1 });
tutorialSchema.index({ 'stats.likes': -1 });
tutorialSchema.index({ tags: 1 });

// Virtual for estimated cost
tutorialSchema.virtual('estimatedCost').get(function() {
  return this.materials.reduce((total, material) => {
    return total + (material.cost || 0) * material.quantity;
  }, 0);
});

// Virtual for total steps
tutorialSchema.virtual('totalSteps').get(function() {
  return this.steps.length;
});

// Virtual for estimated total time
tutorialSchema.virtual('estimatedTotalTime').get(function() {
  const stepTime = this.steps.reduce((total, step) => {
    return total + (step.duration || 0);
  }, 0);
  return stepTime || this.duration;
});

// Middleware to update publishedAt when status changes to published
tutorialSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Static method to get trending tutorials
tutorialSchema.statics.getTrending = function(limit = 10) {
  return this.find({
    status: 'published',
    publishedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
  })
  .sort({ 'stats.views': -1, 'stats.likes': -1 })
  .limit(limit)
  .populate('author', 'name avatar');
};

// Static method to get featured tutorials
tutorialSchema.statics.getFeatured = function(limit = 5) {
  return this.find({
    status: 'published',
    'stats.averageRating': { $gte: 4.0 },
    'stats.totalRatings': { $gte: 10 }
  })
  .sort({ 'stats.averageRating': -1, 'stats.totalRatings': -1 })
  .limit(limit)
  .populate('author', 'name avatar');
};

const Tutorial = mongoose.model<ITutorial>('Tutorial', tutorialSchema);

export default Tutorial;
