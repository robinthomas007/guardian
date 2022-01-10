// NOTE: make sure polyfills stay at the top of the file
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './i18n';

// import styles
import 'css/index.css';
import 'css/header.css';

import App from './App';
import configureStore from './redux/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/*<div id="google_translate_element"></div>*/}
  </Provider>,
  document.getElementById('root'),
);
