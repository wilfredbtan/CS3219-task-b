import React from 'react';
import CatListItem from '../CatListItem/CatListItem';

const cats = [{ name: 'Tom' }, { name: 'Bob' }, { name: 'Swag' }];

const CatList = (props) => {
  return (
    <div>
      {cats.map((cat) => (
        <CatListItem name={cat.name} />
      ))}
    </div>
  );
};

export default CatList;
