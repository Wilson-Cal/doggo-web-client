import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { SignUp, LogIn, Nav } from './components';


import './App.css';

class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = { authToken: false, user: {}, navItems: [] };

    this.setCookie = this.setCookie.bind(this);
    this.removeCookie = this.removeCookie.bind(this);
    this.setUser = this.setUser.bind(this);
    this.renderHome = this.renderHome.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;
    const authToken = cookies.get("doggo-auth");
    const navItems = [{ name: "Logout", icon: 'exit_to_app', func: () => this.removeCookie("doggo-auth") }];
    console.log(authToken);
    if (authToken) {
      this.setState({ authToken, navItems });
    }
  }

  setUser(username, email) {
    const user = { username, email };
    this.setState({ user });
  }

  setCookie(name, value, options) {
    const { cookies } = this.props;
    cookies.set(name, value, options);
    if (name === "doggo-auth") {
      const navItems = [{ name: "Logout", icon: 'exit_to_app', func: () => this.removeCookie("doggo-auth") }];
      this.setState({ authToken: value, navItems })
    }
    console.log("doggo-auth-cookie:" + cookies.get("doggo-auth"));
  }

  removeCookie(name, options) {
    const { cookies } = this.props;
    cookies.remove(name, options);
    if (name === "doggo-auth") {
      this.setState({ authToken: false, navItems: [], user: {} })
    }
  }

  renderHome() {
    const { authToken } = this.state;
    if (authToken) {
      return <p>TODO: Build user homepage</p>
    } else {
      return <LogIn setCookie={this.setCookie} setUser={this.setUser} />
    }
  }

  render() {
    const { user, navItems } = this.state;
    return (
      <Router>
        <Nav username={user.username} email={user.email} navItems={navItems} />
        <div className='container'>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              {this.renderHome()}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
