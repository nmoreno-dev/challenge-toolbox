import axios, { HttpStatusCode } from 'axios';
import logger from './lib/logger.mjs';

const TOKEN = 'aSuperSecretKey';

const client = axios.create({
  baseURL: 'https://echo-serv.tbxnet.com/v1',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

async function listFiles() {
  try {
    const response = await client.get('/secret/files');

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }
  } catch (error) {
    logger.error('Error al obtener los archivos del servicio');
    console.error(error);
  }

  return null;
}

async function downloadFile(fileName) {
  if (typeof fileName !== 'string') return null;

  try {
    const response = await client.get(`/secret/file/${fileName}`);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }
  } catch (error) {
    logger.error('Error al obtener los datos del archivo');
    console.error(error);
  }

  return null;
}

export default {
  listFiles,
  downloadFile,
};
