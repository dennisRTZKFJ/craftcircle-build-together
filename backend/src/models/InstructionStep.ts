
/**
 * Instruction Step Model
 * 
 * Defines the MongoDB schema for detailed instruction steps in tutorials.
 */

import mongoose, { Schema } from 'mongoose';

export interface IInstructionStep extends mongoose.Document {
  tutorial: mongoose.Types.ObjectId;
  stepNumber: number;
  title: string;
  description: string;
  tip: string;
  imageUrl: string;
}

const instructionStepSchema = new Schema<IInstructionStep>({
  tutorial: {
    type: Schema.Types.ObjectId,
    ref: 'Tutorial',
    required: true
  },
  stepNumber: {
    type: Number,
    required: [true, 'Step number is required'],
    min: [1, 'Step number must be at least 1']
  },
  title: {
    type: String,
    required: [true, 'Step title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Step description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  tip: {
    type: String,
    maxlength: [500, 'Tip cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  }
}, {
  timestamps: true
});

// Compound index for tutorial steps ordering
instructionStepSchema.index({ tutorial: 1, stepNumber: 1 }, { unique: true });

const InstructionStep = mongoose.model<IInstructionStep>('InstructionStep', instructionStepSchema);

export default InstructionStep;
