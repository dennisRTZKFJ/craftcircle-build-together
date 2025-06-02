
/**
 * Community Routes
 * 
 * Handles forum posts, discussions, and community interactions.
 */

import express from 'express';
import { body } from 'express-validator';
import {
  getForumPosts,
  getPostById,
  createPost,
  addComment,
  likePost
} from '@/controllers/communityController';
import { authenticateToken, optionalAuth } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

router.get('/posts', optionalAuth, getForumPosts);
router.get('/posts/:id', optionalAuth, getPostById);
router.post('/posts', [authenticateToken()], createPost);
router.post('/posts/:id/comments', [authenticateToken()], addComment);
router.post('/posts/:id/like', [authenticateToken()], likePost);

export default router;
