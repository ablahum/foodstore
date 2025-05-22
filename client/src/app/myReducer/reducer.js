const initialState = {
  categoryKey: '',
  searchKey: '',
  tags: []
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categoryKey: action.value
      }
    case 'ADD_SEARCH':
      return {
        ...state,
        searchKey: action.value
      }
    case 'CHANGE_TAGS':
      return {
        ...state,
        tags: action.value
      }
    default:
      return state
  }
}

export default myReducer
