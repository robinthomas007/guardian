import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink } from "react-router-dom";
import './LeftNav.css'

const mockUserAccess = 'admin';

const navList = {

	steps : {
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
			userAccess : 'user',
			postRelease : true
		},
	
		territorialRights: {
			linkText : 'Territorial Rights',
			navRoute : '/territorialRights',
			userAccess : 'user',
			postRelease : true
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
	},

	admin : {
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
	
		userAdmin : {
			linkText : 'User Administration',
			navRoute : '/userAdmin',
			userAccess : 'admin'
		},

		recentProjects : {
			linkText : 'Recent Projects',
			navRoute : '/recentProjects',
			userAccess : 'admin'
		}
	}
};

const MakeUserNavLinks = (props) => {
	//console.log('MakeUserNavLinks : ' + props.linkText)

	const activeStyle = {color: '#333', backgroundColor: '#F5F5F5'}

	return(
		<li key={props.index}>
			<NavLink className="steps" activeStyle={activeStyle} to={{pathname: props.navRoute}} replace>
				Step <span className="count-circle">{props.index + 1}</span> {props.linkText}
			</NavLink>
		</li>
	)
};

const MakeAdminNavLinks = (props) => {
	return(
		<li key={props.index}>
			<NavLink to={{pathname: props.navRoute, state: {navID: props.navID}}}>{props.linkText}</NavLink>
		</li>
	)
};


class LeftNav extends Component {

	render() {

		const adminLinks = Object.keys(navList.admin).map(
			function(link, i) { 
					return(
						<MakeAdminNavLinks key={i} index={i} linkText={navList.admin[link].linkText} navRoute={navList.admin[link].navRoute} navID={link}/>
					)
			}
		);
	
		const userLinks = Object.keys(navList.steps).map(
			function(link, i) { 
					return(
						<MakeUserNavLinks key={i} index={i} linkText={navList.steps[link].linkText} navRoute={navList.steps[link].navRoute} navID={link}/>
					)
			}
		);

		return(
			<nav className="left-nav col-2">
				<section className="fixed-left-nav col-2">
					<span className="left-nav-logo"></span>
					<ul id="steps">
						{userLinks}
					</ul>
					<ul>
						{adminLinks}
					</ul>
				</section>
			</nav>
		)
	}
}

export default LeftNav;