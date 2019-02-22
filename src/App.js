import React, { Component } from 'react';
import LeftNav from './components/leftNav';
import Content from './components/content';
import { BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="row h-100 no-gutters">
          <LeftNav />
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
