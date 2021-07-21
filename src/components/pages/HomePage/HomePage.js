import React, { Component } from 'react';
import RequestAccessModal from '../../modals/RequestAccessModal';
import Noty from 'noty';
import './HomePage.css';
import { withAuth } from '@okta/okta-react';
import GuardianLogo from 'images/guardian-logo.png';
import { showNotyInfo, showNotyAutoError } from 'components/Utils';

export default withAuth(
  class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showRequestModal: false,
        showOktaWidget: false,
        authenticated: null,
      };
      this.showRequestModal = this.showRequestModal.bind(this);
      this.hideRequestModal = this.hideRequestModal.bind(this);
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }

    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    async login() {
      return this.props.history.push('/findProject');
    }

    async logout() {
      this.props.auth.logout('/');
    }

    state = {
      redirect: false,
    };

    showRequestModal() {
      this.setState({ showRequestModal: true });
    }

    hideRequestModal() {
      this.setState({ showRequestModal: false });
    }

    showRequestAccessSent(e) {
      // new Noty({
      //   type: 'success',
      //   id: 'requestAccessSent',
      //   text: 'Your request for access to the Guardian has been successfully sent.',
      //   theme: 'bootstrap-v4',
      //   layout: 'top',
      //   timeout: '3000',
      // }).show();
      showNotyInfo('Your request for access to the Guardian has been successfully sent.');
    }

    showRequestAccessError(e) {
      // new Noty({
      //   type: 'error',
      //   id: 'requestAccessError',
      //   text:
      //     'Your request for access to the Guardian has encountered an error, please try again. Or contact the Guardian team for assistance.',
      //   theme: 'bootstrap-v4',
      //   layout: 'top',
      //   timeout: '3000',
      // }).show();
      showNotyAutoError(
        'Your request for access to the Guardian has encountered an error, please try again. Or contact the Guardian team for assistance.',
      );
    }

    handleHelpClick = () => {
      this.props.history.push({ pathname: '/helpGuide/' });
    };

    render() {
      if (this.state.authenticated === null) return null;

      return (
        <section className="container-fluid landing">
          <RequestAccessModal
            showModal={this.state.showRequestModal}
            handleClose={this.hideRequestModal}
          />
          <section className="logo">
            <img src={GuardianLogo} alt="guardian-logo" />
          </section>
          <nav className="top-nav ext">
            <ul>
              <li>
                <a onClick={this.handleHelpClick}>Help Guide</a>
              </li>
              <li>
                <a onClick={this.showRequestModal}>Request Access</a>
              </li>
              <li>
                <a onClick={this.login}>Log In</a>
              </li>
            </ul>
          </nav>

          <section className="over-bar">
            <h1>WELCOME TO THE GUARDIAN</h1>
            <h2>CONTENT PROTECTION, LEAK DETECTION &amp; ANTI-PIRACY</h2>
            <span>
              <button
                id="loginRequestAccess"
                className="access btn"
                onClick={this.showRequestModal}
              >
                Request Access
              </button>
              <button id="loginLogIn" className="log-in btn" onClick={this.login}>
                Log In
              </button>
            </span>
          </section>

          <section className="bar"></section>
        </section>
      );
    }
  },
);
