import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { verifyJWT } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { USER_ROLES } from '../constants';

const router = Router();

router
  .route('/')
  .post(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), createProduct)
  .get(getAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), updateProduct)
  .delete(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), deleteProduct);

export default router;
