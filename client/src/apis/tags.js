import axios from 'axios';
import { config } from '../config';

export const getAll = async () => {
  return await axios.get(`${config.apiHost}/api/tags`);
};

export const createOne = async (payload) => {
  return await axios.post(`${config.apiHost}/api/tags`, payload, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};

export const updateOne = async (id, payload) => {
  return await axios.put(`${config.apiHost}/api/tags/${id}`, payload, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};

export const deleteOne = async (id) => {
  return await axios.delete(`${config.apiHost}/api/tags/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
};
