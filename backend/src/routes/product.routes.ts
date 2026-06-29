import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.route('/').post(verifyJWT, createProduct).get(getAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(verifyJWT, updateProduct)
  .delete(verifyJWT, deleteProduct);

export default router;
