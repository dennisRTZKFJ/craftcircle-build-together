
/**
 * Type Definitions for CraftCircle API
 * 
 * Centralized type definitions used across the backend application.
 * These types ensure type safety and consistency across all modules.
 */

import { Request } from 'express';
import { Document, Types } from 'mongoose';

/**
 * User-related Types
 */
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'creator' | 'partner' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  preferences: {
    emailNotifications: boolean;
    browserNotifications: boolean;
    marketingEmails: boolean;
    showProfile: boolean;
    showProjects: boolean;
  };
  subscription?: {
    plan: 'free' | 'premium';
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate?: Date;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
  };
  stats: {
    tutorialsCreated: number;
    projectsCompleted: number;
    totalViews: number;
    totalEarnings: number;
  };
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Tutorial-related Types
 */
export interface ITutorial extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  author: Types.ObjectId;
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  materials: IMaterial[];
  tools: ITool[];
  steps: IStep[];
  status: 'draft' | 'published' | 'archived' | 'pending_review';
  isPremium: boolean;
  stats: {
    views: number;
    likes: number;
    dislikes: number;
    favorites: number;
    completions: number;
    averageRating: number;
    totalRatings: number;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMaterial {
  name: string;
  quantity: number;
  unit: string;
  cost?: number;
  where_to_buy?: string;
  amazon_link?: string;
}

export interface ITool {
  name: string;
  required: boolean;
  alternative?: string;
}

export interface IStep {
  stepNumber: number;
  title: string;
  description: string;
  image?: string;
  video?: string;
  duration?: number;
  tips?: string[];
}

/**
 * Project-related Types
 */
export interface IProject extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  user: Types.ObjectId;
  tutorial?: Types.ObjectId;
  status: 'COMPLETED' | 'PLANNED' | 'IN_PROGRESS' | 'ABANDONED';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  tags: string[];
  images: string[];
  materials: IMaterial[];
  tools: ITool[];
  progress: {
    currentStep: number;
    totalSteps: number;
    completedSteps: number[];
    percentage: number;
  };
  timeTracking: {
    estimatedHours: number;
    actualHours: number;
    sessions: ITimeSession[];
  };
  budget: {
    estimated: number;
    actual: number;
    currency: string;
  };
  notes: string;
  isPublic: boolean;
  likes: number;
  views: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITimeSession {
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  notes?: string;
}

/**
 * Challenge-related Types
 */
export interface IChallenge extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration: number; // in days
  thumbnail: string;
  images: string[];
  requirements: string[];
  prizes: string[];
  rules: string[];
  startDate: Date;
  endDate: Date;
  maxParticipants?: number;
  submissionDeadline: Date;
  votingDeadline: Date;
  status: 'upcoming' | 'active' | 'voting' | 'completed' | 'cancelled';
  creator: Types.ObjectId;
  judges: Types.ObjectId[];
  stats: {
    participants: number;
    submissions: number;
    totalVotes: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IChallengeSubmission extends Document {
  _id: Types.ObjectId;
  challenge: Types.ObjectId;
  user: Types.ObjectId;
  registrationDate: Date;
  region?: string;
  winner: boolean;
  title?: string;
  description?: string;
  images: string[];
  videoUrl?: string;
  materials: IMaterial[];
  timeSpent?: number; // in hours
  difficulty?: number; // 1-5 scale
  isPublic: boolean;
  votes: number;
  comments: Types.ObjectId[];
  rank?: number;
  prize?: string;
  submittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Community-related Types
 */
export interface IForumThread extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  category: string;
  tags: string[];
  status: 'open' | 'closed' | 'solved' | 'pinned';
  isPinned: boolean;
  isSolved: boolean;
  solutionReply?: Types.ObjectId;
  stats: {
    views: number;
    replies: number;
    likes: number;
    lastActivity: Date;
  };
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IForumReply extends Document {
  _id: Types.ObjectId;
  thread: Types.ObjectId;
  threadModel: string;
  author: Types.ObjectId;
  content: string;
  parentReply?: Types.ObjectId; // for nested replies
  isSolution: boolean;
  isModerated: boolean;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * New UML-based Types
 */
export interface ISubscription extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  type: 'FREE' | 'YEARLY';
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  price: number;
  nextPaymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  transactionId: string;
  transactionDate: Date;
  totalPrice: number;
  transactionType: 'SUBSCRIPTION' | 'PURCHASE';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  paymentMethod: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentInformation extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  addedDate: Date;
  stripeId: string;
  automaticPaymentMethod: boolean;
  paymentMethod: string;
  statusFromStripe: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedProject extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  project: Types.ObjectId;
  savedDate: Date;
  progress: 'COMPLETED' | 'PLANNED' | 'IN_PROGRESS' | 'ABANDONED';
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideo extends Document {
  _id: Types.ObjectId;
  title: string;
  url: string;
  uploadDate: Date;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  associatedProject?: Types.ObjectId;
  associatedTutorial?: Types.ObjectId;
  uploader: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInstructionStep extends Document {
  _id: Types.ObjectId;
  tutorial: Types.ObjectId;
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IViewPost extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  post: Types.ObjectId;
  viewDate: Date;
  sessionDuration?: number; // in seconds
  deviceType?: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContentCreator extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  creatorRating: number;
  bio?: string;
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
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Notification-related Types
 */
export interface INotification extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  type: 'tutorial_like' | 'comment' | 'follow' | 'challenge_winner' | 'subscription' | 'system';
  title: string;
  message: string;
  data?: any; // Additional data based on notification type
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Analytics-related Types
 */
export interface IAnalytics extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  type: 'view' | 'like' | 'comment' | 'completion' | 'share';
  resource: 'tutorial' | 'project' | 'challenge' | 'profile';
  resourceId: Types.ObjectId;
  metadata: {
    userAgent?: string;
    referrer?: string;
    country?: string;
    device?: string;
  };
  createdAt: Date;
}

/**
 * Express Request Extensions
 */
export interface AuthenticatedRequest extends Request {
  user?: IUser;
  userId?: string;
}

/**
 * API Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * Query Parameters
 */
export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface SearchQuery extends PaginationQuery {
  q?: string;
  category?: string;
  difficulty?: string;
  tags?: string;
  author?: string;
  status?: string;
  type?: string;
}

/**
 * File Upload Types
 */
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

/**
 * Email Types
 */
export interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: any;
}

/**
 * Validation Error Types
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

/**
 * Badge Types (from UML)
 */
export type BadgeType = 
  | 'BEGINNER'
  | 'UPCYCLING_FAN'
  | 'DESIGN_TALENT'
  | 'WOOD_EXPERT'
  | 'CHALLENGE_WINNER'
  | 'PRO_CRAFTSMAN'
  | 'INNOVATOR'
  | 'SUSTAINABILITY_CHAMPION';

export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type ProjectCategory = 
  | 'FURNITURE_BUILDING'
  | 'DECORATION'
  | 'RENOVATION'
  | 'KIDS_FURNITURE'
  | 'OUTDOOR'
  | 'ORGANISATION'
  | 'UPCYCLING'
  | 'ART';

export type PostType = 'PUBLISHED' | 'COMMENTED' | 'POSTED' | 'PARTICIPATED';

export type Progress = 'COMPLETED' | 'PLANNED' | 'IN_PROGRESS' | 'ABANDONED';

export type SubscriptionType = 'FREE' | 'YEARLY';

export type TransactionType = 'SUBSCRIPTION' | 'PURCHASE';
