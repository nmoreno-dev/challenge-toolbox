import { Router } from 'express';
import controller from './controller.mjs';

const appRouter = Router();

appRouter.get('/files/list', controller.getFileList);

appRouter.get('/files/data', controller.getFilesData);

export default appRouter;
