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
import { withAuth } from '@okta/okta-react';

export default withAuth(class Content extends Component {

  constructor(props) {
    super(props)
    this.state = {
        loading : true,
        messages: null,
        accesstoken: '',
        idtoken: '',
        user : {},
        isAdmin : false,
        userLoaded : false

    }
    this.getUserData = this.getUserData.bind(this);
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

      this.setState( {user : user } );
      this.setState( {userLoaded : true } );

      const userData = this.getUserData();
  }
  
  getUserData(userEmail) {
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
      )
      .then (userJSON => 
          {
            const newUserObj = {...userJSON, ...user};
            sessionStorage.setItem('user', JSON.stringify(newUserObj))
            this.setState({isAdmin : userJSON.IsAdmin})
          }
      )
      .catch(
          error => console.error(error)
      );
  }

  render() {

    if(this.state.userLoaded) {
      return (
        <div className="row h-100 no-gutters">

          <LeftNav isAdmin={this.state.isAdmin}/>

          <div className="content col-10">
            
            <TopNav userObj={this.state.user}/>

            <SecureRoute path="/releaseInformation" component={ReleaseInformationPage}/>
            <SecureRoute path="/projectContacts" component={ProjectContactsPage}/>
            <SecureRoute path="/trackInformation" component={TrackInformationPage}/>
            <SecureRoute path="/territorialRights" component={TerritorialRightsPage}/>
            <SecureRoute path="/blockingPolicies" component={BlockingPoliciesPage}/>
            <SecureRoute path="/newProject" component={ReleaseInformationPage} />
            <SecureRoute path="/audioFiles" component={AudioFilesPage} />
            <SecureRoute path="/reviewSubmit" exact component={ReviewAndSubmitPage}/>
            <SecureRoute path="/reviewSubmit/:projectID" component={ReviewAndSubmitPage}/>
            <SecureRoute path="/findProject" component={FindProject}/>
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

