import React from 'react';
import AppRouter from './AppRouter1';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const navList = [
    'Release Information',
    'Project Contacts',
    'Audio Files (#)',
    'Track Information (#)',
    'Territorial Rights',
    'Blocking Policies',
    'Review &amp; Submit'
];



const LeftNav = () => {
    return(
		<nav class="left-nav col-2">
			<section class="fixed-left-nav col-2">
				<span class="left-nav-logo"></span>
				<ul>
					<li><a class="steps" href="release-information.html">Step <span class="count-circle">1</span> Release Information</a> <span class="checkbox"></span></li>
					<li><a class="steps" href="project-contacts.html">Step <span class="count-circle">2</span> Project Contacts</a> <span class="checkbox"></span></li>
					<li><a class="steps" href="audio-files.html">Step <span class="count-circle">3</span> Audio Files (#)</a> <span class="checkbox"></span></li>
					<li><a class="steps" href="track-information.html">Step <span class="count-circle">4</span> Track Information (#)</a> <span class="checkbox"></span></li>
					<li><a class="steps" href="territorial-rights.html">Step <span class="count-circle">5</span> Territorial Rights</a> <span class="checkbox"></span></li>
					<li><a class="steps" href="blocking-policies.html">Step <span class="count-circle">6</span> Blocking Policies</a> <span class="checkbox"></span></li>
					<li><a class="steps" href="project-review.html">Step <span class="count-circle">7</span> Review &amp; Submit</a> <span class="checkbox"></span></li>

					<li><a href="release-information.html">New Project</a></li>
					<li><a href="project-search.html">Find a Project</a></li>
					<li><a href="project-search.html">Recent Projects</a></li>
				</ul>
			</section>

            <AppRouter />

		</nav>

        
    )
}

export default LeftNav;