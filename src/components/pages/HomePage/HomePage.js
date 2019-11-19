import React, { Component } from 'react';
import RequestAccessModal from '../../modals/RequestAccessModal';
import OktaSignInWidget from 'OktaSignInWidget';
import Noty from 'noty';
import './HomePage.css'


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRequestModal : false,
            showOktaWidget : false
        }
        this.showRequestModal = this.showRequestModal.bind(this);
        this.hideRequestModal = this.hideRequestModal.bind(this);
        // this.showOktaWidget = this.showOktaWidget.bind(this);
        // this.hideOktaWidget = this.hideOktaWidget.bind(this);
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

    /*
    showOktaWidget() {
        this.setState({showOktaWidget : true})
    }

    hideOktaWidget() {
        this.setState({showOktaWidget : false})
    }
*/
    showRequestAccessSent(e) {
        new Noty ({
            type: 'success',
            id:'requestAccessSent',
            text: 'Your request for access to the Guardian has been successfully sent.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()
    };

    showRequestAccessError(e) {
        new Noty ({
            type: 'error',
            id:'requestAccessError',
            text: 'Your request for access to the Guardian has encountered an error, please try again. Or contact the Guardian team for assistance.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()
    };

 handleHelpClick = () =>{
    this.props.history.push({ pathname : '/helpGuide/'
                    }) 
 }

    render() {

        return(

            <section className="container-fluid landing">
                <RequestAccessModal showModal={this.state.showRequestModal} handleClose={this.hideRequestModal}/>
                {/* <OktaSignInWidget showOktaWidget={this.state.showOktaWidget} handleClose={this.hideOktaWidget}/> */}
                <section className="logo"><img src="/static/images/guardian-logo.png" /></section>
                <nav className="top-nav ext">
                    <ul>
                        <li><a onClick={this.handleHelpClick}>Help Guide</a></li>
                        <li><a onClick={this.showRequestModal}>Request Access</a></li>
                        <li><a onClick={this.login}>Log In</a></li>
                    </ul>
                </nav>
    
                <section className="over-bar">
                    <h1>WELCOME TO THE GUARDIAN</h1>
                    <h2>CONTENT PROTECTION, LEAK DETECTION &amp; ANTI-PIRACY</h2>
                    <span>
                        <button id="loginRequestAccess" className="access btn" onClick={this.showRequestModal}>Request Access</button>
                        <button id="loginLogIn" className="log-in btn" onClick={this.login} /* onClick={this.props.showOktaWidget} */ >Log In</button>
                    </span>
                </section>
    
                <section className="bar"></section>
                
            </section>
        )
    }
};

export default HomePage;
