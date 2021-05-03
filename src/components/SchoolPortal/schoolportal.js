
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './schoolportal.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "../Login/login";
import SignUp from "../SignUp/signup";
import NoMatch from '../404Page/404Page';
export default function schoolportal({ setToken }) {
  
    return (
        <Router>
        <div className="schoolportal">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>iSchool.in</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={()=> <Login setToken={setToken} />}   />
                <Route path="/sign-in" component={()=> <Login setToken={setToken} />} />
                <Route path="/sign-up" component={SignUp} />
               
              </Switch>
            </div>
          </div>
        </div></Router>
      );
}

