import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';
import { verifyJWT } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { USER_ROLES } from '../constants';

const router = Router();

router
  .route('/')
  .post(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), createCategory)
  .get(getAllCategories);

router
  .route('/:id')
  .get(getCategoryById)
  .put(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), updateCategory)
  .delete(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), deleteCategory);

export default router;
