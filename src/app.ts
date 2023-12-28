import express from 'express';
import cors from 'cors';
import { router } from './router';
import { errorMiddleware } from './middlewares/error';

export const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(errorMiddleware);
