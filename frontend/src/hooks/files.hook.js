import { useEffect, useState } from 'react';
import appService from '../services/app.service';

export const useFileList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    setIsLoading(true);

    try {
      const data = await appService.listFiles();
      const { files } = data;
      setList(files);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    fetchList();
  }, []);

  return {
    list,
    isLoading,
    error,
  };
};

export const useFileData = (fileName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const filesData = await appService.getFileData(fileName);
      setData(filesData);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [fileName]);

  return {
    data,
    isLoading,
    error,
  };
};
