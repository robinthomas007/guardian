import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import {LoginPage} from './components/pages';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

const config = {
  issuer: 'https://dev-192402.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oaji620egWzO8C8A0h7'
}

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };

  }

  render() {
    return(
     <BrowserRouter>
        <Security issuer={config.issuer}
          client_id={config.client_id}
          redirect_uri={config.redirect_uri}
        >
          <Route exact path="/" component={LoginPage} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
      </Security>
    </BrowserRouter>
    )

  }
}

export default App;
