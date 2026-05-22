import React from 'react';

import ReactDOM from 'react-dom/client';

import {
  BrowserRouter
} from 'react-router-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import {
  ToastContainer
} from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(

  <BrowserRouter>

    <App />

    <ToastContainer
      position="top-right"
      autoClose={3000}
    />

  </BrowserRouter>

);