import React from 'react';
import { Link, Router } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class Navigation extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            activeState: ''
        }
    }
    // toggleNavbar = () => {
        
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }

    componentWillMount() {
        let loc = window.location.href,
            allIndexes = loc.split(''),
            firstIndex = loc.indexOf('/') + 1;

        //if (loc.lastIndexOf('/') && loc)

        
    }

    changeActiveState(activeState) {    
        //this.setState({ activeState });
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                {this.props.email}
                <Container>
                    <Nav pills>
                        <NavbarBrand tag={Link} to="/">
                            Home
                        </NavbarBrand>
                        <NavItem>
                            <NavLink className={this.state.activeState === "register" ? "active" : ""} onClick={() => this.changeActiveState('register')} tag={Link} to="/register">
                                Register
                            </NavLink>
                        </NavItem> 
                        <NavItem active="active">
                            <NavLink className={this.state.activeState === "profile" ? "active" : ""}  onClick={() => this.changeActiveState('profile')} tag={Link} to="/profile">
                                Profile
                            </NavLink>
                        </NavItem> 
                        
                        <NavItem className={this.state.activeState === "login" ? "active" : ""} onClick={() => this.changeActiveState('login')} >
                            <NavLink onClick={() => this.changeActiveState('register')} tag={Link} to="/login">
                                Login
                            </NavLink>
                        </NavItem> 
                        
                        {/* <NavbarToggler className="dsaads" onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse isOpen={!this.state.collapsed} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={Link} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse> */}
                    </Nav>
                </Container>
            </div>
        );
    }
}