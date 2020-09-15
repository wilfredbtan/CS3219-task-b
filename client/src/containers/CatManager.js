import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CatList from './CatList/CatList';
import CatForm from './CatForm/CatForm';
// import { getCats } from '../actions/cat';

const CatManager = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.get('/cats', config).then((response) => {
      const responseData = response.data;
      const loadedCats = [];
      for (const key in responseData) {
        loadedCats.push({
          id: key,
          name: responseData[key].name,
          breed: responseData[key].breed,
        });
      }
      setCats(loadedCats);
    });
    // getCats()
  }, []);

  const removeCatHandler = (catId) => {
    setCats((prevCats) => prevCats.filter((cat) => cat.id !== catId));
  };

  return (
    <div className="App">
      <CatForm />

      <section>
        <CatList cats={cats} onRemoveCat={removeCatHandler} />
      </section>
    </div>
  );
};

export default CatManager;
