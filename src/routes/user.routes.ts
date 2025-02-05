import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  currentUser,
  favoritesMovies,
  updateFavorites,
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/users', createUser);
router.get('/users', verifyToken, getAllUsers);
router.get('/users/:id', verifyToken, getUserById);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);
router.get('/me', verifyToken, currentUser);
router.get('/favorites', verifyToken, favoritesMovies);
router.post('/favorites/:movieId', verifyToken, updateFavorites);
//router.get('/users/activate/:link');

export default router;
