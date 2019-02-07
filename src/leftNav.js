import React from 'react';
import AppRouter from './AppRouter1';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const navList = {
	userLinks : {
		releaseInformation : {
			linkText : 'Release Information'
		}, 

		projectContacts : {
			linkText : 'Project Contacts'
		}, 

		audioFiles : {
			linkText : 'Audio Files (#)' 
		}, 

		trackInfo :{
			linkText : 'Track Information (#)'
		},

		territorialRights: {
			linkText : 'Territorial Rights'
		},

		blockingPolicies : {
			linkText : 'Blocking Policies'
		},

		reviewSubmit : {
			linkText : 'Review & Submit'
		},
	}, 

	adminLinks : {
		newProject : {
			linkText : 'New Project'
		},

		findProject : {
			linkText : 'Find a Project'
		},

		recentProjects : {
			linkText : 'Find a Project'
		}
	}
};


const MakeUserNavLinks = (props) => {
	//console.log('MakeUserNavLinks : ' + props.linkText)
	return(
		<li key={props.index}><a className="steps" href="release-information.html">Step <span className="count-circle"></span> {props.linkText}</a> <span className="checkbox"></span></li>
	)
};

const MakeAdminNavLinks = (props) => {
	//console.log('MakeAdminNavLinks : '  + props.linkText)
	return(
		<li key={props.index}><a href="release-information.html">{props.linkText}</a></li>
	)
};

const LeftNav = () => {

	const userLinks = Object.keys(navList.userLinks).map(
		function(link, i) { 
			return(
				<MakeUserNavLinks key={i} index={i} linkText={navList.userLinks[link].linkText} />
			)
		}
	);

	const adminLinks = Object.keys(navList.userLinks).map(
		function(link, i) { 
			return(
				<MakeAdminNavLinks key={i} index={i} linkText={navList.userLinks[link].linkText} />
			)
		}
	);

    return(
		<nav className="left-nav col-2">
			<section className="fixed-left-nav col-2">
				<span className="left-nav-logo"></span>
				<ul>
					{userLinks}
					{adminLinks}
				</ul>
			</section>

            <AppRouter />
		</nav>
    )
}

export default LeftNav;