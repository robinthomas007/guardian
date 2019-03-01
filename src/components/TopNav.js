import React, { Component } from 'react';

const mockData = require('../mockData.json');

class TopNav extends Component {
  
    handleClick = (e) => {
        e.preventDefault();
        return(
            alert('Log Out')
        )
    }

    render() {
        return(
            <nav className="top-nav int">
                <ul>
                    <li><a className="help" href="help-guide.html">Help Guide</a></li>
                    <li>Welcome, {mockData.user.firstName} {mockData.user.lastName}</li>
                    <li><a href="#" onClick={this.handleClick}>Log Out</a></li>
                </ul>
            </nav>
        )
    }
}

export default TopNav;