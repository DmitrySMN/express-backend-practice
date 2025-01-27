import { Router } from 'express';
import {createUser, getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/userConteroller';

const router = new Router();

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;