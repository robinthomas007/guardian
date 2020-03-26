import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga'; 

import LoginPage from './components/pages/HomePage/HomePage';
import Login from './login';
import Content from './components/content';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { withRouter } from 'react-router';

const config = Object.freeze(window.env);

function onAuthRequired({history}) {
    history.push('/login');
  }

class App extends Component {
    componentDidMount() {
        //clear the local storage
        localStorage.removeItem('projectData');
    }

    initializeReactGA() {
        ReactGA.initialize('UA-150085816-1');
        ReactGA.pageview('/');
    }

    render() {
        return (
            <Router>
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
                        <Route path='/login' render={() => <Login baseUrl={config.okta.base_url} />} />

                        <SecureRoute path="/" component={Content} />
                        <SecureRoute path="/" render={() => <Content props={this.props} />} />
                    </Switch>
                </Security>
            </Router>
        );
    }
}

export default App;
