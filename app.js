import express from 'express';
import {configDotenv} from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index'

configDotenv();
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server started on port = ${port}`);
    });
  } catch (ex) {
    console.log(ex.message);
  }
}

start();