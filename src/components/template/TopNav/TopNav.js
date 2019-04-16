import React, { Component } from 'react';
import config from '../../../config';
import { withAuth } from '@okta/okta-react';
import './TopNav.css'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const mockData = require('../../../mockData.json');
const user = JSON.parse(sessionStorage.getItem('user'))
let testVar = '123'


export default withAuth(class TopNav extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : {
                email : '',
                name : ''
            },
            ready : false,
            labels : []
        }

        //this.loadUserToState = this.loadUserToState.bind(this);
        this.getUserNameFromState = this.getUserNameFromState.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);

    }

    handleLogoutClick = (e) => {

        e.preventDefault();
        this.props.auth.logout('/');
        
        //clear the local storage
        localStorage.clear()

        //redirect to login page
        //this.props.history.push('')
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

    setUserLabels = (email) => {

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
                //this.setState({userName : JSON.parse(sessionStorage.getItem('user')).name})
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    componentWillMount() {
        this.setState({user : this.props.user})
        
    }

    componentDidMount() {
        this.setState( {user : JSON.parse(sessionStorage.getItem('user'))} )
    }

    getUserNameFromState() {
        const user = JSON.parse(sessionStorage.getItem('user'))

            if(user) {
                return(
                    user.name
                )
            } else {
                return(null)
            }
    }

    render() {
            return(
                <nav className="top-nav int">
                    <ul>
                        <li><a className="help" href="#" onClick={this.handleHelpClick}>Help Guide</a></li>
                        <li>Welcome, {this.getUserNameFromState()}</li>
                        <li><a href="#" onClick={this.handleLogoutClick}>Log Out</a></li>
                    </ul>
                </nav>
            )
    }
})