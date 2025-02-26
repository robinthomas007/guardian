import React, { Component } from 'react';
import Header from './template/Header/Header';
import TrackInformationPage from './pages/TrackInformation/TrackInformationPage';
import ProjectContactsPage from './pages/ProjectContacts/ProjectContactsPage';
import AudioFilesPage from './pages/AudioFiles/AudioFilesPage';
import ReviewAndSubmitPage from './pages/ReviewAndSubmit/ReviewAndSubmitPage';
import BlockingPoliciesPage from './pages/BlockingPolicies/BlockingPoliciesPage';
import TerritorialRightsPage from './pages/TerritorialRights/TerritorialRightsPage';
import ReleaseInformationPage from './pages/ReleaseInformation/ReleaseInformationPage';
import FindProjectPage from './pages/FindProject/FindProjectPage';
import HelpGuide from './pages/HelpGuide/HelpGuidePage';
import UserAdmin from './pages/UserAdmin/UserAdmin';
import { connect } from 'react-redux';
import ProjectInbox from './pages/ProjectInbox';
import ErrorBoundary from './common/ErrorBoundary';
import * as releaseAction from './pages/ReleaseInformation/releaseAction';
import * as territorialRightsAction from '../actions/territorialRightsAction';
import UploadProgressAlert from 'components/SharedPageComponents/UploadProgresAlert';
import { showNotyMaskWarning, getCookie, deleteCookie, LOGOUT_URL } from 'components/Utils';
import { Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import _ from 'lodash';

class Content extends Component {
  constructor(props) {
    const uuidv4 = require('uuid/v4');

    super(props);
    this.state = {
      accesstoken: '',
      user: {},
      isAdmin: false,
      userLoaded: false,
      sessionId: uuidv4(),
      pageViewCompact: true,
      projectID: '',
      pagePath: '',
      projectStatus: null,
      mediaType: JSON.parse(localStorage.getItem('mediaType')),
      project: {
        Project: {},
      },
      serverTimeDate: '',
      clearProject: false,
      prevLocation: '',
    };
    this.setProjectID = this.setProjectID.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      if (this.props.location.pathname === '/findProject') {
        this.setState({ prevLocation: 'findProject' });
      } else this.setState({ prevLocation: '' });
    }
  }

  async checkAuthentication() {
    const accesstoken = getCookie('guardian_auth');
    let user = {};
    try {
      user = jwt_decode(accesstoken);
    } catch (err) {
      console.log(err);
    }

    if (!user.email) {
      this.props.history.push('/');
    }

    this.setState({ accesstoken });
    sessionStorage.setItem('accessToken', accesstoken);
    sessionStorage.setItem('user', JSON.stringify(user));

    this.setState({ user: user }, () => {
      this.getUserData();
    });
  }

  getUserData(lang) {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: this.state.accesstoken,
    });

    const fetchBody = JSON.stringify({
      User: {
        email: this.state.user.email,
      },
      languagecode: lang || localStorage.getItem('languageCode') || 'en',
    });

    fetch(window.env.api.url + '/login', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        if (response.status === 403 || response.status === 401) {
          deleteCookie('guardian_auth');
          this.props.history.push('/');
          return {};
        }
        return response.json();
      })
      .then(userJSON => {
        if (!_.isEmpty(userJSON)) {
          const newUserObj = Object.assign(userJSON, this.state.user);
          this.setState({
            user: newUserObj,
            userLoaded: true,
          });
          sessionStorage.setItem('user', JSON.stringify(newUserObj));
          sessionStorage.setItem('accessToken', this.state.accesstoken);
        }
      })
      .catch(error => console.error(error));
  }

  showNotiBarIfMasked = response => {
    if (response.Project && response.Project.isMasked) {
      showNotyMaskWarning(this.props.t('contact:maskWarning'), () => {}, 10);
    }
  };

  handleProjectDataLoad = pagePath => {
    if (pagePath && pagePath !== '' && this.state.projectID !== '') {
      const fetchHeaders = new Headers({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken'),
      });

      const fetchBody = JSON.stringify({
        PagePath: pagePath,
        ProjectID: this.state.projectID ? this.state.projectID : '',
        languagecode: localStorage.getItem('languageCode') || 'en',
      });

      fetch(window.env.api.url + '/project/review', {
        method: 'POST',
        headers: fetchHeaders,
        body: fetchBody,
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          // this.showNotiBarIfMasked(responseJSON);
          return this.state.project !== responseJSON
            ? this.setState({ project: responseJSON })
            : '';
        })
        .catch(error => {
          console.error(error);
          this.setState({ showloader: false });
        });
    }
  };

  updateHistory(projectID) {
    this.props.history.push('/reviewSubmit/' + projectID);
    this.setProjectID(projectID, '/reviewSubmit/' + projectID);
  }

  setProjectID(pid, pagePath) {
    if (!pid) {
      this.setState({ projectID: '' });
    }
    if (pid && this.state.projectID !== pid) {
      this.setState({ projectID: pid }, () => {
        this.handleProjectDataLoad(pagePath);
      });
    } else {
      if (pagePath && this.state.pagePath !== pagePath) {
        //For blocking, We can't call the review api on the submit and preview page. So we are calling here.
        if (this.state.pagePath.includes('blockingPolicies')) {
          this.setState({ pagePath: pagePath }, () => {
            this.handleProjectDataLoad(pagePath);
          });
        } else {
          this.setState({ pagePath: pagePath });
        }
      }
    }
  }

  setPageViewType = isCompactView => {
    return this.state.pageViewCompact !== isCompactView
      ? this.setState({ pageViewCompact: isCompactView })
      : null;
  };

  clearProject = () => {
    const blankProject = {
      Project: {},
    };
    localStorage.removeItem('projectData');
    localStorage.removeItem('upc');
    this.props.initializeUpcData();
    this.props.initializeRightsData();
    this.setState(
      {
        project: blankProject,
        clearProject: true,
        projectStatus: this.props.t('header:InProgress'),
      },
      () => this.setState({ clearProject: false }),
    );
  };

  handleLogoutClick = e => {
    e.preventDefault();
    deleteCookie('guardian_auth');
    localStorage.clear();
    // this.props.history.push('/');
    window.location.href = '/';
  };

  setHeaderProjectData = projectData => {
    if (this.state.project !== projectData && projectData.Project) {
      this.setState({ project: projectData });
    }
  };

  componentDidUpdate = () => {
    if (
      sessionStorage.getItem('user') &&
      this.state.serverTimeDate !== JSON.parse(sessionStorage.getItem('user')).UtcDateTime
    ) {
      this.setState({ serverTimeDate: JSON.parse(sessionStorage.getItem('user')).UtcDateTime });
    }
  };

  setStatus = status => {
    this.setState({ projectStatus: status });
  };

  changeMediaType = type => {
    this.setState({ mediaType: type });
  };

  render() {
    if (this.state.userLoaded) {
      return (
        <ErrorBoundary>
          {/*<UploadProgressAlert uploads={this.props.uploads} />*/}
          <div className="row d-flex no-gutters">
            <div className="col-12" style={{ marginTop: 0 }}>
              <Header
                userData={this.state.user}
                projectData={this.state.project}
                pagePath={this.props.location.pathname}
                setPageViewType={this.setPageViewType}
                updateHistory={this.updateHistory}
                clearProject={this.clearProject}
                handleLogoutClick={this.handleLogoutClick}
                getUserData={this.getUserData}
                status={this.state.projectStatus}
                mediaType={this.state.mediaType}
              />
              <div
                className={
                  this.state.pageViewCompact
                    ? 'row d-flex no-gutters content compact'
                    : 'row d-flex no-gutters content'
                }
              >
                <div className="col-1"></div>

                <Route
                  path="/releaseInformation/:projectID?"
                  render={() => (
                    <ReleaseInformationPage
                      user={this.state.user}
                      clearProject={this.state.clearProject}
                      data={this.state.project.Project}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                      changeMediaType={this.changeMediaType}
                    />
                  )}
                />
                <Route
                  path="/inbox"
                  render={() => (
                    <ProjectInbox
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/projectContacts/:projectID?"
                  render={() => (
                    <ProjectContactsPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                      data={this.state.project.Project}
                      showNotiBarIfMasked={this.showNotiBarIfMasked}
                    />
                  )}
                />
                <Route
                  path="/trackInformation/:projectID?"
                  render={() => (
                    <TrackInformationPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/territorialRights/:projectID?"
                  render={() => (
                    <TerritorialRightsPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                      setStatus={this.setStatus}
                    />
                  )}
                />
                <Route
                  path="/blockingPolicies/:projectID?"
                  render={() => (
                    <BlockingPoliciesPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                      mediaType={this.state.mediaType}
                    />
                  )}
                />
                <Route
                  path="/audioFiles/:projectID?"
                  render={() => (
                    <AudioFilesPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route
                  path="/reviewSubmit/:projectID?"
                  render={() => (
                    <ReviewAndSubmitPage
                      prevLocation={this.state.prevLocation}
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      projectID={this.state.project.Project.projectID}
                      data={this.state.project}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                      setStatus={this.setStatus}
                      changeMediaType={this.changeMediaType}
                    />
                  )}
                />
                <Route
                  path="/findProject"
                  render={() => (
                    <FindProjectPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <Route path="/helpGuide/:id?" render={() => <HelpGuide />} />
                <Route
                  path="/userAdmin"
                  render={() => (
                    <UserAdmin
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <div className="col-1"></div>
              </div>
            </div>
          </div>
        </ErrorBoundary>
      );
    } else {
      return <div className="row d-flex no-gutters"></div>;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  initializeUpcData: () => dispatch(releaseAction.initializeUpcData()),
  initializeRightsData: () => dispatch(territorialRightsAction.initializeRightsData()),
});

const mapStateToProps = state => ({
  uploads: state.uploadProgressAlert.uploads,
});

export default compose(
  withTranslation('content'),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Content);
