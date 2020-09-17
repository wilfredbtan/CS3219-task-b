import axios from '../axios-cats';

import * as actionTypes from './actionsTypes';
import lambda from '../lambda';
import * as lambdaActions from './lambdaActions';

const replaceIdKey = (cat) => {
  cat['id'] = cat['_id'];
  delete cat['_id'];
  return cat;
};

export const initCats = () => async (dispatch) => {
  var params = {
    FunctionName: lambdaActions.GET_ALL,
  };

  lambda.invoke(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const { body } = JSON.parse(data.Payload);
      const loadedCats = JSON.parse(body).map((cat) => replaceIdKey(cat));

      // console.log(loadedCats);

      dispatch({
        type: actionTypes.INIT_CATS,
        payload: { cats: loadedCats },
      });
    }
  });

  // Server Code left for reference
  // axios
  //   .get('/cats')
  //   .then((response) => {
  //     const responseData = response.data;

  //     const loadedCats = [];
  //     for (const key in responseData) {
  //       loadedCats.push({
  //         id: responseData[key]._id,
  //         name: responseData[key].name,
  //         breed: responseData[key].breed,
  //       });
  //     }

  //     dispatch({
  //       type: actionTypes.INIT_CATS,
  //       payload: { cats: loadedCats },
  //     });
  //   })
  //   .catch((error) => {
  //     console.log('ERROR: Unable to get cat' + error);
  //   });
};

export const addCat = (name, breed) => (dispatch) => {
  // Need both the value and and object to be a string
  const cat = JSON.stringify({ name: name, breed: breed });
  const body = JSON.stringify({ body: cat });

  console.log(body);

  var params = {
    FunctionName: lambdaActions.CREATE,
    Payload: body,
  };

  lambda.invoke(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('returned');
      console.log(data);
      // const { body } = JSON.parse(data.Payload);
      // console.log(body);
      // const addedCat = JSON.parse(body).map((cat) => replaceIdKey(cat));

      // const id = response.data._id;
      // const addedCat = { name, breed, id };

      // dispatch({
      //   type: actionTypes.ADD_CAT,
      //   payload: { addedCat },
      // });
    }
  });

  // Server Code left for reference
  // axios
  //   .post('/cats', body)
  //   .then((response) => {
  //     const id = response.data._id;
  //     const addedCat = { name, breed, id };

  //     dispatch({
  //       type: actionTypes.ADD_CAT,
  //       payload: { addedCat },
  //     });
  //   })
  //   .catch((error) => {
  //     console.log('ERROR: Unable to create cat' + error);
  //   });
};

export const deleteCat = (id) => (dispatch) => {
  axios
    .delete('/cats/' + id)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_CAT,
        payload: { id },
      });
    })
    .catch((error) => {
      console.log('ERROR: Unable to delete cat' + error);
    });
};

export const updateCat = (name, breed, id) => (dispatch) => {
  const body = JSON.stringify({ name, breed });

  axios
    .patch('/cats/' + id, body)
    .then((response) => {
      const { name, breed, _id } = response.data;
      const updatedCat = { name, breed, id: _id };

      dispatch({
        type: actionTypes.UPDATE_CAT,
        payload: { updatedCat },
      });
    })
    .catch((error) => {
      console.log('ERROR: Unable to update cat' + error);
    });
};

export const selectCat = (selectedCat) => (dispatch) => {
  dispatch({
    type: actionTypes.SELECT_CAT,
    payload: { selectedCat },
  });
};
