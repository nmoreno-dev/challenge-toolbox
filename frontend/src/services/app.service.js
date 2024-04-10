import { HttpStatusCode } from 'axios';
import apiClient from '../config/api';

async function listFiles() {
  try {
    const response = await apiClient.get('/files/list');

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }
  } catch (error) {}
}

async function getFileData(fileName) {
  try {
    const response = await apiClient.get(`/files/data${fileName ? `?fileName${fileName}` : ''}`);

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }
  } catch (error) {}
}

export default {
  listFiles,
  getFileData,
};
