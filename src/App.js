import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import LoginPage from './components/pages/LoginPage';
import Login from './components/Login';

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './config';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn : false
    }

    this.loginHandler = this.loginHandler.bind(this);
  };
  
  loginHandler() {
    console.log('loginhandler');
    this.setState(
      { loggedIn : true }
    )
  }
  
  render() {

    console.log(' -- ' + this.state.loggedIn)

    if(this.state.loggedIn) {
      return(
        <BrowserRouter>
          <Login loggedIn={this.state.loggedIn} />
        </BrowserRouter>
      )
    } else {
      return(
        <BrowserRouter>
            <Route exact path="/" component={ () => <LoginPage loginButtonClick={this.loginHandler} />} />
        </BrowserRouter>
      )
    }
  }
}

export default App;
