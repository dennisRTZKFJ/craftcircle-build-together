
import express from 'express';
import { body, query } from 'express-validator';
import {
  getTutorials,
  getTutorialById,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getFeaturedTutorials,
  getTrendingTutorials
} from '../controllers/tutorialController';
import { validateRequest } from '../middlewares/validation';

const router = express.Router();

// GET /api/tutorials
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  validateRequest
], getTutorials);

// GET /api/tutorials/featured
router.get('/featured', getFeaturedTutorials);

// GET /api/tutorials/trending
router.get('/trending', getTrendingTutorials);

// GET /api/tutorials/:id
router.get('/:id', getTutorialById);

// POST /api/tutorials
router.post('/', [
  body('title').trim().isLength({ min: 5, max: 200 }),
  body('description').trim().isLength({ min: 20, max: 1000 }),
  body('content.category').optional().isIn([
    'furniture-building', 'storage', 'decoration', 'outdoor', 'upcycling'
  ]),
  body('content.difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  body('content.duration').optional().isInt({ min: 1 }),
  validateRequest
], createTutorial);

// PUT /api/tutorials/:id
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 5, max: 200 }),
  body('description').optional().trim().isLength({ min: 20, max: 1000 }),
  body('content.category').optional().isIn([
    'furniture-building', 'storage', 'decoration', 'outdoor', 'upcycling'
  ]),
  body('content.difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  validateRequest
], updateTutorial);

// DELETE /api/tutorials/:id
router.delete('/:id', deleteTutorial);

export default router;
