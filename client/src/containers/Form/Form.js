import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCat } from '../../actions/cat';

const Form = ({ addCat }) => {
  const [catData, setCatData] = useState({
    name: '',
    breed: '',
  });

  const { name, breed } = catData;

  const onChange = (e) =>
    setCatData({ ...catData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(catData);
    addCat(name, breed);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          placeholder="Breed"
          name="breed"
          value={breed}
          onChange={(e) => onChange(e)}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default connect(null, { addCat })(Form);
