import { Router } from 'express';
import { HttpStatusCode } from 'axios';
import filesService from './files.service.mjs';
import logger from './lib/logger.mjs';
const appRouter = Router();

appRouter.get('/files/list', async (_, res) => {
  const data = await filesService.listFiles();
  if (data === null) {
    res.status(HttpStatusCode.InternalServerError).json({
      error: 'Internal Server Error',
      status: HttpStatusCode.InternalServerError,
      message: 'Ocurrió un error al obtener la lista de archivos',
    });
  }

  res.status(HttpStatusCode.Ok).json(data);
});

appRouter.get('/files/data', async (req, res) => {
  const filesList = await filesService.listFiles();
  if (filesList === null) {
    res.status(HttpStatusCode.InternalServerError).json({
      error: 'Internal Server Error',
      status: HttpStatusCode.InternalServerError,
      message: 'Ocurrió un error al obtener la lista de archivos',
    });
  }

  const { files } = filesList;

  //   const filesData = files.map(async (fileName) => {
  //     const fileData = await filesService.downloadFile(fileName);
  //     if (fileData === null) {
  //       logger.warn(`Ocurrio un error al obtener la información del archivo ${fileName}`);
  //     }
  //     console.log(fileData);
  //     return fileData;
  //   });

  const payload = [];

  for (const fileName of files) {
    const fileData = await filesService.downloadFile(fileName);
    if (fileData === null) {
      logger.warn(`Ocurrio un error al obtener la información del archivo ${fileName}`);
    }
    console.log(fileData);
    payload.push({
      file: fileName,
      data: fileData,
    });
  }

  res.status(HttpStatusCode.Ok).json(payload);
});

export default appRouter;
