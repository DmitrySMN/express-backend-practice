import {configDotenv} from "dotenv";
import app from './src/app';

configDotenv();
const port = process.env.PORT;

const main = () => {
  try {
    app.listen(port, () => {
      console.log(`Server started on port = ${port}`);
    });
  } catch (ex: any) {
    console.log(ex.message);
  }
};

main();
