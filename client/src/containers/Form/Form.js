import React, { useState } from 'react';

const Form = (props) => {
  const [catData, setCatData] = useState({
    name: '',
    breed: '',
  });

  const { name, breed } = catData;

  const onChange = (e) =>
    setCatData({ ...catData, [e.target.name]: e.target.value });

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
      </form>
    </div>
  );
};

export default Form;
