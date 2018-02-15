import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { saveState } from './store/localStorage'

const store = configureStore();

store.subscribe(() => {
  saveState({
    user: store.getState().user
  });
});

const rootEl = document.getElementById('root');

render(<Root store={store}/>, rootEl);

registerServiceWorker();

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default;

    render(<NextRoot store={store}></NextRoot>, rootEl);
  });
}
