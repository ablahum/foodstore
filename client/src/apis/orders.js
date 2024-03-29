import axios from 'axios'
import { config } from '../config'

export const getAll = async () => {
  return await axios.get(`${config.apiHost}/api/orders`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}

export const createOne = async (payload) => {
  return await axios.post(`${config.apiHost}/api/orders`, payload, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
