const initialState = {
  userId: "",
  role: "",
  categoryKey: "",
  searchKey: "",
  page: 1,
  tags: [],
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_USERID":
      return {
        ...state,
        userId: action.value,
      };
    case "CHANGE_ROLE":
      return {
        ...state,
        role: action.value,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categoryKey: action.value,
      };
    case "ADD_SEARCH":
      return {
        ...state,
        searchKey: action.value,
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.value,
      };
    case "CHANGE_TAGS":
      return {
        ...state,
        tags: action.value,
      };
    default:
      return state;
  }
};

export default myReducer;
