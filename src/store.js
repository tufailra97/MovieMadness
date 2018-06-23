import { createStore, applyMiddleware, compose } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware),
  )
);

export default store;
