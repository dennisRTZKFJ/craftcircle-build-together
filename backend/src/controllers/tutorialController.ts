
/**
 * Tutorial Controller
 * 
 * Handles all tutorial-related business logic including CRUD operations,
 * search, filtering, rating, and social interactions.
 */

import { Request, Response } from 'express';
import Tutorial from '@/models/Tutorial';
import User from '@/models/User';
import { ApiResponse, AuthenticatedRequest, SearchQuery } from '@/types';
import { logger } from '@/utils/logger';

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
      sort = 'createdAt',
      order = 'desc'
    } = req.query as SearchQuery;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build search filter
    const filter: any = { status: 'published' };

    if (category) {
      filter.category = category;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    if (q) {
      filter.$text = { $search: q };
    }

    // Build sort object
    const sortObj: any = {};
    if (sort === 'popularity') {
      sortObj['stats.views'] = order === 'asc' ? 1 : -1;
    } else if (sort === 'rating') {
      sortObj['stats.averageRating'] = order === 'asc' ? 1 : -1;
    } else {
      sortObj[sort] = order === 'asc' ? 1 : -1;
    }

    // Execute queries
    const [tutorials, total] = await Promise.all([
      Tutorial.find(filter)
        .populate('author', 'name avatar')
        .sort(sortObj)
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
 * Get single tutorial by ID
 * GET /api/tutorials/:id
 */
export const getTutorialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tutorial = await Tutorial.findById(id)
      .populate('author', 'name avatar bio')
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
      author: req.userId
    };

    const tutorial = new Tutorial(tutorialData);
    await tutorial.save();

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $inc: { 'stats.tutorialsCreated': 1 }
    });

    await tutorial.populate('author', 'name avatar');

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

    const tutorial = await Tutorial.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate('author', 'name avatar');

    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found'
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

    const tutorial = await Tutorial.findByIdAndDelete(id);

    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found'
      };
      return res.status(404).json(response);
    }

    // Update user stats
    await User.findByIdAndUpdate(tutorial.author, {
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
 * Get featured tutorials
 * GET /api/tutorials/featured
 */
export const getFeaturedTutorials = async (req: Request, res: Response) => {
  try {
    const tutorials = await (Tutorial as any).getFeatured(5);

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
    const tutorials = await (Tutorial as any).getTrending(10);

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
 * Like/unlike tutorial
 * POST /api/tutorials/:id/like
 */
export const likeTutorial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    // Implementation would check if user already liked and toggle
    await Tutorial.findByIdAndUpdate(id, { $inc: { 'stats.likes': 1 } });

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

    const tutorial = await Tutorial.findById(id);
    if (!tutorial) {
      const response: ApiResponse = {
        success: false,
        message: 'Tutorial not found'
      };
      return res.status(404).json(response);
    }

    // Calculate new average rating
    const newTotalRatings = tutorial.stats.totalRatings + 1;
    const newAverageRating = 
      (tutorial.stats.averageRating * tutorial.stats.totalRatings + rating) / newTotalRatings;

    await Tutorial.findByIdAndUpdate(id, {
      'stats.averageRating': newAverageRating,
      'stats.totalRatings': newTotalRatings
    });

    const response: ApiResponse = {
      success: true,
      message: 'Tutorial rated successfully'
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
    // Mock implementation - in real app would have Comment model
    const response: ApiResponse = {
      success: true,
      message: 'Comments retrieved successfully',
      data: []
    };

    res.json(response);

  } catch (error) {
    logger.error('Get comments error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve comments',
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
    // Mock implementation - in real app would create Comment document
    const response: ApiResponse = {
      success: true,
      message: 'Comment added successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Add comment error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to add comment',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
