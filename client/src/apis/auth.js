import axios from 'axios'
import { config } from '../config'

export const getMe = async () => {
  return await axios.get(`${config.apiHost}/auth/me`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}

export const register = async (payload) => {
  return await axios.post(`${config.apiHost}/auth/register`, payload)
}

export const login = async (payload) => {
  return await axios.post(`${config.apiHost}/auth/login`, payload)
}

export const logout = async () => {
  return await axios.post(`${config.apiHost}/auth/logout`, null, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
