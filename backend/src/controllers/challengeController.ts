
/**
 * Challenge Controller
 * 
 * Handles DIY challenges, submissions, and voting.
 */

import { Request, Response } from 'express';
import Challenge from '@/models/Challenge';
import ChallengeParticipant from '@/models/ChallengeParticipant';
import { ApiResponse, AuthenticatedRequest, SearchQuery } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get all challenges with filtering
 * GET /api/challenges
 */
export const getChallenges = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      status,
      category,
      difficulty,
      q
    } = req.query as SearchQuery;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    const [challenges, total] = await Promise.all([
      Challenge.find(filter)
        .populate('creator', 'name avatar')
        .sort({ startDate: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Challenge.countDocuments(filter)
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'Challenges retrieved successfully',
      data: challenges,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get challenges error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve challenges',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get single challenge by ID
 * GET /api/challenges/:id
 */
export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenge = await Challenge.findById(id)
      .populate('creator', 'name avatar')
      .populate('judges', 'name avatar')
      .lean();

    if (!challenge) {
      const response: ApiResponse = {
        success: false,
        message: 'Challenge not found'
      };
      return res.status(404).json(response);
    }

    // Get participants/submissions
    const participants = await ChallengeParticipant.find({ challenge: id })
      .populate('user', 'name avatar')
      .sort({ submittedAt: -1 })
      .lean();

    const response: ApiResponse = {
      success: true,
      message: 'Challenge retrieved successfully',
      data: { ...challenge, participants }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get challenge error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve challenge',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Create new challenge (admin only)
 * POST /api/challenges
 */
export const createChallenge = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const challengeData = {
      ...req.body,
      creator: req.userId
    };

    const challenge = new Challenge(challengeData);
    await challenge.save();
    await challenge.populate('creator', 'name avatar');

    const response: ApiResponse = {
      success: true,
      message: 'Challenge created successfully',
      data: challenge
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Create challenge error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to create challenge',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Submit to challenge
 * POST /api/challenges/:id/submit
 */
export const submitToChallenge = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check if challenge exists and is active
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      const response: ApiResponse = {
        success: false,
        message: 'Challenge not found'
      };
      return res.status(404).json(response);
    }

    if (challenge.status !== 'active') {
      const response: ApiResponse = {
        success: false,
        message: 'Challenge is not active for submissions'
      };
      return res.status(400).json(response);
    }

    // Check if user already participated
    const existingParticipant = await ChallengeParticipant.findOne({
      challenge: id,
      user: req.userId
    });

    if (existingParticipant) {
      // Update existing submission
      Object.assign(existingParticipant, req.body, { submittedAt: new Date() });
      await existingParticipant.save();
      await existingParticipant.populate('user', 'name avatar');

      const response: ApiResponse = {
        success: true,
        message: 'Submission updated successfully',
        data: existingParticipant
      };

      return res.json(response);
    }

    // Create new submission
    const submission = new ChallengeParticipant({
      challenge: id,
      user: req.userId,
      ...req.body,
      submittedAt: new Date()
    });

    await submission.save();
    await submission.populate('user', 'name avatar');

    // Update challenge stats
    await Challenge.findByIdAndUpdate(id, {
      $inc: { 'stats.participants': 1, 'stats.submissions': 1 }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Submission created successfully',
      data: submission
    };

    res.json(response);

  } catch (error) {
    logger.error('Submit to challenge error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to submit to challenge',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Vote on submission
 * POST /api/challenges/submissions/:id/vote
 */
export const voteOnSubmission = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // In a real app, you'd track who voted to prevent double voting
    await ChallengeParticipant.findByIdAndUpdate(id, {
      $inc: { votes: 1 }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Vote recorded successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Vote on submission error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to record vote',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
