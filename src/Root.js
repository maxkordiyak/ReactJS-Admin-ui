import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './store/history';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'react-router-redux'
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history} basename={process.env.PUBLIC_URL}>
        <App/>
    </ConnectedRouter>
  </Provider>
);

export default Root;
