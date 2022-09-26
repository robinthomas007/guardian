import React, { Component } from 'react';
import RequestAccessModal from '../../modals/RequestAccessModal';
import './HomePage.css';
// import { withAuth } from '@okta/okta-react';
import GuardianLogo from 'images/guardian-logo.png';
import { showNotyInfo, showNotyAutoError, getCookie } from 'components/Utils';
import { withTranslation } from 'react-i18next';
import LanguageDropdown from '../../common/LanguageDropdown';
import jwt_decode from 'jwt-decode';

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
    // this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // async checkAuthentication() {
  // const authenticated = await this.props.auth.isAuthenticated();
  // const authenticated = false;
  // if (authenticated !== this.state.authenticated) {
  //   this.setState({ authenticated });
  // }
  // }

  async componentDidMount() {
    // this.checkAuthentication();
    this.login();
  }

  async componentDidUpdate() {
    // this.checkAuthentication();
  }

  async login() {
    const accesstoken = getCookie('guardian_auth');
    let user = {};
    try {
      user = jwt_decode(accesstoken);
    } catch (err) {
      console.log(err);
    }
    console.log(user, 'useruseruser');
    if (!user.email) {
      window.location.href =
        'https://umgb2cnonprod.b2clogin.com/umgb2cnonprod.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_LIMITEDSIGNUPSIGNIN&client_id=6772052e-f3a9-4e5a-b40b-d7dd9f0b8168&nonce=defaultNonce&redirect_uri=https://istioli.umusic.net/oauth2/guardian-dev&scope=openid&response_type=code&prompt=login';
    } else this.props.history.push('/findProject');
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
