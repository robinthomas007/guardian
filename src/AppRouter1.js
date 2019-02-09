import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            1<Link to="/">Home</Link>
          </li>
          <li>
            2<Link to="/about/">About</Link>
          </li>
          <li>
            3<Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>

      4<Route path="/" exact component={Index} />
      5<Route path="/about/" component={About} />
      6<Route path="/users/" component={Users} />
    </div>
  </Router>
);

export default AppRouter;