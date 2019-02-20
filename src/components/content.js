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
                        <Route path="/releaseInformation" render={ () => <ReleaseinformationPage location={window.location.pathname} state={this.state}/> }/>
                        <Route path="/newProject" component={NewProjectPage}></Route>
                        <Route path="/audioFiles" component={AudioFilesPage}></Route>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Content;


