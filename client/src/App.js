import React, { Fragment } from 'react';

import CatList from './containers/CatList/CatList';
import Form from './containers/Form/Form';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Form />
      <CatList />
    </Fragment>
  </Provider>
);

export default App;
