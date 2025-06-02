
/**
 * Community Controller
 * 
 * Handles forum posts, discussions, and community interactions.
 * Manages the social aspects of the DIY community platform.
 */

import { Request, Response } from 'express';
import CommunityPost from '@/models/CommunityPost';
import Comment from '@/models/Comment';
import ViewPost from '@/models/ViewPost';
import { ApiResponse, AuthenticatedRequest } from '@/types';
import { logger } from '@/utils/logger';

/**
 * Get forum posts with pagination and filtering
 * GET /api/community/posts
 */
export const getForumPosts = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      category,
      status = 'open',
      sort = 'recent'
    } = req.query as any;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter: any = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Build sort options
    let sortOptions: any = {};
    switch (sort) {
      case 'popular':
        sortOptions = { 'stats.likes': -1, 'stats.views': -1 };
        break;
      case 'active':
        sortOptions = { 'stats.lastActivity': -1 };
        break;
      case 'recent':
      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const [posts, total] = await Promise.all([
      CommunityPost.find(filter)
        .populate('author', 'name avatar role')
        .populate('solutionReply')
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      CommunityPost.countDocuments(filter)
    ]);

    const response: ApiResponse = {
      success: true,
      message: 'Forum posts retrieved successfully',
      data: posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get forum posts error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve forum posts',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Get single post by ID with comments
 * GET /api/community/posts/:id
 */
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId; // From optional auth

    // Get post with author details
    const post = await CommunityPost.findById(id)
      .populate('author', 'name avatar role')
      .populate('solutionReply')
      .lean();

    if (!post) {
      const response: ApiResponse = {
        success: false,
        message: 'Post not found'
      };
      return res.status(404).json(response);
    }

    // Get comments for this post
    const comments = await Comment.find({ 
      thread: id, 
      threadModel: 'CommunityPost',
      parentReply: { $exists: false } // Top-level comments only
    })
      .populate('author', 'name avatar role')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'name avatar role'
        }
      })
      .sort({ createdAt: -1 })
      .lean();

    // Increment view count if user is authenticated
    if (userId) {
      await CommunityPost.findByIdAndUpdate(id, {
        $inc: { 'stats.views': 1 },
        'stats.lastActivity': new Date()
      });

      // Track user view
      await ViewPost.findOneAndUpdate(
        { user: userId, post: id },
        { 
          user: userId, 
          post: id, 
          viewDate: new Date(),
          ipAddress: req.ip,
          deviceType: req.get('User-Agent')
        },
        { upsert: true, new: true }
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Post retrieved successfully',
      data: { post, comments }
    };

    res.json(response);

  } catch (error) {
    logger.error('Get post by ID error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to retrieve post',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Create new community post
 * POST /api/community/posts
 */
export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postData = {
      ...req.body,
      author: req.userId,
      stats: {
        views: 0,
        replies: 0,
        likes: 0,
        lastActivity: new Date()
      }
    };

    const post = new CommunityPost(postData);
    await post.save();

    // Populate author details for response
    await post.populate('author', 'name avatar role');

    const response: ApiResponse = {
      success: true,
      message: 'Post created successfully',
      data: post
    };

    res.status(201).json(response);

  } catch (error) {
    logger.error('Create post error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to create post',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};

/**
 * Add comment to post
 * POST /api/community/posts/:id/comments
 */
export const addComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { content, parentReply } = req.body;

    // Verify post exists
    const post = await CommunityPost.findById(id);
    if (!post) {
      const response: ApiResponse = {
        success: false,
        message: 'Post not found'
      };
      return res.status(404).json(response);
    }

    // Create comment
    const comment = new Comment({
      thread: id,
      threadModel: 'CommunityPost',
      author: req.userId,
      content,
      parentReply: parentReply || undefined
    });

    await comment.save();
    await comment.populate('author', 'name avatar role');

    // Update post stats
    await CommunityPost.findByIdAndUpdate(id, {
      $inc: { 'stats.replies': 1 },
      'stats.lastActivity': new Date()
    });

    const response: ApiResponse = {
      success: true,
      message: 'Comment added successfully',
      data: comment
    };

    res.status(201).json(response);

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

/**
 * Like/unlike post
 * POST /api/community/posts/:id/like
 */
export const likePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const post = await CommunityPost.findById(id);
    if (!post) {
      const response: ApiResponse = {
        success: false,
        message: 'Post not found'
      };
      return res.status(404).json(response);
    }

    // Toggle like logic would go here
    // For simplicity, just increment likes
    await CommunityPost.findByIdAndUpdate(id, {
      $inc: { 'stats.likes': 1 },
      'stats.lastActivity': new Date()
    });

    const response: ApiResponse = {
      success: true,
      message: 'Post liked successfully'
    };

    res.json(response);

  } catch (error) {
    logger.error('Like post error:', error);
    const response: ApiResponse = {
      success: false,
      message: 'Failed to like post',
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
};
