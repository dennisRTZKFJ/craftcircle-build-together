
import { Request, Response, NextFunction } from 'express';
import Tutorial from '../models/Tutorial';
import { CreateTutorialRequest, UpdateTutorialRequest } from '../types/tutorial.types';
import { logger } from '../utils/logger';

// @desc    Get all tutorials
// @route   GET /api/tutorials
// @access  Public
export const getTutorials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const tutorials = await Tutorial.find({ status: { $ne: 'archived' } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Tutorial.countDocuments({ status: { $ne: 'archived' } });

    res.status(200).json({
      success: true,
      data: tutorials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tutorial
// @route   GET /api/tutorials/:id
// @access  Public
export const getTutorialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    // Increment view count
    tutorial.views += 1;
    await tutorial.save();

    res.status(200).json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new tutorial
// @route   POST /api/tutorials
// @access  Private
export const createTutorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutorialData: CreateTutorialRequest = req.body;

    const tutorial = await Tutorial.create(tutorialData);

    logger.info(`New tutorial created: ${tutorial._id}`);

    res.status(201).json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tutorial
// @route   PUT /api/tutorials/:id
// @access  Private
export const updateTutorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateData: UpdateTutorialRequest = req.body;

    const tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    logger.info(`Tutorial updated: ${tutorial._id}`);

    res.status(200).json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tutorial
// @route   DELETE /api/tutorials/:id
// @access  Private
export const deleteTutorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }

    await Tutorial.findByIdAndDelete(req.params.id);

    logger.info(`Tutorial deleted: ${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'Tutorial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured tutorials
// @route   GET /api/tutorials/featured
// @access  Public
export const getFeaturedTutorials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutorials = await Tutorial.find({ 
      status: 'published',
      likes: { $gte: 10 }
    })
    .sort({ likes: -1, views: -1 })
    .limit(5);

    res.status(200).json({
      success: true,
      data: tutorials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending tutorials
// @route   GET /api/tutorials/trending
// @access  Public
export const getTrendingTutorials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const tutorials = await Tutorial.find({
      status: 'published',
      createdAt: { $gte: oneWeekAgo }
    })
    .sort({ views: -1, likes: -1 })
    .limit(10);

    res.status(200).json({
      success: true,
      data: tutorials
    });
  } catch (error) {
    next(error);
  }
};
