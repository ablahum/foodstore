import { ADD_CATEGORY, ADD_SEARCH, ADD_TAGS } from './constants'

const initialState = {
  categoryKey: '',
  searchKey: '',
  tags: []
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categoryKey: action.value
      }
    case ADD_SEARCH:
      return {
        ...state,
        searchKey: action.value
      }
    case ADD_TAGS:
      return {
        ...state,
        tags: action.value
      }
    default:
      return state
  }
}

export default filterReducer
