import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
	
		recentProjects : {
			linkText : 'Recent Projects',
			navRoute : '/recentProjects',
			userAccess : 'admin'
		}
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
			<Link className="steps" to={{pathname: props.navRoute, state: {navID: props.navID}}}>
				Step <span className="count-circle">{props.index + 1}</span> {props.linkText}
			</Link>
			<span className="checkbox"></span>

			<div>
				<Route path={props.navRoute} component={showNavPath} />
			</div>
			
		</li>
	)
};

const MakeAdminNavLinks = (props) => {
	//console.log('MakeUserNavLinks : ' + props.linkText)

	return(
		<li key={props.index}>
			<Link to={{pathname: props.navRoute, state: {navID: props.navID}}}>{props.linkText}</Link>
			<div>
				<Route path={props.navRoute} component={showNavPath} />
			</div>
			
		</li>
	)
};

const LeftNav = () => {

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
				<Router>
					<ul>
						{userLinks}

						{adminLinks}
					</ul>
				</Router>
			</section>
		</nav>
    )
}

export default LeftNav;