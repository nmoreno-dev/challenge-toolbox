import express from 'express';
import logger from './lib/logger.mjs';
import appRouter from './routes.mjs';
import cors from 'cors';

const PORT = 5000;

const server = express();

server.use(
  cors({
    // Permitir todos los origenes es una práctica nefasta
    // pero para simplicidad del challenge lo dejo asi.
    origin: '*',
  })
);

server.use(appRouter);

server.use('/', (_, res) => {
  res.status(200).send();
});

export default server.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
});
