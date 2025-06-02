
/**
 * Video Model
 * 
 * Defines the MongoDB schema for video content associated with tutorials and projects.
 */

import mongoose, { Schema } from 'mongoose';

export interface IVideo extends mongoose.Document {
  title: string;
  url: string;
  uploadDate: Date;
  description: string;
  thumbnail: string;
  duration: number; // in seconds
  views: number;
  likes: number;
  associatedProject?: mongoose.Types.ObjectId;
  associatedTutorial?: mongoose.Types.ObjectId;
  uploader: mongoose.Types.ObjectId;
}

const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  url: {
    type: String,
    required: [true, 'Video URL is required'],
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  description: {
    type: String,
    required: [true, 'Video description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  thumbnail: {
    type: String,
    required: [true, 'Video thumbnail is required']
  },
  duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 second']
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  associatedProject: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  associatedTutorial: {
    type: Schema.Types.ObjectId,
    ref: 'Tutorial'
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
videoSchema.index({ uploader: 1 });
videoSchema.index({ associatedProject: 1 });
videoSchema.index({ associatedTutorial: 1 });
videoSchema.index({ uploadDate: -1 });
videoSchema.index({ views: -1 });

const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video;
