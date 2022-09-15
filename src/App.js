import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import Home from 'components/pages/HomePage/HomePage';
import Login from './login';
import Content from 'components/content';
import { createBrowserHistory } from 'history';
import Toaster from 'component_library/Toaster';

const history = createBrowserHistory();
const config = Object.freeze(window.env);

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
        <Toaster />
        <Router history={history}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" render={() => <Login baseUrl={config.okta.base_url} />} />
            <Route path="/" component={Content} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
