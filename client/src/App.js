import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import CatManager from './containers/CatManager';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <CatManager />
    </Fragment>
  </Provider>
);

export default App;
