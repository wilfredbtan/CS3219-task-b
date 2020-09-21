import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCat, updateCat } from '../../actions/cat';

import Card from '../../UI/Card';
import './CatForm.css';

const CatForm = ({ action, onSubmit }) => {
  const selectedCat = useSelector((state) => state.cat.selectedCat);

  const [enteredName, setEnteredName] = useState(
    selectedCat ? selectedCat.name : ''
  );
  const [enteredBreed, setEnteredBreed] = useState(
    selectedCat ? selectedCat.breed : ''
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (enteredName === '' || enteredBreed === '') {
      return;
    }

    switch (action.toLowerCase()) {
      case 'add':
        dispatch(addCat(enteredName, enteredBreed));
        break;
      case 'update':
        dispatch(updateCat(enteredName, enteredBreed, selectedCat.id));
        onSubmit();
        break;
      default:
        break;
    }

    setEnteredName('');
    setEnteredBreed('');
  };

  return (
    <section className="cat-form">
      <Card>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={enteredName}
              onChange={(event) => {
                setEnteredName(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="breed">Breed</label>
            <input
              type="text"
              name="breed"
              value={enteredBreed}
              onChange={(event) => {
                setEnteredBreed(event.target.value);
              }}
            />
            <input type="submit" value={action} />
          </div>
        </form>
      </Card>
    </section>
  );
};

export default CatForm;
