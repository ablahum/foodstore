import axios from 'axios'
import { config } from '../config'

export const getAll = async () => {
  return await axios.get(`${config.apiHost}/api/products`)
}

export const getSpecific = async (params) => {
  return await axios.get(`${config.apiHost}/api/products${params}`)
}

export const createOne = async (payload) => {
  return await axios.post(`${config.apiHost}/api/products`, payload, {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: localStorage.getItem('token')
    }
  })
}

export const updateOne = async (id, payload) => {
  return await axios.put(`${config.apiHost}/api/products/${id}`, payload, {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: localStorage.getItem('token')
    }
  })
}

export const deleteOne = async (id) => {
  return await axios.delete(`${config.apiHost}/api/products/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
