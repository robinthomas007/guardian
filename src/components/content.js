import React, { Component } from 'react';
import Header from './template/Header/Header';
import { SecureRoute } from '@okta/okta-react';
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
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import ProjectInbox from './pages/ProjectInbox';
import ErrorBoundary from './common/ErrorBoundary';
import * as releaseAction from './pages/ReleaseInformation/releaseAction';
import UploadProgressAlert from 'components/SharedPageComponents/UploadProgresAlert';
import { showNotyMaskWarning } from 'components/Utils';

class Content extends Component {
  constructor(props) {
    const uuidv4 = require('uuid/v4');

    super(props);
    this.state = {
      accesstoken: '',
      idtoken: '',
      user: {},
      isAdmin: false,
      userLoaded: false,
      sessionId: uuidv4(),
      pageViewCompact: true,
      projectID: '',
      pagePath: '',
      projectStatus: null,
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
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const accesstoken = await this.props.auth.getAccessToken();
    const idtoken = await this.props.auth.getIdToken();
    const user = await this.props.auth.getUser();

    if (accesstoken !== this.state.accesstoken) {
      this.setState({ accesstoken });
    }

    if (idtoken !== this.state.idtoken) {
      this.setState({ idtoken });
    }

    if (user !== this.state.user) {
      this.setState({ user });
    }

    sessionStorage.setItem('idtoken', idtoken);
    sessionStorage.setItem('accessToken', accesstoken);
    sessionStorage.setItem('user', JSON.stringify(user));

    if (this.state.user !== user) {
      this.setState({ user: user });
    }

    if (!this.state.userLoaded) {
      this.getUserData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      if (this.props.location.pathname === '/findProject') {
        this.setState({ prevLocation: 'findProject' });
      } else this.setState({ prevLocation: '' });
    }
  }

  getUserData(lang) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
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
        return response.json();
      })
      .then(userJSON => {
        const newUserObj = Object.assign(userJSON, user);
        this.setState({
          user: newUserObj,
          userLoaded: true,
        });
        sessionStorage.setItem('user', JSON.stringify(newUserObj));
      })
      .catch(error => console.error(error));
  }

  showNotiBarIfMasked = response => {
    if (response.Project && response.Project.isMasked) {
      showNotyMaskWarning(
        'This projects meta data is being masked. The Project Title, Artist, Track Titles and Artists will all be masked.',
        () => {},
        10,
      );
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
          this.showNotiBarIfMasked(responseJSON);
          // console.log('responseJSON.Project.projectStatus', responseJSON.Project.projectStatus);
          // if (
          //   responseJSON.Project.projectStatus !== 'In Progress' &&
          //   responseJSON.Project.projectStatus !== 'No Rights' &&
          //   !pagePath.includes('reviewSubmit')
          // ) {
          //   this.props.history.push('/reviewSubmit/' + this.state.projectID);
          // }
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
    this.setState({ project: blankProject, clearProject: true, projectStatus: 'In Progress' }, () =>
      this.setState({ clearProject: false }),
    );
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.auth.logout('/');
    localStorage.clear();
  };

  setStatus = status => {
    this.setState({ projectStatus: status });
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

    //alert(this.props.location.pathname)
  };

  render() {
    if (this.state.userLoaded) {
      return (
        <ErrorBoundary>
          <UploadProgressAlert uploads={this.props.uploads} />
          <div className="row d-flex no-gutters">
            <div
              className="col-12"
              style={{ marginTop: Object.keys(this.props.uploads).length > 0 ? '54px' : '0px' }}
            >
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
              />
              <div
                className={
                  this.state.pageViewCompact
                    ? 'row d-flex no-gutters content compact'
                    : 'row d-flex no-gutters content'
                }
              >
                <div className="col-1"></div>

                <SecureRoute
                  path="/releaseInformation/:projectID?"
                  render={() => (
                    <ReleaseInformationPage
                      user={this.state.user}
                      clearProject={this.state.clearProject}
                      data={this.state.project.Project}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <SecureRoute
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
                <SecureRoute
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
                <SecureRoute
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
                <SecureRoute
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
                <SecureRoute
                  path="/blockingPolicies/:projectID?"
                  render={() => (
                    <BlockingPoliciesPage
                      user={this.state.user}
                      setProjectID={this.setProjectID}
                      setHeaderProjectData={this.setHeaderProjectData}
                      serverTimeDate={this.state.serverTimeDate}
                    />
                  )}
                />
                <SecureRoute
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
                <SecureRoute
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
                    />
                  )}
                />
                <SecureRoute
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
                <SecureRoute path="/helpGuide/:id?" render={() => <HelpGuide />} />
                <SecureRoute
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

export default withAuth(
  connect(
    state => ({
      uploads: state.uploadProgressAlert.uploads,
    }),
    dispatch => ({
      initializeUpcData: () => dispatch(releaseAction.initializeUpcData()),
    }),
  )(Content),
);
