import { CHANGE_ALL, CHANGE_PAGE } from './constants'

const initialState = {
  totalItems: 0,
  page: 1,
  perPage: 8
}

const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ALL:
      return {
        ...state,
        ...action.payload
      }

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.value
      }

    default:
      return state
  }
}

export default paginationReducer
