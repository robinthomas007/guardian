import React, { Component } from 'react';
import TopNav from './TopNav';
import LeftNav from './leftNav';
import { SecureRoute } from "@okta/okta-react";
import TrackInformationPage from './pages/TrackInformationPage';
import ProjectContactsPage from './pages/ProjectContactsPage';
import NewProjectPage from './pages/NewProjectPage';
import AudioFilesPage from './pages/AudioFilesPage';
import ReviewAndSubmitPage from './pages/ReviewAndSubmitPage';
import BlockingPoliciesPage from './pages/BlockingPoliciesPage';
import TerritorialRightsPage from './pages/TerritorialRightsPage';
import ReleaseInformationPage from './pages/ReleaseInformationPage';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Content extends Component {

  constructor(props) {
    super(props)
    this.state = {
        messages: null,
        accesstoken: '',
        idtoken: ''
    }
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

      sessionStorage.setItem('accessToken', this.state.accesstoken)
      sessionStorage.setItem('idtoken', idtoken)
      sessionStorage.setItem('user', JSON.stringify(user))

      console.log('accessToken: ' + this.state.accesstoken)
      console.log('idToken: ' + this.state.idtoken)
      console.log('user: ' + this.state.user)
  }

    render() {
        return (
            <div className="row h-100 no-gutters">
                <LeftNav />           
          
                <div className="content col-10">
                  
                  <TopNav />

                  <SecureRoute path="/releaseInformation" component={ReleaseInformationPage}/>
                  <SecureRoute path="/projectContacts" component={ProjectContactsPage}/>
                  <SecureRoute path="/trackInformation" component={TrackInformationPage}/>
                  <SecureRoute path="/territorialRights" component={TerritorialRightsPage}/>
                  <SecureRoute path="/blockingPolicies" component={BlockingPoliciesPage}/>
                  <SecureRoute path="/newProject" component={NewProjectPage} />
                  <SecureRoute path="/audioFiles" component={AudioFilesPage} />
                  <SecureRoute path="/reviewSubmit" component={ReviewAndSubmitPage}/>
                </div>
          </div>
        );
    }
});

