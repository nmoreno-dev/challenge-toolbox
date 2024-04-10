import { Router } from 'express';
import { HttpStatusCode } from 'axios';
const appRouter = Router();

appRouter.get('/file/list', (_, res) => res.sendStatus(HttpStatusCode.NotImplemented));

appRouter.get('/file/data', async (_, res) => res.sendStatus(HttpStatusCode.NotImplemented));
