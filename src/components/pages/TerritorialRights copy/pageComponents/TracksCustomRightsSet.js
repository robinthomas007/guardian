import React, { Component } from 'react';

class TracksCustomRightsSet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Custom Rights Sets
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Custom Rights Set 1
          </a>
          <a className="dropdown-item" href="#">
            Custom Rights Set 2
          </a>
          <a className="dropdown-item" href="#">
            Custom Rights Set 3
          </a>
        </div>
      </div>
    );
  }
}

export default TracksCustomRightsSet;
