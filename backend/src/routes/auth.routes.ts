import { verifyJWT } from '../middleware/auth.middleware';
import { Router } from 'express';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyJWT, getCurrentUser);
router.post('/logout', verifyJWT, logoutUser);

export default router;
