import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Main from './views/Main';

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
