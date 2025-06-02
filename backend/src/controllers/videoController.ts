
/**
 * Video Controller
 * 
 * Handles video content management for tutorials and projects.
 */

import { Request, Response } from 'express';
import Video from '@/models/Video';
import ViewPost from '@/models/ViewPost';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get videos with filtering and pagination
 * GET /api/videos
 */
export const getVideos = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '12',
      uploader,
      project,
      tutorial
    } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = {};
    
    if (uploader) {
      filter.uploader = uploader;
    }
    
    if (project) {
      filter.associatedProject = project;
    }
    
    if (tutorial) {
      filter.associatedTutorial = tutorial;
    }

    const [videos, total] = await Promise.all([
      Video.find(filter)
        .populate('uploader', 'name avatar')
        .populate('associatedProject', 'title')
        .populate('associatedTutorial', 'title')
        .sort({ uploadDate: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Video.countDocuments(filter)
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'Videos retrieved successfully',
      data: videos,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get videos error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve videos',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get single video by ID
 * GET /api/videos/:id
 */
export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id)
      .populate('uploader', 'name avatar bio')
      .populate('associatedProject', 'title description')
      .populate('associatedTutorial', 'title description')
      .lean();

    if (!video) {
      const response: ApiResponse = {
        success: false,
        message: 'Video not found'
      };
      return res.status(404).json(response);
    }

    // Increment view count
    await Video.findByIdAndUpdate(id, { $inc: { views: 1 } });

    const response: ApiResponse = {
      success: true,
      message: 'Video retrieved successfully',
      data: video
    };

    res.json(response);

  } catch (error) {
    logger.error('Get video error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve video',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Upload new video
 * POST /api/videos
 */
export const uploadVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const videoData = {
      ...req.body,
      uploader: req.userId,
      uploadDate: new Date()
    };

    const video = new Video(videoData);
    await video.save();
    await video.populate('uploader', 'name avatar');

    const response: ApiResponse = {
      success: true,
      message: 'Video uploaded successfully',
      data: video
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Upload video error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to upload video',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Update video
 * PUT /api/videos/:id
 */
export const updateVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const video = await Video.findOneAndUpdate(
      { _id: id, uploader: req.userId }, // Ensure user can only update their own videos
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate('uploader', 'name avatar');

    if (!video) {
      const response: ApiResponse = {
        success: false,
        message: 'Video not found or unauthorized'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Video updated successfully',
      data: video
    };

    res.json(response);

  } catch (error) {
    logger.error('Update video error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update video',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Delete video
 * DELETE /api/videos/:id
 */
export const deleteVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const video = await Video.findOneAndDelete({
      _id: id,
      uploader: req.userId // Ensure user can only delete their own videos
    });

    if (!video) {
      const response: ApiResponse = {
        success: false,
        message: 'Video not found or unauthorized'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Video deleted successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Delete video error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to delete video',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Like/unlike video
 * POST /api/videos/:id/like
 */
export const likeVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // In a production app, you'd track who liked what to prevent double-liking
    // For now, just increment the counter
    await Video.findByIdAndUpdate(id, { $inc: { likes: 1 } });

    const response: ApiResponse = {
      success: true,
      message: 'Video liked successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Like video error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to like video',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get video statistics (creator/admin only)
 * GET /api/videos/:id/stats
 */
export const getVideoStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) {
      const response: ApiResponse = {
        success: false,
        message: 'Video not found'
      };
      return res.status(404).json(response);
    }

    // Get detailed analytics (mock implementation)
    const stats = {
      totalViews: video.views,
      totalLikes: video.likes,
      engagementRate: video.views > 0 ? (video.likes / video.views * 100).toFixed(2) : 0,
      averageWatchTime: Math.floor(video.duration * 0.7), // Mock average watch time
      demographics: {
        // Mock demographic data
        ageGroups: {
          '18-24': 30,
          '25-34': 45,
          '35-44': 20,
          '45+': 5
        },
        countries: {
          'US': 40,
          'UK': 20,
          'CA': 15,
          'AU': 10,
          'Other': 15
        }
      }
    };

    const response: ApiResponse = {
      success: true,
      message: 'Video statistics retrieved successfully',
      data: stats
    };

    res.json(response);

  } catch (error) {
    logger.error('Get video stats error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve video statistics',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
