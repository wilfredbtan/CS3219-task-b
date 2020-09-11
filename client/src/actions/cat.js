import uuid from 'uuid';
import axios from 'axios';

import * as actionTypes from './actionsTypes';

export const addCat = (name, breed) => async (dispatch) => {
  const id = uuid.v4();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, breed });

  try {
    const res = await axios.post('/cats', body, config);
    dispatch({
      type: actionTypes.ADD_CAT,
      payload: { name, breed, id },
    });
    console.log('add cat success');
    console.log(res.data.name);
  } catch (e) {
    console.log('ERROR: Unable to create cat' + e);
  }
};
