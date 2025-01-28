const dotenv = require("dotenv").configDotenv();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require('express');
const userRouter = require('./routes/userRoutes');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/users', userRouter);

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server started on port = ${port}`);
    });
  } catch (ex) {
    console.log(ex.message);
  }
};

start();
