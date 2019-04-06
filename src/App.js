import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoginPage from './components/pages/HomePage/HomePage';
import Content from "./components/content";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import config from './config';

class App extends Component {

  componentDidMount() {

    //clear the local storage
    localStorage.removeItem('projectData')
  };

  render() {
    return (
      <Router>
          <Security 
            issuer={config.okta.issuer}
            client_id={config.okta.client_id}
            redirect_uri={config.okta.redirect_uri}
            className={'h-100'}
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
};

export default App;
