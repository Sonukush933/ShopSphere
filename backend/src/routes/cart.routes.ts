import { Router } from 'express';
import {
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from '../controllers/cart.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router
  .route('/')
  .post(verifyJWT, addToCart)
  .get(verifyJWT, getMyCart)
  .put(verifyJWT, updateCartQuantity)
  .delete(verifyJWT, clearCart);

router.route('/item').delete(verifyJWT, removeFromCart);

export default router;
