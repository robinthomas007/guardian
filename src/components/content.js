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
import { ToastContainer } from 'react-toastify';
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
      project: {
        Project: {},
      },
      serverTimeDate: '',
      clearProject: false,
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

  getUserData() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      User: {
        email: this.state.user.email,
      },
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

  handleProjectDataLoad = pagePath => {
    if (pagePath && pagePath !== '' && this.state.projectID !== '') {
      const fetchHeaders = new Headers({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken'),
      });

      const fetchBody = JSON.stringify({
        PagePath: pagePath,
        ProjectID: this.state.projectID ? this.state.projectID : '',
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
    this.setState({ project: blankProject, clearProject: true }, () =>
      this.setState({ clearProject: false }),
    );
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.auth.logout('/');
    localStorage.clear();
  };

  setHeaderProjectData = projectData => {
    if (this.state.project !== projectData) {
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
        <div className="row d-flex no-gutters">
          <div className="col-12" style={{ marginTop: this.props.progress > 0 ? '54px' : '0' }}>
            <Header
              userData={this.state.user}
              projectData={this.state.project}
              pagePath={this.props.location.pathname}
              setPageViewType={this.setPageViewType}
              updateHistory={this.updateHistory}
              clearProject={this.clearProject}
              handleLogoutClick={this.handleLogoutClick}
            />
            <ToastContainer
              style={{ marginTop: this.props.progress > 0 ? '101px' : '45px' }}
              closeButton={false}
              position="top-right"
              autoClose={false}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              draggable={false}
              pauseOnFocusLoss={false}
              pauseOnHover={false}
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
                    user={this.state.user}
                    setProjectID={this.setProjectID}
                    projectID={this.state.project.Project.projectID}
                    data={this.state.project}
                    setHeaderProjectData={this.setHeaderProjectData}
                    serverTimeDate={this.state.serverTimeDate}
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
              <SecureRoute path="/helpGuide" render={() => <HelpGuide />} />
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
      );
    } else {
      return <div className="row d-flex no-gutters"></div>;
    }
  }
}
export default withAuth(
  connect(state => ({
    progress: Object.keys(state.uploadProgressAlert.uploads).length,
  }))(Content),
);
