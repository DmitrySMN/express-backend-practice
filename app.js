import express from 'express';
import {configDotenv} from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';

configDotenv();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


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