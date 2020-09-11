import * as actionTypes from '../actions/actionsTypes';
// import { addCat } from '../actions/cat';

const initialState = [];

const addCat = (state, payload) => {
  const updatedState = {};
  console.log('reducer: ' + state);
  return updateObject(state, updatedState);
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_CAT:
      return addCat(state, payload);
    default:
      return state;
  }
};

export default reducer;
