import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        }
    }
    toggleNavbar = () => {
        
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <div>
                {this.props.email.value}
                <Navbar color="faded" light expand="md">
                    <Container>
                    <NavbarBrand tag={Link} to="/">
                            Home
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink onClick={() => { }} tag={Link} to="/register">
                                Register
                            </NavLink>
                        </NavItem> 
                        <NavItem>
                            <NavLink onClick={() => { }} tag={Link} to="/login">
                                Login
                            </NavLink>
                        </NavItem> 
                    </Nav>
                    </Container>
                    
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
                </Navbar>
            </div>
        );
    }
}