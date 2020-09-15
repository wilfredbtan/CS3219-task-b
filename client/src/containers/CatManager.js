import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CatList from './CatList/CatList';
import CatForm from './CatForm/CatForm';
import { initCats, deleteCat } from '../actions/cat';

const CatManager = () => {
  const dispatch = useDispatch();
  const catState = useSelector((state) => {
    return state.cat.cats;
  });

  useEffect(() => {
    dispatch(initCats());
  }, []);

  const removeCatHandler = (catId) => {
    dispatch(deleteCat(catId));
  };

  return (
    <div className="App">
      <CatForm />

      <section>
        <CatList
          cats={catState ? catState : []}
          onRemoveCat={removeCatHandler}
        />
      </section>
    </div>
  );
};

export default CatManager;
