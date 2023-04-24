
import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:8092/api/v1/care-bookie',
    headers: {
      'Content-Type': 'application/json'
    }
  });

    export const get = async (path, config) => {
      try {
        const response = await api.get(path, config);
        console.log(response);
        return response.data;

      } catch (error) {
        console.error(error);
      }
    };


  export const post = async (path, data, config) => {
    try {
      const response = await api.post(path, data, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const put = async (path, data, config) => {
    try {
      const response = await api.put(path, data, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const del = async (path, config) => {
    try {
      const response = await api.delete(path, config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const searchData = async (key)  => {
      return axios.get('/common/search?', key)
    }
