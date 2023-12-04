import env from "env-var";
import { config } from "dotenv";
config();

export const envs = {
    port: env.get("PORT").default(3000).asPortNumber(),
    host: env.get("HOST").default("localhost").asString(),
    dbUser: env.get("DB_USER").asString(),
    dbPassword: env.get("DB_PASSWORD").default("postgres").asString(),
    dbName: env.get("DB_NAME").default("postgres").asString(),
    dbPort: env.get("DB_PORT").default(5432).asPortNumber(),
    dbHost: env.get("DB_HOST").default("localhost").asString(),
    jwtSecret: env.get("JWT_SECRET").default("secret").asString(),
    publicPath: env.get("PUBLIC_PATH").default("public").asString()
}