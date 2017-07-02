import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { createStore } from './store/store';
import { countReducer } from './reducers/count';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider store={createStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
