import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, SET_USER } from './constants'

export const addItem = (item, userId) => ({
  type: ADD_ITEM,
  payload: { item, userId }
})

export const removeItem = (item, userId) => ({
  type: REMOVE_ITEM,
  payload: { item, userId }
})

export const clearItems = (userId) => ({
  type: CLEAR_ITEMS,
  payload: { userId }
})

export const setUser = (userId) => ({
  type: SET_USER,
  payload: { userId }
})
