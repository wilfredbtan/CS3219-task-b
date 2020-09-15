import * as actionTypes from '../actions/actionsTypes';

const initialState = [];

const initCats = (state, payload) => {
  return updateObject(state, {
    cats: payload.cats,
  });
};

const addCat = (state, payload) => {
  let updatedCats = [...state.cats];
  updatedCats.push(payload.cat);
  return updateObject(state, { cats: updatedCats });
};

const deleteCat = (state, payload) => {
  let updatedCats = [...state.cats].filter((cat) => cat.id !== payload.id);
  // const updatedState = {};
  console.log('delete reducer: ' + state);
  return updateObject(state, { cats: updatedCats });
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
    case actionTypes.INIT_CATS:
      return initCats(state, payload);
    case actionTypes.ADD_CAT:
      return addCat(state, payload);
    case actionTypes.DELETE_CAT:
      return deleteCat(state, payload);
    default:
      return state;
  }
};

export default reducer;
