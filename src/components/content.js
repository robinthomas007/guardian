import React, { Component } from 'react';
import TopNav from './TopNav';
import { ReleaseinformationPage, NewProjectPage, AudioFilesPage, ProjectContactsPage, TrackInformationPage, TerritorialRightsPage, BlockingPoliciesPage, ReviewAndSubmitPage} from './pages';
import { BrowserRouter as Router, Route, Switch, Link, Blocker, withRouter, Redirect } from "react-router-dom";

class Content extends Component {
    render() {
        return (
            <div className="content col-10">
                <TopNav />
                <div>
                    <Route path="/releaseInformation" component={ReleaseinformationPage}></Route>
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

