import axios from 'axios'
import { config } from '../config'

export const getAll = async () => {
  return await axios.get(`${config.apiHost}/api/carts`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export const putAll = async (payload) => {
  return await axios.put(
    `${config.apiHost}/api/carts`,
    { items: payload },
    {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  )
}

export const deleteOne = async (id) => {
  return await axios.delete(`${config.apiHost}/api/carts/${id}`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
