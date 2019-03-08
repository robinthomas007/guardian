import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import LeftNav from './leftNav';
import Content from './content';


class Login extends Component {

    constructor() {
        super();

        this.state = {
            loggedIn : ''
        };
    }

    getLandingPage = (loggedIn) => {
        if(!loggedIn) {
            return(
                <Redirect to='/releaseInformation' />
            )
        }
    }

    render() {
        return (
            <BrowserRouter>
                 <div className="row h-100 no-gutters">
                    <LeftNav />
                    <Content />
                </div>
            </BrowserRouter>
        )
    }

}


export default Login;