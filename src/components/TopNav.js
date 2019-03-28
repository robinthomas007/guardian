import React, { Component } from 'react';
import config from '../config';
import { withAuth } from '@okta/okta-react';

const mockData = require('../mockData.json');

export default withAuth(class TopNav extends Component {
    
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
        this.props.auth.logout('/');
        
        //clear the local storage
        localStorage.clear()
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
                "Authorization" : sessionStorage.getItem('accessToken')
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

                console.log('--' + userJSON.User.name + '--')

                this.setState({userName : userJSON.User.name})
                this.setUserLabels(userJSON.ReleasingLabels)
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    render() {

        const user = JSON.parse(sessionStorage.getItem('user'));

        return(
            <nav className="top-nav int">
                <ul>
                    <li><a className="help" href="#" onClick={this.handleHelpClick}>Help Guide</a></li>
                    <li>Welcome, {user.name}</li>
                    <li><a href="#" onClick={this.handleLogoutClick}>Log Out</a></li>
                </ul>
            </nav>
        )
    }
})
