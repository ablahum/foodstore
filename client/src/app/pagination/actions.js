import { CHANGE_ALL, CHANGE_PAGE } from './constants'

export const changeAll = (payload) => ({
  type: CHANGE_ALL,
  payload
})

export const changePage = (value) => {
  return {
    type: CHANGE_PAGE,
    value
  }
}
