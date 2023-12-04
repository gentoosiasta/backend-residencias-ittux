import express from 'express';
import cors from 'cors';
import { envs } from './configs/envs.js';
import authRouter from './routes/auth.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = envs.port;

        //** Paths */
        this.basePath = '/api/v1';
        this.authPath = `${this.basePath}/auth`;

        this.middlewares();
        this.routes();
    }

    //** Middlewares */
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    //** Routes */
    routes() {
        this.app.use(this.authPath, authRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}