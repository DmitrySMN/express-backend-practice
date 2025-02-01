import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/users', userRouter);

export default app;