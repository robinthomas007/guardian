import React, { Component } from 'react';
import config from '../config';

const mockData = require('../mockData.json');

class TopNav extends Component {
  
    constructor() {
        super();

        this.state = {
            userName : '',
            labels : [
            ]
        }
    }

    handleLogoutClick = (e) => {
        e.preventDefault();
        return(
            alert('Log Out')
        )
    }

    handleHelpClick = (e) => {
        e.preventDefault();
        return(
            alert('Help Guide')
        )
    }

    setUserLabels = (labels) => {
        const userLabels = labels.map( (label) => 
            label.name
        )
        this.setState({labels : userLabels})
    }

    componentDidMount() {

        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                'X-API-KEY': config.api.key
            }
        )
        const fetchBody = JSON.stringify( {
            "UserToken" : "0"
        })

        fetch ('https://api-dev.umusic.net/guardian/login', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        )
        .then (userJSON => 
            {
                console.log(JSON.stringify(userJSON));
                this.setState({userName : userJSON.User.name})
                this.setUserLabels(userJSON.ReleasingLabels)
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    render() {
        return(
            <nav className="top-nav int">
                <ul>
                    <li><a className="help" href="#" onClick={this.handleHelpClick}>Help Guide</a></li>
                    <li>Welcome, {this.state.userName}</li>
                    <li><a href="#" onClick={this.handleLogoutClick}>Log Out</a></li>
                </ul>
            </nav>
        )
    }
}

export default TopNav;