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
        })
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

    render() {
        // console.log(this.props)  onClick={() => this.changeActiveState(name)}s
        return (
            <div>
                {this.props.email}
                <Container>
                    <Nav className="mr-auto">
                        <NavbarBrand tag={Link} to="/">
                            Home
                        </NavbarBrand>
                        {this.renderLink("Register", "/register", false, true)}
                        {this.renderLink("Profile", "/profile", true, false)}
                        {this.renderLink("Login", "/login", false, true)}
                        <NavItem>
                            <FaSignOut className="btn-signout"/>
                        </NavItem>
                    </Nav>
                    
                </Container>
            </div>
        );
    }
}
