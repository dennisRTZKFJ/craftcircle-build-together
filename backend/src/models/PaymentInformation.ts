
/**
 * Payment Information Model
 * 
 * Defines the MongoDB schema for storing user payment information securely.
 */

import mongoose, { Schema } from 'mongoose';

export interface IPaymentInformation extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  addedDate: Date;
  stripeId: string;
  automaticPaymentMethod: boolean;
  paymentMethod: string;
  statusFromStripe: string;
}

const paymentInformationSchema = new Schema<IPaymentInformation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  addedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  stripeId: {
    type: String,
    required: true,
    trim: true
  },
  automaticPaymentMethod: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  statusFromStripe: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
paymentInformationSchema.index({ user: 1 });
paymentInformationSchema.index({ stripeId: 1 });

const PaymentInformation = mongoose.model<IPaymentInformation>('PaymentInformation', paymentInformationSchema);

export default PaymentInformation;
