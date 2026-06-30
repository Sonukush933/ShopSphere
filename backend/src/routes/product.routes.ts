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
import upload from '../middleware/multer.middleware';

const router = Router();

router
  .route('/')
  .post(
    verifyJWT,
    authorizeRoles(USER_ROLES.ADMIN),
    upload.array('images', 5),
    createProduct,
  )
  .get(getAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), updateProduct)
  .delete(verifyJWT, authorizeRoles(USER_ROLES.ADMIN), deleteProduct);

export default router;
