
import mongoose, { Schema } from 'mongoose';
import { ITutorial, IMaterial, ITool, IInstructionStep } from '../types/tutorial.types';

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

const instructionStepSchema = new Schema<IInstructionStep>({
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
  tip: {
    type: String,
    maxlength: [500, 'Tip cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  }
}, { _id: false });

const tutorialContentSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['furniture-building', 'storage', 'decoration', 'outdoor', 'upcycling']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 hour']
  },
  availability: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  price: String,
  tools: [String],
  recommendations: String,
  estimatedCostLow: String,
  estimatedCostHigh: String,
  videoDescription: String,
  sections: [{
    id: Number,
    title: String,
    content: String,
    imageUrl: String
  }]
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
  content: tutorialContentSchema,
  materials: [materialSchema],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  revenue: String,
  image: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
tutorialSchema.index({ title: 'text', description: 'text' });
tutorialSchema.index({ status: 1 });
tutorialSchema.index({ createdAt: -1 });
tutorialSchema.index({ views: -1 });
tutorialSchema.index({ likes: -1 });

// Virtual for estimated cost
tutorialSchema.virtual('estimatedCost').get(function() {
  return this.materials.reduce((total, material) => {
    return total + (material.cost || 0) * material.quantity;
  }, 0);
});

const Tutorial = mongoose.model<ITutorial>('Tutorial', tutorialSchema);

export default Tutorial;
