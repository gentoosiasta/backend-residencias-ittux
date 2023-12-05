import express from 'express';
import cors from 'cors';
import { envs } from './configs/envs.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import staffRouter from './routes/staff.js';
import subjectRouter from './routes/subject.js';

export class Server {
    constructor() {
        this.app = express();
        this.port = envs.port;

        //** Paths */
        this.basePath = '/api/v1';
        this.authPath = `${this.basePath}/auth`;
        this.userPath = `${this.basePath}/users`;
        this.staffPath = `${this.basePath}/staffs`;
        this.subjectPath = `${this.basePath}/subjects`;

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
        this.app.use(this.userPath, userRouter);
        this.app.use(this.staffPath, staffRouter);
        this.app.use(this.subjectPath, subjectRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}