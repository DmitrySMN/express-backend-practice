import {Pool, PoolConfig} from "pg";
import dotenv from "dotenv";
dotenv.config({path: '../.env'});

interface IDbConfig extends PoolConfig {
  host: string;
  port:number;
  user: string;
  password: string;
  database: string;
}

const dbConfig: IDbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'root',
  password: process.env.PASSWORD || 'pgpwd',
  database: process.env.DB_NAME || 'users',
};

const pool: Pool = new Pool(dbConfig);

export default pool;
