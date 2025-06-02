
/**
 * Tutorial Controller
 * 
 * Handles all tutorial-related operations including CRUD, search, rating, and interactions.
 */

import { Request, Response } from 'express';
import Tutorial from '@/models/Tutorial';
import Rating from '@/models/Rating';
import Comment from '@/models/Comment';
import User from '@/models/User';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';
import { createNotification } from './notificationController';

/**
 * Get paginated list of tutorials with search and filtering
 * GET /api/tutorials
 */
export const getTutorials = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '12',
      category,
      difficulty,
      tags,
      q,
      sort = 'newest'
    } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = { status: 'published' };
    
    if (category) {
      filter.category = category;
    }
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    
    if (tags) {
      const tagArray = tags.split(',').map((tag: string) => tag.trim());
      filter.tags = { $in: tagArray };
    }
    
    if (q) {
      filter.$text = { $search: q };
    }

    // Build sort
    let sortOption: any = { publishedAt: -1 }; // default: newest
    
    switch (sort) {
      case 'popular':
        sortOption = { 'stats.views': -1, 'stats.likes': -1 };
        break;
      case 'rating':
        sortOption = { 'stats.averageRating': -1, 'stats.totalRatings': -1 };
        break;
      case 'oldest':
        sortOption = { publishedAt: 1 };
        break;
    }

    const [tutorials, total] = await Promise.all([
      Tutorial.find(filter)
        .populate('author', 'name avatar')
        .select('title description thumbnail category difficulty duration stats publishedAt')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Tutorial.countDocuments(filter)
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'Tutorials retrieved successfully',
      data: tutorials,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get tutorials error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve tutorials',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get featured tutorials
 * GET /api/tutorials/featured
 */
export const getFeaturedTutorials = async (req: Request, res: Response) => {
  try {
    const tutorials = await Tutorial.getFeatured(5);

    const response: ApiResponse = {
      success: true,
      message: 'Featured tutorials retrieved successfully',
      data: tutorials
    };

    res.json(response);

  } catch (error) {
    logger.error('Get featured tutorials error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve featured tutorials',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get trending tutorials
 * GET /api/tutorials/trending
 */
export const getTrendingTutorials = async (req: Request, res: Response) => {
  try {
    const tutorials = await Tutorial.getTrending(10);

    const response: ApiResponse = {
      success: true,
      message: 'Trending tutorials retrieved successfully',
      data: tutorials
    };

    res.json(response);

  } catch (error) {
    logger.error('Get trending tutorials error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve trending tutorials',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get single tutorial by ID
 * GET /api/tutorials/:id
 */
export const getTutorialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findById(id)
      .populate('author', 'name avatar bio website socialLinks')
      .lean();

    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found'
      };
      return res.status(404).json(response);
    }

    // Increment view count
    await Tutorial.findByIdAndUpdate(id, { $inc: { 'stats.views': 1 } });

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial retrieved successfully',
      data: tutorial
    };

    res.json(response);

  } catch (error) {
    logger.error('Get tutorial error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve tutorial',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Create new tutorial
 * POST /api/tutorials
 */
export const createTutorial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tutorialData = {
      ...req.body,
      author: req.userId,
      stats: {
        views: 0,
        likes: 0,
        dislikes: 0,
        favorites: 0,
        completions: 0,
        averageRating: 0,
        totalRatings: 0
      }
    };

    const tutorial = new Tutorial(tutorialData);
    await tutorial.save();
    await tutorial.populate('author', 'name avatar');

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.tutorialsCreated': 1 }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial created successfully',
      data: tutorial
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Create tutorial error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to create tutorial',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Update tutorial
 * PUT /api/tutorials/:id
 */
export const updateTutorial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findOneAndUpdate(
      { _id: id, author: req.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('author', 'name avatar');

    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found or unauthorized'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial updated successfully',
      data: tutorial
    };

    res.json(response);

  } catch (error) {
    logger.error('Update tutorial error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to update tutorial',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Delete tutorial
 * DELETE /api/tutorials/:id
 */
export const deleteTutorial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findOneAndDelete({
      _id: id,
      author: req.userId
    });

    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found or unauthorized'
      };
      return res.status(404).json(response);
    }

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.tutorialsCreated': -1 }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial deleted successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Delete tutorial error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to delete tutorial',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Like or unlike tutorial
 * POST /api/tutorials/:id/like
 */
export const likeTutorial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findById(id);
    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found'
      };
      return res.status(404).json(response);
    }

    // In a production app, you'd track who liked what to prevent double-liking
    // For now, just increment the counter
    await Tutorial.findByIdAndUpdate(id, { $inc: { 'stats.likes': 1 } });

    // Create notification for tutorial author
    if (tutorial.author.toString() !== req.userId) {
      await createNotification(
        tutorial.author.toString(),
        'tutorial_like',
        'Tutorial Liked',
        `Someone liked your tutorial "${tutorial.title}"`,
        { tutorialId: id },
        `/tutorials/${id}`
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial liked successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Like tutorial error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to like tutorial',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Rate tutorial
 * POST /api/tutorials/:id/rate
 */
export const rateTutorial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    // Check if user already rated this tutorial
    const existingRating = await Rating.findOne({
      user: req.userId,
      target: id,
      targetModel: 'Tutorial'
    });

    if (existingRating) {
      // Update existing rating
      existingRating.stars = rating;
      await existingRating.save();
    } else {
      // Create new rating
      await Rating.create({
        user: req.userId,
        target: id,
        targetModel: 'Tutorial',
        stars: rating
      });
    }

    // Recalculate tutorial average rating
    const ratings = await Rating.find({ target: id, targetModel: 'Tutorial' });
    const averageRating = ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length;

    await Tutorial.findByIdAndUpdate(id, {
      'stats.averageRating': Math.round(averageRating * 10) / 10,
      'stats.totalRatings': ratings.length
    });

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial rated successfully',
      data: { rating, averageRating }
    };

    res.json(response);

  } catch (error) {
    logger.error('Rate tutorial error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to rate tutorial',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get tutorial comments
 * GET /api/tutorials/:id/comments
 */
export const getTutorialComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = '1', limit = '20' } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [comments, total] = await Promise.all([
      Comment.find({ thread: id, threadModel: 'Tutorial' })
        .populate('author', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Comment.countDocuments({ thread: id, threadModel: 'Tutorial' })
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial comments retrieved successfully',
      data: comments,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get tutorial comments error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve tutorial comments',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Add comment to tutorial
 * POST /api/tutorials/:id/comments
 */
export const addTutorialComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content, parentReply } = req.body;

    const tutorial = await Tutorial.findById(id);
    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found'
      };
      return res.status(404).json(response);
    }

    const comment = new Comment({
      thread: id,
      threadModel: 'Tutorial',
      author: req.userId,
      content,
      parentReply: parentReply || undefined
    });

    await comment.save();
    await comment.populate('author', 'name avatar');

    // Create notification for tutorial author
    if (tutorial.author.toString() !== req.userId) {
      await createNotification(
        tutorial.author.toString(),
        'comment',
        'New Comment',
        `Someone commented on your tutorial "${tutorial.title}"`,
        { tutorialId: id, commentId: comment._id },
        `/tutorials/${id}`
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Comment added successfully',
      data: comment
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Add tutorial comment error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to add comment',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
