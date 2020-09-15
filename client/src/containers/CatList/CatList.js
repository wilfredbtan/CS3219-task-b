import React from 'react';
import PropTypes from 'prop-types';

import './CatList.css';

const CatList = (props) => {
  return (
    <section className="cat-list">
      <h2>Owned Cats</h2>
      <ul>
        {props.cats.map((cat) => (
          <li key={cat.id}>
            <span>
              <b>{cat.name}</b> the {cat.breed}
            </span>
            <span>
              <button onClick={props.onUpdateCat.bind(this, cat.id)}>
                update
              </button>
              <button onClick={props.onRemoveCat.bind(this, cat.id)}>
                delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

CatList.propTypes = {
  cats: PropTypes.array.isRequired,
};

export default CatList;
