import { combineReducers } from 'redux';
import user from './user';
import place from './place';
import request from './request';
import report from './report';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  place,
  request,
  report,
  user,
  router: routerReducer
});

export default rootReducer;
