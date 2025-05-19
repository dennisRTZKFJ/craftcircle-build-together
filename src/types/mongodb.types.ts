
/**
 * MongoDB document type definitions
 * These types represent the structure of documents in the MongoDB database
 */

// Base MongoDB document with standard fields
export interface MongoDocument {
  _id: string | number;  // MongoDB document ID
  createdAt?: string;    // ISO date string
  updatedAt?: string;    // ISO date string
}

// User document in MongoDB
export interface MongoUser extends MongoDocument {
  name: string;
  email: string;
  role: 'diy' | 'creator' | 'partner' | 'admin';
  avatar?: string;
  passwordHash?: string;  // Not returned to frontend
  emailVerified?: boolean;
  lastLogin?: string;     // ISO date string
}

// Tutorial document in MongoDB
export interface MongoTutorial extends MongoDocument {
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  userId: string;        // Reference to user who created it
  content?: {
    sections: {
      id: number;
      title: string;
      content: string;
      imageUrl?: string;
    }[];
  };
  materials?: {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    optional: boolean;
  }[];
  views?: number;
  likes?: number;
  comments?: number;
  revenue?: string;
  date?: string;
  image?: string;
}

// Project document in MongoDB
export interface MongoProject extends MongoDocument {
  name: string;
  description?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'abandoned' | 'new';
  userId: string;        // Reference to user who created it
  image?: string;
}

// Material document in MongoDB (subdocument or separate collection)
export interface MongoMaterial extends MongoDocument {
  projectId: string | number;
  name: string;
  quantity: number;
  unit: string;
  acquired: boolean;
}

// Project Step document in MongoDB (subdocument or separate collection)
export interface MongoProjectStep extends MongoDocument {
  projectId: string | number;
  title: string;
  description: string;
  completed: boolean;
  imageUrl?: string;
}

// Comment document in MongoDB
export interface MongoComment extends MongoDocument {
  userId: string;
  tutorialId: string | number;
  text: string;
  likes: number;
  user?: {     // Populated field from User collection
    name: string;
    avatar: string;
  };
}

// Subscription document in MongoDB
export interface MongoSubscription extends MongoDocument {
  userId: string;
  status: 'active' | 'canceled' | 'past_due' | 'inactive';
  plan: 'monthly' | 'yearly' | 'free';
  renewalDate?: string;
  paymentProcessorId?: string; // ID from payment processor (e.g. Stripe)
}

// Payment Method document in MongoDB
export interface MongoPaymentMethod extends MongoDocument {
  userId: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
  paymentProcessorId?: string; // ID from payment processor (e.g. Stripe)
}

// Transaction document in MongoDB
export interface MongoTransaction extends MongoDocument {
  userId: string;
  date: string;
  type: 'payment' | 'income' | 'refund';
  description: string;
  amount: string;
  paymentProcessorId?: string; // ID from payment processor (e.g. Stripe)
}

// User Settings document in MongoDB
export interface MongoUserSettings extends MongoDocument {
  userId: string;
  notifications: {
    email: boolean;
    browser: boolean;
  };
  privacy: {
    showProfile: boolean;
    showProjects: boolean;
  };
}
