import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import LoginPage from './components/pages/HomePage/HomePage';
import Login from './login';
import Content from './components/content';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import UploadProgressAlert from './components/SharedPageComponents/UploadProgresAlert';
import { createBrowserHistory } from 'history';
import Toaster from 'component_library/Toaster';

const history = createBrowserHistory();
const config = Object.freeze(window.env);

function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component {
  componentDidMount() {
    //clear the local storage
    localStorage.removeItem('projectData');
    this.initializeReactGA();
  }

  initializeReactGA = () => {
    ReactGA.initialize(process.env.REACT_APP_GA_KEY);
    history.listen(location => {
      ReactGA.pageview(location.pathname);
    });
  };

  render() {
    return (
      <>
        <UploadProgressAlert />
        <Toaster />
        <Router history={history}>
          <Security
            issuer={config.okta.issuer}
            client_id={config.okta.client_id}
            redirect_uri={window.location.origin + '/implicit/callback'}
            onAuthRequired={onAuthRequired}
            pkce={true}
          >
            <Switch>
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/" exact={true} component={LoginPage} />
              <Route path="/login" render={() => <Login baseUrl={config.okta.base_url} />} />

              <SecureRoute path="/" component={Content} />
            </Switch>
          </Security>
        </Router>
      </>
    );
  }
}

export default App;
