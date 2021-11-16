import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './react-toastify-override.css';

export default () => (
  <ToastContainer
    closeButton={false}
    position="top-right"
    autoClose={false}
    hideProgressBar={false}
    closeOnClick
    rtl={false}
    draggable={false}
    pauseOnFocusLoss={false}
    pauseOnHover={false}
  />
);
