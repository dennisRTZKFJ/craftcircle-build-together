
/**
 * Challenge Routes
 * 
 * Handles DIY challenges, submissions, and voting.
 */

import express from 'express';
import { body, query } from 'express-validator';
import {
  getChallenges,
  getChallengeById,
  createChallenge,
  submitToChallenge,
  voteOnSubmission
} from '@/controllers/challengeController';
import { authenticateToken, requireRole } from '@/middlewares/auth';
import { validateRequest } from '@/middlewares/validation';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.post('/', [authenticateToken(), requireRole('admin')], createChallenge);
router.post('/:id/submit', [authenticateToken()], submitToChallenge);
router.post('/submissions/:id/vote', [authenticateToken()], voteOnSubmission);

export default router;
