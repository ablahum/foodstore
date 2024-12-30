export const userIdChanges = (value) => {
  return {
    type: 'CHANGE_USERID',
    value,
  };
};

export const roleChanges = (value) => {
  return {
    type: 'CHANGE_ROLE',
    value,
  };
};

export const categoryChanges = (value) => {
  return {
    type: 'ADD_CATEGORY',
    value,
  };
};

export const searchChanges = (value) => {
  return {
    type: 'ADD_SEARCH',
    value,
  };
};

export const pageChanges = (value) => {
  return {
    type: 'CHANGE_PAGE',
    value,
  };
};

export const tagsChanges = (value) => {
  return {
    type: 'CHANGE_TAGS',
    value,
  };
};
