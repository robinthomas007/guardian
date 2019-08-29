import React, { Component } from 'react';
import TopNav from './template/TopNav/TopNav';
import LeftNav from './template/LeftNav/LeftNav';
import { SecureRoute } from "@okta/okta-react";
import TrackInformationPage from './pages/TrackInformation/TrackInformationPage';
import ProjectContactsPage from './pages/ProjectContacts/ProjectContactsPage';
import AudioFilesPage from './pages/AudioFiles/AudioFilesPage';
import ReviewAndSubmitPage from './pages/ReviewAndSubmit/ReviewAndSubmitPage';
import BlockingPoliciesPage from './pages/BlockingPolicies/BlockingPoliciesPage';
import TerritorialRightsPage from './pages/TerritorialRights/TerritorialRightsPage';
import ReleaseInformationPage from './pages/ReleaseInformation/ReleaseInformationPage';
import FindProject from './pages/FindProject/FindProjectPage';
import HelpGuide from './pages/HelpGuide/HelpGuidePage';
import UserAdmin from './pages/UserAdministration/UserAdministration';
import { withAuth } from '@okta/okta-react';
import UUID from 'uuid';
import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

export default withAuth(class Content extends Component {

  constructor(props) {

    const uuidv4 = require('uuid/v4');

    super(props)
    this.state = {
        loading : true,
        messages: null,
        accesstoken: '',
        idtoken: '',
        user : {},
        isAdmin : false,
        userLoaded : false,
        sessionId : uuidv4(),

        projectID : ''

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
        this.setState( {userLoaded : true } );
      }

      if(this.state.userLoaded) {
        const userData = this.getUserData();
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
            const newUserObj = {...userJSON, ...user};

            this.setState({isAdmin : userJSON.IsAdmin})
            this.setState({user : newUserObj})
            sessionStorage.setItem('user', JSON.stringify(newUserObj))

          }
      ).catch(
          error => console.error(error)
      );
  }

  updateHistory(historyValue) {
      this.props.history.push(historyValue)
  }

  setProjectID(pid) {

    if(this.state.projectID !== pid) {
      this.setState( {projectID : pid} )
    }
  }

  render() {

    if(this.state.userLoaded) {

      return (
        <div className="row h-100 no-gutters">

          <LeftNav isAdmin={this.state.isAdmin} projectID={this.state.projectID}/>

          <div className="content col-10">
            
            <TopNav userObj={this.state.user} updateParentHistory={this.updateHistory}/>

            <SecureRoute path="/releaseInformation/:projectID?" render={ () => ( <ReleaseInformationPage user={this.state.user} setProjectID={this.setProjectID} />) } />
            <SecureRoute path="/projectContacts/:projectID?" render={ () => ( <ProjectContactsPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
            <SecureRoute path="/trackInformation/:projectID?" render={ () => ( <TrackInformationPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
            <SecureRoute path="/territorialRights" render={ () => ( <TerritorialRightsPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
            <SecureRoute path="/blockingPolicies/:projectID?" render={ () => ( <BlockingPoliciesPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
            <SecureRoute path="/audioFiles/:projectID?" render={ () => ( <AudioFilesPage user={this.state.user} setProjectID={this.setProjectID} />) } />
            <SecureRoute path="/reviewSubmit/:projectID?" render={ () => ( <ReviewAndSubmitPage user={this.state.user} setProjectID={this.setProjectID} />) } />
            <SecureRoute path="/newProject"  render={ () => ( <ReleaseInformationPage user={this.state.user} setProjectID={this.setProjectID}/>) } />
            <SecureRoute path="/findProject" component={FindProject}/>
            <SecureRoute path="/helpGuide" component={HelpGuide}/>
            <SecureRoute path="/userAdmin" component={UserAdmin}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row h-100 no-gutters"></div>
      )
    }
  }
});

