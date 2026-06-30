import { Router } from 'express';
import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../controllers/wishlist.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router
  .route('/')
  .post(verifyJWT, addToWishlist)
  .get(verifyJWT, getMyWishlist)
  .delete(verifyJWT, clearWishlist);

router.route('/remove').delete(verifyJWT, removeFromWishlist);

export default router;
