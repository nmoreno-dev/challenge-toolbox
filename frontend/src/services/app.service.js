import { HttpStatusCode } from 'axios';
import apiClient from '../config/api';

async function listFiles() {
  const response = await apiClient.get('/files/list');

  if (response.status === HttpStatusCode.Ok) {
    return response.data;
  }
}

async function getFileData(fileName) {
  const response = await apiClient.get(`/files/data${fileName ? `?fileName=${fileName}` : ''}`);

  if (response.status === HttpStatusCode.Ok) {
    return response.data;
  }
}

export default {
  listFiles,
  getFileData,
};
