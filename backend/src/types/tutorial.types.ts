
import { Document, Types } from 'mongoose';

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

export interface IInstructionStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
  imageUrl?: string;
}

export interface ITutorialContent {
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  availability: 'free' | 'premium';
  price?: string;
  tools: string[];
  recommendations?: string;
  estimatedCostLow?: string;
  estimatedCostHigh?: string;
  videoDescription?: string;
  sections: Array<{
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
  }>;
}

export interface ITutorial extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  content?: ITutorialContent;
  materials: IMaterial[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  likes: number;
  comments: number;
  revenue?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTutorialRequest {
  title: string;
  description: string;
  content?: ITutorialContent;
  materials?: IMaterial[];
  status?: 'draft' | 'published';
}

export interface UpdateTutorialRequest {
  title?: string;
  description?: string;
  content?: ITutorialContent;
  materials?: IMaterial[];
  status?: 'draft' | 'published' | 'archived';
}
