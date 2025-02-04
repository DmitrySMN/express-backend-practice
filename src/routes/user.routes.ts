import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  currentUser,
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();
router.post('/users', createUser);
router.get('/users', verifyToken, getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/me', verifyToken, currentUser);
router.get('/users/activate/:link');

export default router;
