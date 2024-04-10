import { HttpStatusCode } from 'axios';
import filesService from './services/files.service.mjs';
import logger from './lib/logger.mjs';
import dataParserService from './services/dataParser.service.mjs';

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

  // realiza todas las peticiones a los datos de los archivos en paralelo, el manejo de errores en el
  // service asegura que se resuelvan todas y el Promise.all no falle
  const fileDataList = await Promise.all(files.map((file) => filesService.getFileData(file)));

  for (const fileData of fileDataList) {
    if (fileData === null) continue;
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
