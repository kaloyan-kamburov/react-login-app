import React from 'react';
import { Link, Router, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

import { FaSignOut } from 'react-icons/lib/fa'


export default class Navigation extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            activeRoute: this.props.activeRoute
        }

    }
    // toggleNavbar = () => {
        
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeRoute: nextProps.activeRoute
        });
        console.log(nextProps)
    }

    logout = () => {
        this.props.onLogout();
    }
  

    renderLink = (name, path, authOnly, authHidden) => {
        if ((!authOnly && authHidden && !this.props.email) || (authOnly && this.props.email)) {
            return(
                <NavItem>
                    <NavLink className={this.state.activeRoute === path ? 'active' : ''} tag={Link} to={path}>
                        {name}
                    </NavLink>
                </NavItem>
            )
        }
        return;        
    }

    renderMenuItem = (element, authOnly) => {
        if (authOnly && typeof this.props.user.personalInfo === 'undefined') {
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
                        {this.renderLink("Register", "/register", false, true)}
                        {this.renderLink("Profile", "/profile", true, false)}
                        {this.renderLink("Login", "/login", false, true)}
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
