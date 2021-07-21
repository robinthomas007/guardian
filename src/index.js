// NOTE: make sure polyfills stay at the top of the file
import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import styles
import 'css/index.css';
import 'css/header.css';
import 'css/okta-overide.css';
import 'react-toastify/dist/ReactToastify.css';
import 'css/react-toastify-override.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
