import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { loadState } from './localStorage';
import history from './history';
import { routerMiddleware } from 'react-router-redux';

const persistedState = loadState();

const middleware = routerMiddleware(history);

const configureStore = middleware => createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk),
  applyMiddleware(middleware)
);

export default configureStore;
