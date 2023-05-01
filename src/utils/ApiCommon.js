
import axios from 'axios';

  const api = axios.create({
    baseURL: '/api/v1/care-bookie',
    headers: {
      'Content-Type': 'application/json'
    }
  });

    export const get = async (path, config) => {
      try {
        const response = await api.get(path, config);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };

    export const getData = async (path, number,config ) => {
      try {
        const response = await api.get(path, config);
        const sortedData = response.data.sort((a, b) => b.star - a.star).slice(0, number);
        return sortedData;
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
