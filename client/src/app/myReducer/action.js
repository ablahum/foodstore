export const categoryChanges = (value) => {
  return {
    type: 'ADD_CATEGORY',
    value
  }
}

export const searchChanges = (value) => {
  return {
    type: 'ADD_SEARCH',
    value
  }
}

export const tagsChanges = (value) => {
  return {
    type: 'CHANGE_TAGS',
    value
  }
}
