import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { SignUp, AddDog, LogIn, Home, Nav } from './components';


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
    const navItems = [{ name: "Add a Doggo", icon: 'add', href: "/addDoggo" }, { name: "Logout", href: "/", icon: 'exit_to_app', func: () => this.removeCookie("doggo-auth") }];
    if (authToken) {
      const username = cookies.get("username");
      const user_id = cookies.get("user_id");
      const email = cookies.get("email");
      const user = { username, user_id, email };
      this.setState({ authToken, navItems, user });
    }
  }

  setUser(username, user_id, email) {
    this.setCookie("username", username, { expires: new Date((Date.now() + 86400000)) });
    this.setCookie("user_id", user_id, { expires: new Date((Date.now() + 86400000)) });
    this.setCookie("email", email, { expires: new Date((Date.now() + 86400000)) });
    const user = { username, user_id, email };
    this.setState({ user });
  }

  setCookie(name, value, options) {
    const { cookies } = this.props;
    cookies.set(name, value, options);
    if (name === "doggo-auth") {
      const navItems = [{ name: "Add a Doggo", icon: 'add', href: "/addDoggo" }, { name: "Logout", href: "/", icon: 'exit_to_app', func: () => this.removeCookie("doggo-auth") }];
      this.setState({ authToken: value, navItems })
    }
  }

  removeCookie(name, options) {
    const { cookies } = this.props;
    cookies.remove(name, options);
    if (name === "doggo-auth") {
      cookies.remove('username');
      cookies.remove('user_id');
      cookies.remove('email');
      this.setState({ authToken: false, navItems: [], user: {} })
    }
  }

  renderHome() {
    const { user } = this.state;
    const { authToken } = this.state;
    if (authToken) {
      return <Home user={user} authToken={authToken} />
    } else {
      return <LogIn setCookie={this.setCookie} setUser={this.setUser} />
    }
  }

  render() {
    const { user, navItems, authToken } = this.state;
    return (
      <Router>
        <Nav username={user.username} email={user.email} navItems={navItems} />
        <div className='container'>
          <Switch>
            <Route path="/addDoggo">
              <AddDog user_id={user.user_id} authToken={authToken} />
            </Route>
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
