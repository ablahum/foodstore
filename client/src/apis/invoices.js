import axios from 'axios'
import { config } from '../config'

export const getOne = async (params) => {
  return await axios.get(`${config.apiHost}/api/invoices/${params}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
