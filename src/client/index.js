import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider} from "react-redux"
import {store,persistor} from "../client/Features/store"
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
        <Provider store={store}>
        <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          </PersistGate>
          </BrowserRouter>
        </Provider>
        , document.getElementById('root'));