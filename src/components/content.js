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
        user : {}
    }
    this.checkAuthentication();
  };

  async checkAuthentication() {
      const accesstoken = await this.props.auth.getAccessToken();
      const idtoken = await this.props.auth.getIdToken();
      const user = await this.props.auth.getUser();

      if (accesstoken !== this.state.accesstoken) {
        this.setState({ accesstoken });
        sessionStorage.setItem('accessToken', accesstoken)  
      }

      if (idtoken !== this.state.idtoken) {
        this.setState({ idtoken });
        sessionStorage.setItem('idtoken', idtoken)
      }

      if (user !== this.state.user) {
        this.setState({ user });
        sessionStorage.setItem('user', JSON.stringify(user))
    }
  }

  componentDidMount() {

}


  componentWillUpdate() {

    alert(sessionStorage.getItem('accessToken'))
    //sessionStorage.setItem('user', JSON.stringify(this.state.user))
    //sessionStorage.setItem('idtoken', this.state.idtoken)
    //sessionStorage.setItem('accessToken', this.state.accesstoken)
    
    
    
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
                <SecureRoute path="/newProject" component={ReleaseInformationPage} />
                <SecureRoute path="/audioFiles" component={AudioFilesPage} />
                <SecureRoute path="/reviewSubmit" component={ReviewAndSubmitPage}/>
                <SecureRoute path="/findProject" component={FindProject}/>
              </div>
        </div>
        );
    }
});

