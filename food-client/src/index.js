import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from '../src/views/login/Login'
import Home from '../src/views/index.jsx'
import { createBrowserHistory } from 'history';
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
const hist = createBrowserHistory();
        function front_auth_display() {
    if (1 == 1) {
      return (

        <switch>
          <Redirect to='/' />
          <Route
            path='/'
            component={Home}
          />

        </switch>


      )
    }
    else {
      return (
        <switch>
          <Redirect to='/login' />
          <Route
            path='/login'
            component={Login}
          />
        </switch>
      )
    }
  }
ReactDOM.render(

    <Router history={hist}>
                {front_auth_display()}      
    </Router>
    
    
    , document.getElementById('root'));
registerServiceWorker();
