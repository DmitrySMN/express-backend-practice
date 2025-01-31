import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import userRouter from './src/routes/user.routes';

const port = 3000;
const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(cors());
server.use('/api/users', userRouter);

const start = () => {
  try {
    server.listen(port, () => {
      console.log(`Server started on port = ${port}`);
    });
  } catch (ex: any) {
    console.log(ex.message);
  }
};

start();
