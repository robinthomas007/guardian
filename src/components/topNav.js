import React from 'react';

const TopNav = () => {
    return(
        <nav className="top-nav int">
            <ul>
                <li><a className="help" href="help-guide.html">Help Guide</a></li>
                <li>Welcome, #User First &amp; Last Name#</li>
                <li><a href="index.html">Log Out</a></li>
            </ul>
        </nav>
    )
}

export default TopNav;