import axios from 'axios'
import { config } from '../config'

export const getAll = async () => {
  return await axios.get(`${config.api_host}/api/carts`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}

export const deleteOne = async (id) => {
  return await axios.delete(`${config.api_host}/api/carts/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
