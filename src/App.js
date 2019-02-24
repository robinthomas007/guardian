import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import {LoginPage} from './components/pages';

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
        <Route exact path="/" component={LoginPage}></Route>
    </BrowserRouter>
    )

  }
}

export default App;
