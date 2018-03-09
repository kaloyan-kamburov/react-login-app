import React from 'react';
import { Link, Router, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import isTokenExpired from '../../common/auth/jwtHelper';

import { FaSignOut } from 'react-icons/lib/fa'


export default class Navigation extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            activeRoute: this.props.activeRoute,
            authorized: this.isAuthorized()
        }

    }

    isAuthorized = () => {
        return !!(localStorage.getItem('token') && !isTokenExpired(localStorage.getItem('token')));
    }
    // toggleNavbar = () => {
        
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeRoute: nextProps.activeRoute,
            authorized: this.isAuthorized()
        });
    }

    logout = () => {
        this.props.onLogout();
    }

    renderLink = (name, path, authHidden) => {
        if ((authHidden && this.state.authorized) || (!authHidden && !this.state.authorized))  {
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
                        {this.renderMenuItem(
                            <NavItem onClick={() => this.logout()} className="ml-auto">
                                <FaSignOut  className="btn-signout"/>
                            </NavItem>,
                            true
                        )}
                    </Nav>
                    
                </Container>
            </div>
        );
    }
}
