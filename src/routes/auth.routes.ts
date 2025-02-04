import {NextFunction, Response, Router} from "express";
import {login, logout} from '../controllers/auth.controller'
import {verifyToken} from "../middleware/auth.middleware";

const router = Router();

router.get('/me', verifyToken);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh');


export default router;