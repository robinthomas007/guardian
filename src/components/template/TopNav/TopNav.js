import React, { Component } from 'react';
import config from '../../../config';
import { withAuth } from '@okta/okta-react';
import './TopNav.css'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const mockData = require('../../../mockData.json');

export default withAuth(class TopNav extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : {
                name : "",
                email : ""
            },
            labels : []
        }

        //this.updateState = this.updateState.bind(this);
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
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(labels && user) {
            user.labels = labels;
            sessionStorage.setItem('user', JSON.stringify(user))

        }

        console.log('------ USER LABELS to SESSION ------')
        console.log(user)
        console.log('------------------------------------')
    }

    componentDidMount() {
        
        this.setState({user : JSON.parse(sessionStorage.getItem('user'))})

        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        console.log(
            'FH: ' + this.state.user.email
        )

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : this.state.user.email
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
                this.setUserLabelsSessionData(userJSON.ReleasingLabels)
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
                    <li>Welcome, {this.state.user.name}</li>
                    <li><a href="#" onClick={this.handleLogoutClick}>Log Out</a></li>
                </ul>
            </nav>
        )
    }
})