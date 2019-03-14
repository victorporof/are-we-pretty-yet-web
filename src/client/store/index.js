import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';

import Reducers from '../reducers';

export default createStore(Reducers, applyMiddleware(...[
  thunkMiddleware,
  promiseMiddleware,
  createLogger({ collapsed: true }),
].filter(Boolean)));
