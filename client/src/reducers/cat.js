import * as actionTypes from '../actions/actionsTypes';

// const initialState = { cats: [], selectedCatId: null };
const initialState = {};

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

const initCats = (state, { cats }) => {
  return updateObject(state, { cats });
};

const addCat = (state, { addedCat }) => {
  let updatedCats = [...state.cats];
  updatedCats.push(addedCat);
  return updateObject(state, { cats: updatedCats });
};

const deleteCat = (state, { id }) => {
  let updatedCats = [...state.cats].filter((cat) => cat.id !== id);
  return updateObject(state, { cats: updatedCats });
};

const updateCat = (state, { updatedCat }) => {
  const updatedCats = [...state.cats].map((cat) => {
    return cat.id === updatedCat.id ? updatedCat : cat;
  });

  return updateObject(state, { cats: updatedCats });
};

const selectCat = (state, { selectedCat }) => {
  return updateObject(state, { selectedCat });
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SELECT_CAT:
      return selectCat(state, payload);
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
