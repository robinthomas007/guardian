import React from 'react';
import AppRouter from './AppRouter1';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const navList = {
	releaseInformation : {
		linkText : 'Release Information',
		navRoute : '/releaseInformation',
		userAccess : 'all'
	}, 

	projectContacts : {
		linkText : 'Project Contacts',
		navRoute : '/projectContacts',
		userAccess : 'all'
	}, 

	audioFiles : {
		linkText : 'Audio Files (#)',
		navRoute : '/audioFiles',
		userAccess : 'all'
	}, 

	trackInformation :{
		linkText : 'Track Information (#)',
		navRoute : '/trackInformation',
		userAccess : 'all'
	},

	territorialRights: {
		linkText : 'Territorial Rights',
		navRoute : '/territorialRights',
		userAccess : 'all'
	},

	blockingPolicies : {
		linkText : 'Blocking Policies',
		navRoute : '/blockingPolicies',
		userAccess : 'all'
	},

	reviewSubmit : {
		linkText : 'Review & Submit',
		navRoute : '/reviewSubmit',
		userAccess : 'all'
	},

	newProject : {
		linkText : 'New Project',
		navRoute : '/newProject',
		userAccess : 'admin'
	},

	findProject : {
		linkText : 'Find a Project',
		navRoute : '/findProject',
		userAccess : 'admin'
	},

	recentProjects : {
		linkText : 'Find a Project',
		navRoute : '/findProject',
		userAccess : 'admin'
	}
};

const MakeUserNavLinks = (props) => {
	//console.log('MakeUserNavLinks : ' + props.linkText)
	return(
		<li key={props.index}>
			<Link to={props.navRoute}>
				Step <span className="count-circle"></span> {props.linkText}
			</Link>
			<span className="checkbox"></span>

			<Route path="{props.navRoute}" exact component={props.linkText} />
		</li>
	)
};

const LeftNav = () => {

	const userLinks = Object.keys(navList).map(
		function(link, i) { 
			return(
				<MakeUserNavLinks key={i} index={i} linkText={navList[link].linkText} navRoute={navList[link].navRoute}/>
			)
		}
	);

    return(
		<nav className="left-nav col-2">
			<section className="fixed-left-nav col-2">
				<span className="left-nav-logo"></span>
				<Router>
					<ul>
						{userLinks}
					</ul>
				</Router>

			</section>
            <AppRouter />
		</nav>
    )
}

export default LeftNav;