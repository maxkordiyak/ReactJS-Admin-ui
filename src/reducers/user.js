import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGIN_ERROR } from '../actions';

export default (state = { data: null, isAuthenticated: false, errorMessage: "" }, action) => {
  const { type, isAuthenticated, user, data, errorMessage } = action;

  switch (type) {
  case USER_LOGGED_IN:
    return Object.assign({}, state, {
      isAuthenticated: true, data: user
    })
  case USER_LOGGED_OUT:
    return Object.assign({}, state, {
      isAuthenticated: false, data: null
    })
  case USER_LOGIN_ERROR:
    return Object.assign({}, state, {
      errorMessage: errorMessage
    })
  default:
    return state;
  }
};
