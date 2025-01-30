import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/userRoutes";

config({path: '../.env'});
const port = process.env.PORT || 3000;
const index = express();

index.use(express.json());
index.use(cookieParser());
index.use(cors());
index.use('/api', userRouter);

const start = () => {
  try {
    index.listen(port, () => {
      console.log(`Server started on port = ${port}`);
    });
  } catch (ex: any) {
    console.log(ex.message);
  }
};

start();
