import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import LoginPage from './components/pages/LoginPage';

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './config';

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
        <Security 
          issuer={config.okta.issuer}
          client_id={config.okta.client_id}
          redirect_uri={config.okta.redirect_uri}
        >
          <Route exact path="/" component={LoginPage} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
      </Security>
    </BrowserRouter>
    )

  }
}

export default App;
