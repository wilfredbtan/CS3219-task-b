import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';

import CatList from './CatList/CatList';
import CatForm from './CatForm/CatForm';
import { initCats, deleteCat, selectCat } from '../actions/cat';
import Modal from '../UI/Modal';
import useModal from '../UI/useModal';
import lambda from '../lambda';

const CatManager = () => {
  const { isShowing, toggle } = useModal();

  const [randomCatName, setRandomCatName] = useState('');

  const dispatch = useDispatch();

  const cats = useSelector((state) => state.cat.cats);

  const generateCatName = () => {
    var params = {
      FunctionName: 'generateCatNames',
    };

    lambda.invoke(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const { body } = JSON.parse(data.Payload);
        setRandomCatName(body);
      }
    });
  };

  useEffect(() => {
    dispatch(initCats());
    generateCatName();
  }, []);

  const updateCatHandler = (cat) => {
    toggle();
    dispatch(selectCat(cat));
  };

  const removeCatHandler = (catId) => {
    dispatch(deleteCat(catId));
  };

  const generateHandler = (e) => {
    e.preventDefault();
    generateCatName();
  };

  return (
    <div className="App">
      <Modal isShowing={isShowing} hide={toggle} />
      <CatForm action={'Add'} />
      <p>Recommended cat name: {randomCatName}</p>
      <button onClick={(e) => generateHandler(e)}>Generate Cat Name!</button>
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
