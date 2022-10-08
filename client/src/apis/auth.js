import axios from 'axios'
import { config } from '../config'

export const register = async (payload) => {
  return await axios.post(`${config.api_host}/auth/register`, payload)
}

export const login = async (payload) => {
  return await axios.post(`${config.api_host}/auth/login`, payload)
}

export const logout = async () => {
  return await axios.post(`${config.api_host}/auth/logout`, null, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
