import React, { Component } from 'react';

import LeftNav from './components/leftNav';
import TopNav from './components/topNav';
import Content from './components/content';



class App extends Component {
  render() {
    return (
      <div class="row h-100 no-gutters">
          <LeftNav />
          <Content />
        </div>
    );
  }
}

export default App;
