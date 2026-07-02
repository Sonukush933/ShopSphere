import { Router } from 'express';

import { verifyJWT } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { USER_ROLES } from '../constants';

import {
  createPayment,
  getMyPayments,
  getPaymentById,
  updatePaymentStatus
} from '../controllers/payment.controller';

const router = Router();

router.post(
  '/',
  verifyJWT,
  authorizeRoles(USER_ROLES.CUSTOMER),
  createPayment,
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
  authorizeRoles(USER_ROLES.CUSTOMER),
  updatePaymentStatus,
);

export default router;

