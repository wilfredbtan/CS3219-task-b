import React, { Fragment } from 'react';
import './App.css';

import CatList from './containers/CatList/CatList';
import Form from './containers/Form/Form';

const App = () => (
  <Fragment>
    <Form />
    <CatList />
  </Fragment>
);

export default App;
