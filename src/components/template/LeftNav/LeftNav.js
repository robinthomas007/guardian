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

class LeftNav extends Component {

    constructor(props) {
        super(props);

		this.state = {

		}
		this.handleChange = this.handleNavClick.bind(this);
		this.getAdminLinks = this.getAdminLinks.bind(this);
    };


	handleNavClick(link){
		if(this.state.activeNav !== link) {
			this.setState( { activeNav : link } )
		}
		console.log(this.state.activeNav)
	}

	getUserLinks() {
		
		const activeStyle = {color: '#333', backgroundColor: '#F5F5F5'}

		const stepLinks = Object.keys(navList.steps).map(
			function(link, i) { 
				return(
					<li key={i}>

						<NavLink 
							className="steps" 
							activeStyle={activeStyle} 
							to={{pathname: navList.steps[link].navRoute}} 
							replace
							isActive={
								function(match) {
									if (!match) {
										return false;
									} else {
										this.handleNavClick(link)
										return true;
									}
								}.bind(this)
							}
							>
								Step <span className="count-circle">{i + 1}</span> {navList.steps[link].linkText}
						</NavLink>

					</li>
				)
			}.bind(this)
		);
		return(stepLinks)
	}

	getAdminLinks() {
		const adminLinks = Object.keys(navList.admin).map(
			function(link, i) { 
				return(
					<li key={i}>
						<NavLink 
							to={{pathname: navList.admin[link].navRoute, state: {activeNav: navList.admin[link]}}}
							isActive={
								function(match) {
									if (!match) {
										return false;
									} else {
										this.handleNavClick(link)
										return true;
									}
								}.bind(this)
							}	
						>{navList.admin[link].linkText}</NavLink>
					</li>
				)
			}.bind(this)
		);
		return(adminLinks)
	}

	render() {
		const userLinks = this.getUserLinks()
		const adminLinks = this.getAdminLinks()

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