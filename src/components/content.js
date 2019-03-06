import React, { Component } from 'react';
import TopNav from './TopNav';
import { BrowserRouter as Router, Route, Switch, Link, Blocker, withRouter, Redirect } from "react-router-dom";
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
            <div className="content col-10">
                <TopNav />
                <div>
                    <Route path="/releaseInformation" component={ReleaseInformationPage}></Route>
                    <Route path="/projectContacts" component={ProjectContactsPage}></Route>
                    <Route path="/trackInformation" component={TrackInformationPage}></Route>
                    <Route path="/territorialRights" component={TerritorialRightsPage}></Route>
                    <Route path="/blockingPolicies" component={BlockingPoliciesPage}></Route>
                    <Route path="/newProject" component={NewProjectPage}></Route>
                    <Route path="/audioFiles" component={AudioFilesPage}></Route>
                    <Route path="/reviewSubmit" component={ReviewAndSubmitPage}></Route>
                </div>
            </div>
        )
    }
};

export default Content;

