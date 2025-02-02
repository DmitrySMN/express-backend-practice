import express, {Response, NextFunction} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import {verifyToken, ExpressRequest} from "./middleware/auth.middleware";
import router from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.get('/auth/me', verifyToken, async (req: ExpressRequest, res: Response, next:NextFunction): Promise<any> => {
    try {
        if (!req.user) {
            return res.status(401);
        }
        return res.status(400).json(req.user);
    } catch (err: any) {
        next(err);
    }
});

export default app;