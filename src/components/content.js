import React, { Component } from 'react';
import TopNav from './topNav';
import {ReleaseinformationPage, NewProjectPage, AudioFilesPage} from './pages';
import { BrowserRouter as Router, Route, Switch, Link, Blocker, withRouter } from "react-router-dom";

class Content extends Component {
    render() {
        return (
            <div className="content col-10">
                <TopNav />
                <Router>
                    <div>
                        <Route exact path="/releaseInformation" exact component={ReleaseinformationPage}></Route>
                        <Route path="/newProject" component={NewProjectPage}></Route>
                        <Route path="/audioFiles" component={AudioFilesPage}></Route>
                    </div>
                </Router>
            </div>
        )
    }
}
export default Content;
