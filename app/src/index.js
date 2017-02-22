/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import ReactDOM from  'react-dom';
import MainLayout from './components/MainLayout';
import Calc from './components/calc/Calc';
import Main from './components/main/Main';


import store from './stores/store';
import { Provider } from 'react-redux';


import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'

import { Router, Route, IndexRoute, browserHistory} from 'react-router';

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Main} ></IndexRoute>
        <Route path="calc" component={Calc}></Route>
      </Route>
    </Router>
  </Provider>
  , app
);
