import React, { Component } from 'react';
import RequestAccessModal from '../../modals/RequestAccessModal';
import './HomePage.css'

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRequestModal : false
        }
        this.showRequestModal = this.showRequestModal.bind(this);
        this.hideRequestModal = this.hideRequestModal.bind(this);
    }

    state = {
        redirect : false
    }

    login = () => {
        return(
            this.props.history.push('/findProject')
        )
        
    }

    showRequestModal() {
        this.setState({showRequestModal : true})
    }

    hideRequestModal() {
        this.setState({showRequestModal : false})
    }

    render() {

        return(

            <section className="container-fluid landing">
                <RequestAccessModal showModal={this.state.showRequestModal} handleClose={this.hideRequestModal}/>
                <section className="logo"><img src="/static/images/guardian-logo.png" /></section>
                <nav className="top-nav ext">
                    <ul>
                        <li><a href="">Help Guide</a></li>
                        <li><a href="">Request Access</a></li>
                        <li><a href="" onClick={this.login}>Log In</a></li>
                    </ul>
                </nav>
    
                <section className="over-bar">
                    <h1>WELCOME TO THE GUARDIAN</h1>
                    <h2>CONTENT PROTECTION, LEAK DETECTION &amp; ANTI-PIRACY</h2>
                    <span>
                        <button id="loginRequestAccess" className="access btn" onClick={this.showRequestModal}>Request Access</button>
                        <button id="loginLogIn" className="log-in btn" onClick={this.login}>Log In</button>
                    </span>
                </section>
    
                <section className="bar"></section>
                
            </section>
        )
    }
};

export default HomePage;
