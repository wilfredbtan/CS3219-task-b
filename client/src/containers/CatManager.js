import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';

import CatList from './CatList/CatList';
import CatForm from './CatForm/CatForm';
import { initCats, deleteCat, selectCat } from '../actions/cat';
import Modal from '../UI/Modal';
import useModal from '../UI/useModal';

const CatManager = () => {
  const { isShowing, toggle } = useModal();

  const dispatch = useDispatch();

  const cats = useSelector((state) => state.cat.cats);

  useEffect(() => {
    dispatch(initCats());
  }, []);

  const updateCatHandler = (cat) => {
    toggle();
    dispatch(selectCat(cat));
  };

  const removeCatHandler = (catId) => {
    dispatch(deleteCat(catId));
  };

  return (
    <div className="App">
      <Modal isShowing={isShowing} hide={toggle} />
      <CatForm action={'Add'} />
      <section>
        <CatList
          cats={cats ? cats : []}
          onUpdateCat={updateCatHandler}
          onRemoveCat={removeCatHandler}
        />
      </section>
    </div>
  );
};

export default CatManager;
