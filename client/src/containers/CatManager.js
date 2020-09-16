import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';

import CatList from './CatList/CatList';
import CatForm from './CatForm/CatForm';
import { initCats, deleteCat, updateCat } from '../actions/cat';
import Modal from '../UI/Modal';
import useModal from '../UI/useModal';

const CatManager = () => {
  const { isShowing, toggle } = useModal();

  const dispatch = useDispatch();
  const catState = useSelector((state) => {
    return state.cat.cats;
  });

  useEffect(() => {
    dispatch(initCats());
  }, []);

  const updateCatHandler = (catId) => {
    dispatch(updateCat(catId));
  };

  const removeCatHandler = (catId) => {
    dispatch(deleteCat(catId));
  };

  return (
    <div className="App">
      <button className="button-default" onClick={toggle}>
        Show Modal
      </button>
      <Modal isShowing={isShowing} hide={toggle} />
      <CatForm />
      <section>
        <CatList
          cats={catState ? catState : []}
          onUpdateCat={updateCatHandler}
          onRemoveCat={removeCatHandler}
        />
      </section>
    </div>
  );
};

export default CatManager;
