import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import LeftNav from './leftNav';
import Content from './content';
import { timingSafeEqual } from 'crypto';


class Login extends Component {

    constructor() {
        super();

        this.state = {
            loggedIn : false
        }

    }

    render() {
        return (
            <BrowserRouter>
                 <div className="row h-100 no-gutters">
                    <LeftNav />
                    <Content />
                    <Redirect to='/releaseInformation' />
                </div>
            </BrowserRouter>
        )
    }
}

export default Login;