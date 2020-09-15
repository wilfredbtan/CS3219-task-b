import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { connect } from 'react-redux';
import { addCat } from '../../actions/cat';

import Card from '../../UI/Card';
import './CatForm.css';

const CatForm = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredBreed, setEnteredBreed] = useState('');

  const dispatch = useDispatch();

  const onCatAdded = (name, breed) => dispatch(addCat(name, breed));

  const submitHandler = (e) => {
    e.preventDefault();
    onCatAdded(enteredName, enteredBreed);
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
            <input type="submit" value="Add" />
          </div>
        </form>
      </Card>
    </section>
  );
};

export default CatForm;
