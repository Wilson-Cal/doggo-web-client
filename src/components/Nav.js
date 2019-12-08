import React from 'react';
import { Navbar, Icon } from 'react-materialize';
import { Link } from "react-router-dom";
import { } from './common';
import NavItem from 'react-materialize/lib/NavItem';

const navBarOptions = {
    draggable: true,
    edge: 'left',
    inDuration: 250,
    onCloseEnd: null,
    onCloseStart: null,
    onOpenEnd: null,
    onOpenStart: null,
    outDuration: 200,
    preventScrolling: true
}

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.getSideNav = this.getSideNav.bind(this);
        this.renderNavBarItems = this.renderNavBarItems.bind(this);
    }

    getSideNav() {
        const { username, email, navItems } = this.props;
        if (navItems.length < 1) {
            return <p className='center'>Please Login to View Your Account</p>;
        } else {
            return (
                <ul>
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img alt="profile-background" src="dogpattern.png" />
                            </div>
                            <a href="#user"><img className="circle" alt='Account Picutre' src="dogprofilepic.jpg" /></a>
                            <a href="#name"><span className="black-text name">{username}</span></a>
                            <a href="#email"><span className="black-text email">{email}</span></a>
                        </div>
                    </li>
                    <li>
                        <a href="#!" className="waves-effect"><i className="material-icons">cloud</i>First Link With Icon</a>
                        <a href="#!" className="waves-effect"><i className="material-icons">cloud</i>First Link With Icon</a>
                        <a href="#!" className="waves-effect"><i className="material-icons">cloud</i>First Link With Icon</a>
                        <a href="#!" className="waves-effect"><i className="material-icons">cloud</i>First Link With Icon</a>
                        <a href="#!" className="waves-effect"><i className="material-icons">cloud</i>First Link With Icon</a>
                        <a href="#!" className="waves-effect"><i className="material-icons">cloud</i>First Link With Icon</a>
                    </li>
                </ul>
            )
        }
    }

    renderNavBarItems() {
        const { navItems } = this.props;
        return navItems.map((navItem, i) => {
            return <NavItem key={`navItem${i}`} onClick={navItem.func}><Icon left>{navItem.icon}</Icon>{navItem.name}</NavItem>
        });
    }

    render() {
        return (
            <Navbar
                alignLinks="right"
                brand={<Link to='/'><i className="material-icons right">pets</i></Link>}
                menuIcon={<Icon>menu</Icon>}
                options={navBarOptions}
                sidenav={this.getSideNav()}
                className="blue lighten-1"
            >
                {this.renderNavBarItems()}
            </Navbar>
        )
    }
}

export default Nav;