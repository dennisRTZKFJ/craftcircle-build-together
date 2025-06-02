
/**
 * Subscription Model
 * 
 * Defines the MongoDB schema for user subscriptions and payment plans.
 */

import mongoose, { Schema } from 'mongoose';

export interface ISubscription extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  type: 'FREE' | 'YEARLY';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  price: number;
  nextPaymentDate: Date;
}

const subscriptionSchema = new Schema<ISubscription>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One subscription per user
  },
  type: {
    type: String,
    enum: ['FREE', 'YEARLY'],
    default: 'FREE',
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date,
    required: function() {
      return this.type === 'YEARLY';
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  nextPaymentDate: {
    type: Date,
    required: function() {
      return this.type === 'YEARLY';
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
subscriptionSchema.index({ user: 1 });
subscriptionSchema.index({ type: 1 });
subscriptionSchema.index({ isActive: 1 });

const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;
