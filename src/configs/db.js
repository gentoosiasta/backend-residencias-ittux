import pg from "pg";
import { envs } from "../configs/envs.js";

const { Pool } = pg
const dbConfig = {
    user: envs.dbUser,
    host: envs.dbHost,
    database: envs.dbName,
    password: envs.dbPassword,
    port: envs.dbPort
}

const pool = new Pool(dbConfig);
const query = (text, params) => pool.query(text, params);

export default {query};
