import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { USER_ROLES } from '../constants';

import { getDashboardStats } from '../controllers/dashboard.controller';

const router = Router();

router.get(
  '/stats',
  verifyJWT,
  authorizeRoles(USER_ROLES.ADMIN),
  getDashboardStats,
);

export default router;
