import express, {Response, NextFunction} from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import {configDotenv} from "dotenv";

configDotenv({path: '../.env'});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.URL_CLIENT
}));
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);


export default app;