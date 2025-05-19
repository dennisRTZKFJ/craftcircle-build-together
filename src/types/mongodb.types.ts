
/**
 * Type definitions for MongoDB document interfaces
 * These help with proper typing when working with MongoDB documents
 */

// Base MongoDB document interface
export interface MongoDocument {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

// User document in MongoDB
export interface MongoUser extends MongoDocument {
  name: string;
  email: string;
  role: 'diy' | 'creator' | 'partner' | 'admin';
  avatar?: string;
  passwordHash?: string; // Only used on the backend
  refreshTokens?: string[]; // Only used on the backend
}

// Tutorial document in MongoDB
export interface MongoTutorial extends MongoDocument {
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string; // References user _id
  views: number;
  likes: number;
  comments: number;
  revenue?: string;
  date?: string;
  image?: string;
  content?: {
    sections: {
      title: string;
      content: string;
      imageUrl?: string;
    }[];
  };
  materials?: {
    name: string;
    quantity: number;
    unit: string;
    optional: boolean;
  }[];
  tags?: string[];
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

// Project document in MongoDB
export interface MongoProject extends MongoDocument {
  name: string;
  description?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'abandoned' | 'new';
  userId: string; // References user _id
  tutorialId?: string; // Optional, if based on a tutorial
  image?: string;
  materials?: {
    name: string;
    quantity: number;
    unit: string;
    acquired: boolean;
  }[];
  steps?: {
    title: string;
    description: string;
    completed: boolean;
    imageUrl?: string;
  }[];
}

// Comment document in MongoDB
export interface MongoComment extends MongoDocument {
  tutorialId: string; // References tutorial _id
  userId: string; // References user _id
  text: string;
  likes: number;
}

// Subscription document in MongoDB
export interface MongoSubscription extends MongoDocument {
  userId: string; // References user _id
  status: 'active' | 'canceled' | 'past_due' | 'inactive';
  plan: 'monthly' | 'yearly' | 'free';
  renewalDate?: string;
  paymentMethodId?: string;
  trialEnds?: string;
}

// Payment Method document in MongoDB
export interface MongoPaymentMethod extends MongoDocument {
  userId: string; // References user _id
  type: 'card' | 'paypal';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
  isDefault: boolean;
  tokenizedData?: string; // Encrypted token, only used on backend
}

// Transaction document in MongoDB
export interface MongoTransaction extends MongoDocument {
  userId: string; // References user _id
  type: 'payment' | 'income' | 'refund';
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethodId?: string;
  subscriptionId?: string;
}
