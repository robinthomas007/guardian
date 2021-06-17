import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import GuardianLogo from 'images/guardian-logo.png';

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      authParams: {
        pkce: true,
      },
      features: {
        registration: false, // Enable self-service registration flow
        rememberMe: true,
      },
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return (
      <section className="container-fluid landing okta">
        <section className="logo">
          <img src={GuardianLogo} alt="guardian-logo" />
        </section>

        <section className="over-bar">
          <h1>WELCOME TO THE GUARDIAN</h1>
          <h2>CONTENT PROTECTION, LEAK DETECTION &amp; ANTI-PIRACY</h2>
          <span>
            <button id="loginRequestAccess" className="access btn" onClick={this.showRequestModal}>
              Request Access
            </button>
            <button id="loginLogIn" className="log-in btn" onClick={this.login}>
              Log In
            </button>
          </span>
        </section>

        <section className="bar"></section>
        <div className="fade modal-backdrop show"></div>
      </section>
    );
  }
}
