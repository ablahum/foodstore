import axios from 'axios'
import { config } from '../config'

export const createOne = async (payload) => {
  return await axios.post(`${config.api_host}/api/orders`, payload, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
