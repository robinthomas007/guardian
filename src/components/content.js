import React, { Component } from 'react';
import TopNav from './TopNav';
import LeftNav from './leftNav';
import { BrowserRouter as Router, Route, Switch, Link, Blocker, withRouter, Redirect } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import TrackInformationPage from './pages/TrackInformationPage';
import ProjectContactsPage from './pages/ProjectContactsPage';
import NewProjectPage from './pages/NewProjectPage';
import AudioFilesPage from './pages/AudioFilesPage';
import ReviewAndSubmitPage from './pages/ReviewAndSubmitPage';
import BlockingPoliciesPage from './pages/BlockingPoliciesPage';
import TerritorialRightsPage from './pages/TerritorialRightsPage';
import ReleaseInformationPage from './pages/ReleaseInformationPage';

class Content extends Component {
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
};

export default Content;

