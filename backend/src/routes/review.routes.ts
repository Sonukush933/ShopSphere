import { Router } from 'express';
import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from '../controllers/review.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.route('/').post(verifyJWT, createReview);

router.route('/product/:productId').get(getProductReviews);

router
  .route('/:id')
  .put(verifyJWT, updateReview)
  .delete(verifyJWT, deleteReview);

export default router;
