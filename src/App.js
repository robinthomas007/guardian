import React, { Component } from 'react';

import LeftNav from './components/leftNav';
import TopNav from './components/topNav';
import Content from './components/content';

class App extends Component {
  render() {
    return (
      <section class="container-fluid h-100">
          <LeftNav />
          <Content />
      </section>
    );
  }
}

export default App;
