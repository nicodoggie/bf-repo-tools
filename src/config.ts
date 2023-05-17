import { Knex } from "knex";
import { config as dotconfig } from 'dotenv';

dotconfig();

export const mysql: Knex.StaticConnectionConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: Number(process.env.MYSQL_PORT) ?? 3306,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
}