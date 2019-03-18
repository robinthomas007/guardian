import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import LoginPage from './components/pages/LoginPage';
import Content from "./components/content";
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

    return (
      <Router>
          <Security
            issuer={config.okta.issuer}
            client_id={config.okta.client_id}
            redirect_uri={config.okta.redirect_uri}
          >
          <Switch>
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <Route path="/" exact={true} component={LoginPage} />
            <Route path="/login" exact={true} component={LoginPage} />
            <SecureRoute path="/" component={Content} />
          </Switch>
          </Security>
        
      </Router>
    );
  }
}

export default App;
