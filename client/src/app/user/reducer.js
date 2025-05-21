const initialState = {
  userId: '',
  role: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_USERID':
      return {
        ...state,
        userId: action.value
      }
    case 'CHANGE_ROLE':
      return {
        ...state,
        role: action.value
      }
    default:
      return state
  }
}

export default userReducer
