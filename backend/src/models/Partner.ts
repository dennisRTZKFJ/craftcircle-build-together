
/**
 * Partner Model
 * 
 * Defines the MongoDB schema for business partners.
 */

import mongoose, { Schema } from 'mongoose';

export interface IPartner extends mongoose.Document {
  name: string;
  email: string;
  website: string;
  address: string;
  user: mongoose.Types.ObjectId;
}

const partnerSchema = new Schema<IPartner>({
  name: {
    type: String,
    required: [true, 'Partner name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Partner email is required'],
    unique: true,
    lowercase: true
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  address: {
    type: String,
    required: [true, 'Partner address is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Partner = mongoose.model<IPartner>('Partner', partnerSchema);

export default Partner;
