// NOTE: make sure polyfills stay at the top of the file
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import styles
import 'css/index.css';
import 'css/header.css';
import 'css/okta-overide.css';

import App from './App';
import configureStore from './redux/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
