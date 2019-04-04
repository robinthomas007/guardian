import React, { Component } from 'react';
import config from '../../../config';
import { withAuth } from '@okta/okta-react';
import './TopNav.css'

const mockData = require('../../../mockData.json');

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

    setUserLabelsSessionData = (labels) => {
        const userSessionDataObj = JSON.parse(sessionStorage.getItem('user'))
        if(labels && userSessionDataObj) {
            userSessionDataObj.labels = labels;
            sessionStorage.setItem('user', JSON.stringify(userSessionDataObj))
        }

        console.log('------ USER LABELS to SESSION ------')
        console.log(userSessionDataObj)
        console.log('------------------------------------')
    }

    componentDidMount() {

        const user = JSON.parse(sessionStorage.getItem('user'))

        console.log(user.email)

        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )
        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : user.email
            }
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
                console.log('----------- USER JSON ----------- ')
                console.log(userJSON)
                this.setUserLabelsSessionData(userJSON.ReleasingLabels)
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