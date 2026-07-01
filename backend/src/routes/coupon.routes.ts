import { Router } from 'express';
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon
} from '../controllers/coupon.controller';
import { verifyJWT } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { USER_ROLES } from '../constants';

const router = Router();

router
  .route('/')
  .post(
    verifyJWT,
    authorizeRoles(USER_ROLES.ADMIN),
    createCoupon,
  )
  .get(
    verifyJWT,
    authorizeRoles(USER_ROLES.ADMIN),
    getAllCoupons,
  );

router.post(
  '/apply',
  verifyJWT,
  applyCoupon,
);

router
  .route('/:id')
  .get(
    verifyJWT,
    authorizeRoles(USER_ROLES.ADMIN),
    getCouponById,
  )
  .put(
    verifyJWT,
    authorizeRoles(USER_ROLES.ADMIN),
    updateCoupon,
  )
  .delete(
    verifyJWT,
    authorizeRoles(USER_ROLES.ADMIN),
    deleteCoupon,
  );

export default router;