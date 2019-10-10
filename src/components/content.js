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
import FindProject from './pages/FindProject/FindProjectPage';
import HelpGuide from './pages/HelpGuide/HelpGuidePage';
import UserAdmin from './pages/UserAdministration/UserAdministration';
import { withAuth } from '@okta/okta-react';
import { Alert } from 'react-bootstrap';

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

  updateHistory(historyValue) {
      this.props.history.push(historyValue)
  }

  setProjectID(pid) {
    if(this.state.projectID !== pid) {
      this.setState( {
        projectID : pid
      } )
    }
  }

  render() {

    if(this.state.userLoaded) {
      return (

        <div className="row d-flex no-gutters">
          <div className="col-12">

            <Header userData={this.state.user} projectID={this.state.projectID} />

            <div className="row d-flex no-gutters">
              <div className="col-1"></div>

                <SecureRoute path="/releaseInformation/:projectID?" render={ () => ( <ReleaseInformationPage user={this.state.user} setProjectID={this.setProjectID} />) } />
                <SecureRoute path="/projectContacts/:projectID?" render={ () => ( <ProjectContactsPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
                <SecureRoute path="/trackInformation/:projectID?" render={ () => ( <TrackInformationPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
                <SecureRoute path="/territorialRights/:projectID?" render={ () => ( <TerritorialRightsPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
                <SecureRoute path="/blockingPolicies/:projectID?" render={ () => ( <BlockingPoliciesPage user={this.state.user} setProjectID={this.setProjectID} />) }/>
                <SecureRoute path="/audioFiles/:projectID?" render={ () => ( <AudioFilesPage user={this.state.user} setProjectID={this.setProjectID} />) } />
                <SecureRoute path="/reviewSubmit/:projectID?" render={ () => ( <ReviewAndSubmitPage user={this.state.user} setProjectID={this.setProjectID} />) } />
                <SecureRoute path="/newProject"  render={ () => ( <ReleaseInformationPage user={this.state.user} setProjectID={this.setProjectID}/>) } />
                <SecureRoute path="/findProject" component={FindProject}/>
                <SecureRoute path="/helpGuide" component={HelpGuide}/>
                <SecureRoute path="/userAdmin" component={UserAdmin}/>

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
