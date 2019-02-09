import React from 'react';
import AppRouter from './AppRouter1';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mockUserAccess = 'admin';

const navList = {
	releaseInformation : {
		linkText : 'Release Information',
		navRoute : '/releaseInformation',
		userAccess : 'user'
	}, 

	projectContacts : {
		linkText : 'Project Contacts',
		navRoute : '/projectContacts',
		userAccess : 'user'
	}, 

	audioFiles : {
		linkText : 'Audio Files (#)',
		navRoute : '/audioFiles',
		userAccess : 'user'
	}, 

	trackInformation :{
		linkText : 'Track Information (#)',
		navRoute : '/trackInformation',
		userAccess : 'user'
	},

	territorialRights: {
		linkText : 'Territorial Rights',
		navRoute : '/territorialRights',
		userAccess : 'user'
	},

	blockingPolicies : {
		linkText : 'Blocking Policies',
		navRoute : '/blockingPolicies',
		userAccess : 'user'
	},

	reviewSubmit : {
		linkText : 'Review & Submit',
		navRoute : '/reviewSubmit',
		userAccess : 'user'
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
		linkText : 'Recent Projects',
		navRoute : '/recentProjects',
		userAccess : 'admin'
	}
};

class showNavPath extends React.Component {
	render() {
		return(
			<div>{this.props.location.state.navID}</div>
		)
	}
}

const MakeUserNavLinks = (props) => {
	//console.log('MakeUserNavLinks : ' + props.linkText)

	return(
		<li key={props.index}>
			<Link to={{pathname: props.navRoute, state: {navID: props.navID}}}>
				Step <span className="count-circle"></span> {props.linkText}
			</Link>
			<span className="checkbox"></span>

			<div>
				--<Route path={props.navRoute} component={showNavPath} />--
			</div>
			
		</li>
	)
};

const SetAccessLevel = (inputObj) => {
	return(
		alert(inputObj.value)
	)
};

const AccessInput = () => {
	return(
		<select OnChange="alert(12);">
			<option value="admin">Admin</option>
			<option value="user">User</option>
		</select>
	)
};

const LeftNav = () => {

	const userLinks = Object.keys(navList).map(
		function(link, i) { 

			if(navList[link].userAccess == 'user' || (navList[link].userAccess == 'admin' && mockUserAccess == 'admin')) {
				return(
					<MakeUserNavLinks key={i} index={i} linkText={navList[link].linkText} navRoute={navList[link].navRoute} navID={link}/>
				)
			}
		}
	);

  return(
		<nav className="left-nav col-2">

			<div id="test"></div>

			<AccessInput />

			<section className="fixed-left-nav col-2">
				<span className="left-nav-logo"></span>
				<Router>
					<ul>
						{userLinks}
					</ul>
				</Router>
			</section>
		</nav>
    )
}

export default LeftNav;