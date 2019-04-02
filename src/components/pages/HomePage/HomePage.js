import React, { Component } from 'react';
import './HomePage.css'

const mockData = require('../../../mockData.json');

class HomePage extends Component {

    state = {
        redirect : false
    }

    login = () => {
        return(
            this.props.history.push('/releaseinformation')
        )
        
    }

    render() {

        return(

            <section className="container-fluid landing">
                <section className="logo"><img src="/static/images/guardian-logo.png" /></section>
                <nav className="top-nav ext">
                    <ul>
                        <li><a href="">Help Guide</a></li>
                        <li><a href="">Request Access</a></li>
                        <li><a href="/releaseinformation">Log In</a></li>
                    </ul>
                </nav>
    
                <section className="over-bar">
                    <h1>WELCOME TO THE GUARDIAN</h1>
                    <h2>CONTENT PROTECTION, LEAK DETECTION &amp; ANTI-PIRACY</h2>
                    <span>
                        <button className="access btn">Request Access</button>
                        <button className="log-in btn" onClick={this.login}>Log In</button>

                        {/*

                        this.props.history.push('/releaseinformation')


                        <Button
                            onClick={this.setRedirect}
                            className="log-in btn"
                        >
                            Log In
                        </Button>
                        */}
    
                    </span>
                </section>
    
                <section className="bar"></section>
                
            </section>
        )
    }
};

export default HomePage;
