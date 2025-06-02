
/**
 * User Model
 * 
 * Defines the MongoDB schema for user accounts in the CraftCircle platform.
 * Handles user authentication, profile information, preferences, and statistics.
 */

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '@/types';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'creator', 'partner', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  socialLinks: {
    instagram: {
      type: String,
      match: [/^https?:\/\/(www\.)?instagram\.com\/.+/, 'Please enter a valid Instagram URL']
    },
    youtube: {
      type: String,
      match: [/^https?:\/\/(www\.)?youtube\.com\/.+/, 'Please enter a valid YouTube URL']
    },
    tiktok: {
      type: String,
      match: [/^https?:\/\/(www\.)?tiktok\.com\/.+/, 'Please enter a valid TikTok URL']
    }
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    browserNotifications: {
      type: Boolean,
      default: true
    },
    marketingEmails: {
      type: Boolean,
      default: false
    },
    showProfile: {
      type: Boolean,
      default: true
    },
    showProjects: {
      type: Boolean,
      default: true
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String
  },
  stats: {
    tutorialsCreated: {
      type: Number,
      default: 0
    },
    projectsCompleted: {
      type: Number,
      default: 0
    },
    totalViews: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLoginAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();
  
  try {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Instance method to generate password reset token
userSchema.methods.generatePasswordResetToken = function(): string {
  const resetToken = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
  
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
  
  return resetToken;
};

// Virtual for full name (if needed)
userSchema.virtual('displayName').get(function() {
  return this.name || this.email.split('@')[0];
});

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
