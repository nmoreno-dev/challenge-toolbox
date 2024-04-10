import { HttpStatusCode } from 'axios';
import filesService from './files.service.mjs';
import logger from './lib/logger.mjs';
import dataParserService from './dataParser.service.mjs';

async function getFileList(_, res) {
  const data = await filesService.listFiles();
  if (data === null) {
    res.status(HttpStatusCode.InternalServerError).json({
      error: 'Internal Server Error',
      status: HttpStatusCode.InternalServerError,
      message: 'Ocurrió un error al obtener la lista de archivos',
    });
  }

  res.status(HttpStatusCode.Ok).json(data);
}

async function getFilesData(req, res) {
  const filesList = await filesService.listFiles();
  if (filesList === null) {
    res.status(HttpStatusCode.InternalServerError).json({
      error: 'Internal Server Error',
      status: HttpStatusCode.InternalServerError,
      message: 'Ocurrió un error al obtener la lista de archivos',
    });
  }

  const { files } = filesList;
  const payload = [];

  for (const file of files) {
    const fileData = await filesService.getFileData(file);
    if (fileData === null) {
      logger.warn(`Ocurrio un error al obtener la información del archivo ${file}`);
      continue;
    }
    console.log(fileData);
    const parsedData = dataParserService.parse(fileData);

    if (parsedData) {
      payload.push(parsedData);
    }
  }

  res.status(HttpStatusCode.Ok).json(payload);
}

export default {
  getFileList,
  getFilesData,
};
