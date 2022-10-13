import axios from 'axios'
import { config } from '../config'

export const getAll = async () => {
  return await axios.get(`${config.api_host}/api/products`)
}

// export const createOne = async (payload) => {
//   return await axios.post(`${config.api_host}/api/products`, payload, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   })
// }

// export const updateOne = async (id, payload) => {
//   return await axios.put(`${config.api_host}/api/products/${id}`, payload, {
//     headers: {
//       Authorization: localStorage.getItem('token'),
//     },
//   })
// }

export const deleteOne = async (id) => {
  return await axios.delete(`${config.api_host}/api/products/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
