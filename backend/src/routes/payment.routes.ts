import { Router } from 'express';

import { verifyJWT } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { USER_ROLES } from '../constants';
import {
  createPayment,
  getMyPayments,
  getPaymentById,
  updatePaymentStatus,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../controllers/payment.controller';

const router = Router();

router.post(
  '/',
  verifyJWT,
  authorizeRoles(USER_ROLES.CUSTOMER),
  createPayment,
);
router.post(
  '/create-order',
  verifyJWT,
  authorizeRoles(USER_ROLES.CUSTOMER),
  createRazorpayOrder,
);

router.post(
  '/verify',
  verifyJWT,
  authorizeRoles(USER_ROLES.CUSTOMER),
  verifyRazorpayPayment,
);

router.get(
  '/',
  verifyJWT,
  authorizeRoles(USER_ROLES.CUSTOMER),
  getMyPayments,
);

router.get(
  '/:id',
  verifyJWT,
  authorizeRoles(USER_ROLES.CUSTOMER),
  getPaymentById,
);

router.patch(
  '/:id/status',
  verifyJWT,
  authorizeRoles(USER_ROLES.ADMIN),
  updatePaymentStatus,
);

export default router;

