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
  try {
    const { fileName } = req.query;

    if (fileName) {
      const fileData = await filesService.getFileData(fileName);
      const parsedData = dataParserService.parse(fileData);
      if (!parsedData)
        return res.status(HttpStatusCode.UnprocessableEntity).json({
          error: 'Unprocessable Entity',
          status: HttpStatusCode.UnprocessableEntity,
          message: `The file ${fileName} contains errors or incomplete data`,
        });

      return res.status(HttpStatusCode.Ok).json([parsedData]);
    }

    // Si no viene el query param, continuar con todos los archivos
    const filesList = await filesService.listFiles();
    if (filesList === null) {
      res.status(HttpStatusCode.InternalServerError).json({
        error: 'Internal Server Error',
        status: HttpStatusCode.InternalServerError,
        message: 'An error occurred while getting the list of files',
      });
    }

    const { files } = filesList;
    const payload = [];

    // realiza todas las peticiones a los datos de los archivos en paralelo, el manejo de errores en el
    // service asegura que se resuelvan todas las promesas y el Promise.all no falle
    const fileDataList = await Promise.all(files.map((file) => filesService.getFileData(file)));

    for (const fileData of fileDataList) {
      if (fileData === null) continue;
      const parsedData = dataParserService.parse(fileData);
      if (parsedData) {
        payload.push(parsedData);
      }
    }

    return res.status(HttpStatusCode.Ok).json(payload);
  } catch (error) {
    return res.status(HttpStatusCode.InternalServerError).json({
      error: 'Internal Server Error',
      status: HttpStatusCode.InternalServerError,
      message: 'An error occurred while processing the request',
    });
  }
}

export default {
  getFileList,
  getFilesData,
};
