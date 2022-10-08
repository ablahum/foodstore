import axios from 'axios'
import { config } from '../config'

export const getAll = async () => {
  return await axios.get(`${config.api_host}/api/tags`)
}

export const createOne = async (payload) => {
  return await axios.post(`${config.api_host}/api/tags`, payload, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
