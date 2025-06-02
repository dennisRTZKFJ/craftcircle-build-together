
/**
 * Challenge Controller
 * 
 * Handles DIY challenges, submissions, and voting.
 * Manages the competitive aspects of the DIY community.
 */

import { Request, Response } from 'express';
import Challenge from '@/models/Challenge';
import ChallengeParticipant from '@/models/ChallengeParticipant';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get all challenges with filtering and pagination
 * GET /api/challenges
 */
export const getChallenges = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      status,
      category,
      difficulty
    } = req.query as any;

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

    const [challenges, total] = await Promise.all([
      Challenge.find(filter)
        .populate('creator', 'name avatar')
        .populate('judges', 'name avatar')
        .sort({ createdAt: -1 })
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
 * Get single challenge by ID with submissions
 * GET /api/challenges/:id
 */
export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const challenge = await Challenge.findById(id)
      .populate('creator', 'name avatar role')
      .populate('judges', 'name avatar role')
      .lean();

    if (!challenge) {
      const response: ApiResponse = {
        success: false,
        message: 'Challenge not found'
      };
      return res.status(404).json(response);
    }

    // Get submissions for this challenge
    const submissions = await ChallengeParticipant.find({ 
      challenge: id,
      title: { $exists: true } // Only get actual submissions, not just registrations
    })
      .populate('user', 'name avatar role')
      .sort({ votes: -1, submittedAt: -1 })
      .lean();

    const response: ApiResponse = {
      success: true,
      message: 'Challenge retrieved successfully',
      data: { challenge, submissions }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get challenge by ID error:', error);
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
      creator: req.userId,
      stats: {
        participants: 0,
        submissions: 0,
        totalVotes: 0
      }
    };

    const challenge = new Challenge(challengeData);
    await challenge.save();

    await challenge.populate('creator', 'name avatar role');

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

    // Verify challenge exists and is active
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
        message: 'Challenge is not accepting submissions'
      };
      return res.status(400).json(response);
    }

    // Check if user is already registered
    let participant = await ChallengeParticipant.findOne({
      challenge: id,
      user: req.userId
    });

    if (!participant) {
      // Register user for challenge first
      participant = new ChallengeParticipant({
        challenge: id,
        user: req.userId,
        registrationDate: new Date()
      });
    }

    // Add submission data
    Object.assign(participant, {
      ...req.body,
      submittedAt: new Date(),
      votes: 0
    });

    await participant.save();

    // Update challenge stats
    await Challenge.findByIdAndUpdate(id, {
      $inc: { 
        'stats.submissions': participant.submittedAt ? 1 : 0,
        'stats.participants': participant.registrationDate ? 1 : 0
      }
    });

    const response: ApiResponse = {
      success: true,
      message: 'Submission created successfully',
      data: participant
    };

    res.status(201).json(response);

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

    const submission = await ChallengeParticipant.findById(id);
    if (!submission) {
      const response: ApiResponse = {
        success: false,
        message: 'Submission not found'
      };
      return res.status(404).json(response);
    }

    // Simple vote increment (in real app, would track who voted)
    await ChallengeParticipant.findByIdAndUpdate(id, {
      $inc: { votes: 1 }
    });

    // Update challenge total votes
    await Challenge.findByIdAndUpdate(submission.challenge, {
      $inc: { 'stats.totalVotes': 1 }
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
