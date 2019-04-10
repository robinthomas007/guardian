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
            user : JSON.parse(sessionStorage.getItem('user')),
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

            console.log('-- LABELS --')
            console.log(labels)

            sessionStorage.setItem('user', JSON.stringify(user))
        }

        console.log('------ USER LABELS to SESSION ------')
        console.log(user)
        console.log('------------------------------------')
    }

    componentDidMount() {
        const fetchHeaders = new Headers(
            {
                "Content-Type" : "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        const fetchBody = JSON.stringify( {
            User : {
                email : JSON.parse(sessionStorage.getItem('user')).email
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

                console.log(' -- Releasing Labels -- ')
                console.log(userJSON.ReleasingLabels)
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