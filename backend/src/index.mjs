import express from 'express';
import logger from './lib/logger.mjs';
import appRouter from './routes.mjs';

const PORT = 5000;

(() => {
  const server = express();

  server.use('/', (_, res) => {
    res.status(200).send();
  });

  server.use(appRouter);

  server.listen(PORT, () => {
    logger.info(`Servidor corriendo en el puerto ${PORT}`);
  });
})();
