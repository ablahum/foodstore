import { CHANGE_ROLE, CHANGE_USERID } from './constants'

export const changeUserId = (value) => {
  return {
    type: CHANGE_USERID,
    value
  }
}

export const changeRole = (value) => {
  return {
    type: CHANGE_ROLE,
    value
  }
}
