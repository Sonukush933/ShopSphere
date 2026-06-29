import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from '../controllers/category.controller';
import { verifyJWT } from '../middleware/auth.middleware';

const router = Router();

router.route('/').post(verifyJWT, createCategory).get(getAllCategories);

router
  .route('/:id')
  .get(getCategoryById)
  .put(verifyJWT, updateCategory)
  .delete(verifyJWT, deleteCategory);

export default router;
