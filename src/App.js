import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';


import Oops from './components/Oops/Oops';
import Index from './components/Index/Index';
import FormRegister from './components/FormRegister/FormRegister';
import Config from './components/Config/Config';
import FormLogin from './components/FormLogin/FormLogin';
import Home from './components/Home/Home';

export default class App extends Component {

  render() {
    //const loadIndex = () => window.location.reload();

    return (
      <Router>
        <Switch>
          <Route path='/oops' component={Oops} />
          <Route path='/register' component={FormRegister} />
          <Route path='/config' component={Config} />
          <Route path='/login' component={FormLogin} />
          <Route path='/home' component={Home} />
          <Route path='/' component={Index} />
        </Switch>

      </Router>


    );
  }
}

//export default App;
