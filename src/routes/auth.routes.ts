import {NextFunction, Response, Router} from "express";
import {login, logout} from '../controllers/auth.controller'

const router = Router();


router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh');


export default router;