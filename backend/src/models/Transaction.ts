
/**
 * Transaction Model
 * 
 * Defines the MongoDB schema for financial transactions including subscriptions and purchases.
 */

import mongoose, { Schema } from 'mongoose';

export interface ITransaction extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  transactionId: string;
  transactionDate: Date;
  totalPrice: number;
  transactionType: 'SUBSCRIPTION' | 'PURCHASE';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  paymentMethod: string;
  description: string;
}

const transactionSchema = new Schema<ITransaction>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  transactionType: {
    type: String,
    enum: ['SUBSCRIPTION', 'PURCHASE'],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
    default: 'PENDING'
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
transactionSchema.index({ user: 1 });
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ transactionType: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ transactionDate: -1 });

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
