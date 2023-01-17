import React, { Component } from 'react';
import RequestAccessModal from '../../modals/RequestAccessModal';
import './HomePage.css';
import GuardianLogo from 'images/guardian-logo.png';
import { showNotyInfo, showNotyAutoError, getCookie } from 'components/Utils';
import { withTranslation } from 'react-i18next';
import LanguageDropdown from '../../common/LanguageDropdown';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from './../../../App';

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
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const accesstoken = getCookie('guardian_auth');
    let user = {};
    try {
      user = jwt_decode(accesstoken);
    } catch (err) {
      console.log(err);
    }
    if (user && user.email) {
      this.props.history.push('/findProject');
    }
  }

  async login() {
    const accesstoken = getCookie('guardian_auth');
    let user = {};
    try {
      user = jwt_decode(accesstoken);
    } catch (err) {
      console.log(err);
    }
    if (!user || (user && !user.email)) {
      window.location.href = BASE_URL;
    } else {
      this.props.history.push('/findProject');
    }
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
    showNotyInfo('Your request for access to the Guardian has been successfully sent.');
  }

  showRequestAccessError(e) {
    showNotyAutoError(
      'Your request for access to the Guardian has encountered an error, please try again. Or contact the Guardian team for assistance.',
    );
  }

  handleHelpClick = () => {
    this.props.history.push({ pathname: '/helpGuide/' });
  };

  render() {
    const { t } = this.props;
    // if (this.state.authenticated === null) return null;

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
              <LanguageDropdown />
            </li>
            <li>
              <a href onClick={this.handleHelpClick}>
                {t('home:HelpGuide')}
              </a>
            </li>
            <li>
              <a href onClick={this.showRequestModal}>
                {t('home:RequestAccess')}
              </a>
            </li>
            <li>
              <a href onClick={this.login}>
                {t('home:LogIn')}
              </a>
            </li>
          </ul>
        </nav>

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
      </section>
    );
  }
}

export default withTranslation('home')(HomePage);
