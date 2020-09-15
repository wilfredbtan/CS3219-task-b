import * as actionTypes from '../actions/actionsTypes';

const initialState = [];

const initCats = (state, { cats }) => {
  return updateObject(state, { cats });
};

const addCat = (state, { cat }) => {
  let updatedCats = [...state.cats];
  updatedCats.push(cat);
  return updateObject(state, { cats: updatedCats });
};

const deleteCat = (state, { id }) => {
  let updatedCats = [...state.cats].filter((cat) => cat.id !== id);
  // console.log('delete reducer: ' + state);
  return updateObject(state, { cats: updatedCats });
};

const updateCat = (state, { updatedCat }) => {
  const updatedCats = [...state.cats].map((cat) => {
    return cat.id === updatedCat.id ? updatedCat : cat;
  });

  // console.log('update reducer: ' + state);
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
    case actionTypes.UPDATE_CAT:
      return updateCat(state, payload);
    default:
      return state;
  }
};

export default reducer;
