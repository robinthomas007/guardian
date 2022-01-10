import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget/dist/js/okta-sign-in.min';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import GuardianLogo from 'images/guardian-logo.png';
import './okta-overide.css';
import { withTranslation } from 'react-i18next';

class OktaSignInWidget extends Component {
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
    const { t } = this.props;
    return (
      <section className="container-fluid landing okta">
        <section className="logo">
          <img src={GuardianLogo} alt="guardian-logo" />
        </section>

        <section className="over-bar">
          <h1>{t('home:WelcomeToTheGuardian')} </h1>
          <h2>{t('home:ContentProtection')}</h2>
          <span>
            <button id="loginRequestAccess" className="access btn" onClick={this.showRequestModal}>
              {t('home:RequestAccess')}
            </button>
            <button id="loginLogIn" className="log-in btn" onClick={this.login}>
              {t('home:LogIn')}
            </button>
          </span>
        </section>

        <section className="bar"></section>
        <div className="fade modal-backdrop show"></div>
      </section>
    );
  }
}

export default withTranslation('home')(OktaSignInWidget);
