import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const initCats = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .get('/cats', config)
    .then((response) => {
      const responseData = response.data;
      // console.log('get cat success');

      const loadedCats = [];
      for (const key in responseData) {
        loadedCats.push({
          id: responseData[key]._id,
          name: responseData[key].name,
          breed: responseData[key].breed,
        });
      }

      dispatch({
        type: actionTypes.INIT_CATS,
        payload: { cats: loadedCats },
      });
    })
    .catch((error) => {
      console.log('ERROR: Unable to get cat' + error);
    });
};

export const addCat = (name, breed) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, breed });
  console.log(body);

  axios
    .post('/cats', body, config)
    .then((response) => {
      const id = response.data._id;
      const addedCat = { name, breed, id };

      dispatch({
        type: actionTypes.ADD_CAT,
        payload: { cat: addedCat },
      });

      // console.log('add cat success');
      // console.log(response.data.name);
    })
    .catch((error) => {
      console.log('ERROR: Unable to create cat' + error);
    });
};

export const deleteCat = (id) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .delete('/cats/' + id, config)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_CAT,
        payload: { id },
      });

      // console.log('delete cat success');
      // console.log(response.data.name);
    })
    .catch((error) => {
      console.log('ERROR: Unable to delete cat' + error);
    });
};
