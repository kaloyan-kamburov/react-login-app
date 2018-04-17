import React, { Component } from 'react';
import { Link, Router, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


import { isAuthorized, isAdmin } from '../../../common/auth/authFunctions';

import { FaSignOut } from 'react-icons/lib/fa'
import { isatty } from 'tty';


export default class Navigation extends Component {
    
    constructor(props) {
        super(props); 
        
        this.state = {
            activeRoute: this.props.activeRoute,
            authorized: isAuthorized(),
            adminLogged: isAdmin()
        }

    }

    // toggleNavbar = () => {
        
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeRoute: nextProps.activeRoute,
            authorized: isAuthorized(),
            adminLogged: isAdmin()
        });
    }

    logout = () => {
        this.props.onLogout();
    }

    renderLink = (name, path, authHidden, adminOnly) => {
        if ((authHidden && this.state.authorized) || //the link is VISIBLE ONLY when you're authorized 
            (!authHidden && !this.state.authorized) || //the link is NOT VISIBLE when you're authorized
            (!authHidden && adminOnly && this.state.authorized && !this.state.adminLogged) //the link is VISIBLE ONLY when you're logged as admin
        )  {
            return;
        }

        return(
            <NavItem>
                <NavLink className={this.state.activeRoute === path ? 'active' : ''} tag={Link} to={path}>
                    {name}
                </NavLink>
            </NavItem>
        );
    }

    renderMenuItem = (element, authOnly) => {
        if (authOnly && this.state.authorized) {
            return element;
        }
        return;
    }

    

    render() {
        
        // console.log(this.props)
        // console.log(this.props)  onClick={() => this.changeActiveState(name)}s
        return (
            <div>
                <Container>
                    <Nav className="align-items-center">
                        <NavbarBrand tag={Link} to="/">
                            Home
                        </NavbarBrand> 
                        {this.renderLink("Register", "/register", true)}
                        {this.renderLink("Profile", "/profile", false)}
                        {this.renderLink("Login", "/login", true)}
                        {this.renderLink("Users", "/users", false, true)}
                        {this.renderLink("Products", "/products", false, true)}
                        {this.renderMenuItem(
                            <NavItem onClick={() => this.logout()} className="ml-auto">
                                <NavLink tag={Link} to='/'>
                                    <FaSignOut  className="btn-signout"/>
                                </NavLink>
                            </NavItem>,
                            true
                        )}
                    </Nav>
                    
                </Container>
            </div>
        );
    }
}
