import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import LoginPage from './components/pages/HomePage/HomePage';
import Login from './login';
import Content from './components/content';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import UploadProgressAlert from './components/SharedPageComponents/UploadProgresAlert';
import Zendesk from 'react-zendesk';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const setting = {
  color: {
    theme: '#01579B',
  },
};

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
    ReactGA.initialize('UA-150085816-1');
    history.listen(location => {
      ReactGA.pageview(location.pathname);
    });
  };

  render() {
    return (
      <>
        <UploadProgressAlert />
        <Zendesk
          defer
          zendeskKey={'1a91aa50-32e8-4499-a3e4-4643aad1353f'}
          {...setting}
          onLoaded={() => console.log('is loaded')}
        />
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
              <SecureRoute path="/" render={() => <Content props={this.props} />} />
            </Switch>
          </Security>
        </Router>
      </>
    );
  }
}

export default App;
