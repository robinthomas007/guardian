import React, { Component } from 'react';

import LeftNav from './components/leftNav';
import Content from './content';

class App extends Component {
  render() {
    return (
      <div style={{border: 'solid 1 red', position: 'relative'}}>
          <LeftNav />
          <Content />
      </div>


    );
  }
}

export default App;
