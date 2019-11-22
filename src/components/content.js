import React, { Component } from 'react';
import Header from './template/Header/Header';
import { SecureRoute } from "@okta/okta-react";
import TrackInformationPage from './pages/TrackInformation/TrackInformationPage';
import ProjectContactsPage from './pages/ProjectContacts/ProjectContactsPage';
import AudioFilesPage from './pages/AudioFiles/AudioFilesPage';
import ReviewAndSubmitPage from './pages/ReviewAndSubmit/ReviewAndSubmitPage';
import BlockingPoliciesPage from './pages/BlockingPolicies/BlockingPoliciesPage';
import TerritorialRightsPage from './pages/TerritorialRights/TerritorialRightsPage';
import ReleaseInformationPage from './pages/ReleaseInformation/ReleaseInformationPage';
import FindProjectPage from './pages/FindProject/FindProjectPage';
import HelpGuide from './pages/HelpGuide/HelpGuidePage';
import UserAdministration from './pages/UserAdministration/UserAdministration';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Content extends Component {

  constructor(props) {

    const uuidv4 = require('uuid/v4');

    super(props)
    this.state = {
        accesstoken: '',
        idtoken: '',
        user : {},
        isAdmin : false,
        userLoaded : false,
        sessionId : uuidv4(),
        pageViewCompact : true,
        projectID : '',
        project : {
          Project : {
            
          }
        }

    }
    this.setProjectID = this.setProjectID.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.checkAuthentication();
  };

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

      sessionStorage.setItem('idtoken', idtoken)
      sessionStorage.setItem('accessToken', accesstoken)
      sessionStorage.setItem('user', JSON.stringify(user))

      if(this.state.user !== user) {
        this.setState( {user : user } );
      }

      if(!this.state.userLoaded) {
        this.getUserData();
      }
  }

  getUserData() {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const fetchHeaders = new Headers(
        {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem('accessToken')
        }
      )

      const fetchBody = JSON.stringify( {
          "User" : {
            "email" : this.state.user.email
          }
      })

      fetch ('https://api-dev.umusic.net/guardian/login', {
          method : 'POST',
          headers : fetchHeaders,
          body : fetchBody
      }).then (response =>
          {
            return(response.json());
          }
      ).then (userJSON =>
          {
            const newUserObj = Object.assign(userJSON, user);
            this.setState({
              user : newUserObj,
              userLoaded : true
            })
            sessionStorage.setItem('user', JSON.stringify(newUserObj))
          }
      ).catch(
          error => console.error(error)
      );
  }

  handleProjectDataLoad = () => {

    const user = JSON.parse(sessionStorage.getItem('user'))

    const fetchHeaders = new Headers(
        {
            "Content-Type": "application/json",
            "Authorization" : sessionStorage.getItem('accessToken')
        }
    )

    const fetchBody = JSON.stringify( {
        "User" : {
            "email" : user.email
        },
        "ProjectID" : (this.state.projectID) ? this.state.projectID : ''
    })

    fetch ('https://api-dev.umusic.net/guardian/project/review', {
        method : 'POST',
        headers : fetchHeaders,
        body : fetchBody
    }).then (response =>
        {
            return(response.json());
        }
    ).then (responseJSON =>
        {
          return ( (this.state.project !== responseJSON) ? this.setState( { project : responseJSON } ) : '')
        }
    )
    .catch(
        error => {
            console.error(error);
            this.setState( {showloader : false} )
        }
    );
}

  updateHistory(projectID) {
    this.props.history.push('/reviewSubmit/' + projectID);
    this.setProjectID(projectID);
  }

  setProjectID(pid) {
    if(this.state.projectID !== pid) {
        this.setState( {projectID : pid}, ()=> {this.handleProjectDataLoad();})
    }
  }

  setPageViewType = (isCompactView) => {
    return ( (this.state.pageViewCompact !== isCompactView) ? this.setState( {pageViewCompact : isCompactView} ) : null)
  }

  clearProject = () => {
    const blankProject = {
      Project : {}
    }
    this.setState( { project : blankProject})
  }

  handleLogoutClick = (e) => {
      e.preventDefault();
      this.props.auth.logout('/');
      localStorage.clear()
  };

  setHeaderProjectData = (projectData) => {
    if(this.state.project.Project !== projectData) {
      let project = {...this.state.project}
          project.Project = projectData
      this.setState( { project } )
    }
  };

  render() {

    if(this.state.userLoaded) {
      return (
        <div className="row d-flex no-gutters">
          <div className="col-12">

            <Header
              userData={this.state.user}
              projectData={this.state.project.Project}
              pagePath={this.props.location.pathname}
              setPageViewType={this.setPageViewType}
              updateHistory={this.updateHistory}
              clearProject={this.clearProject}
              handleLogoutClick={this.handleLogoutClick}
            />

            <div className={this.state.pageViewCompact ? "row d-flex no-gutters content compact" : "row d-flex no-gutters content"} >
              <div className="col-1"></div>

                <SecureRoute path="/releaseInformation/:projectID?" render={ () => ( <ReleaseInformationPage user={this.state.user} setProjectID={this.setProjectID} setHeaderProjectData={this.setHeaderProjectData}/>) } />
                <SecureRoute path="/projectContacts/:projectID?" render={ () => ( <ProjectContactsPage user={this.state.user} setProjectID={this.setProjectID} setHeaderProjectData={this.setHeaderProjectData} />) }/>
                <SecureRoute path="/trackInformation/:projectID?" render={ () => ( <TrackInformationPage user={this.state.user} setProjectID={this.setProjectID} setHeaderProjectData={this.setHeaderProjectData} />) }/>
                <SecureRoute path="/territorialRights/:projectID?" render={ () => ( <TerritorialRightsPage user={this.state.user} setProjectID={this.setProjectID} setHeaderProjectData={this.setHeaderProjectData} />) }/>
                <SecureRoute path="/blockingPolicies/:projectID?" render={ () => ( <BlockingPoliciesPage user={this.state.user} setProjectID={this.setProjectID} setHeaderProjectData={this.setHeaderProjectData} />) }/>
                <SecureRoute path="/audioFiles/:projectID?" render={ () => ( <AudioFilesPage user={this.state.user} setProjectID={this.setProjectID} setHeaderProjectData={this.setHeaderProjectData} />) } />
                <SecureRoute path="/reviewSubmit/:projectID?" render={ () => ( <ReviewAndSubmitPage user={this.state.user} setProjectID={this.setProjectID} data={this.state.project} setHeaderProjectData={this.setHeaderProjectData} />) } />
                <SecureRoute path="/findProject" render={ () => ( <FindProjectPage user={this.state.user} setProjectID={this.setProjectID} />) } setHeaderProjectData={this.setHeaderProjectData} />
                <SecureRoute path="/helpGuide" render={ () => ( <HelpGuide/> ) } />
                <SecureRoute path="/admin" render={ () => ( <UserAdministration user={this.state.user} setProjectID={this.setProjectID} />) } setHeaderProjectData={this.setHeaderProjectData} />
               <div className="col-1"></div>
            </div>

          </div>
        </div>
      );
    } else {
      return (
        <div className="row d-flex no-gutters"></div>
      )
    }
  }
});
