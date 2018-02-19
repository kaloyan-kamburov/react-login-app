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
    // toggleNavbar = () => {
        
    //     this.setState({
    //         collapsed: !this.state.collapsed
    //     });
    // }

    componentWillUpdate() {
        // debugger;        
    }

    componentWillReceiveProps(newProps) {
        // debugger
        // this.setState(newProps)
    }
    render() {
        return (
            <div>
                {this.props.email}
                {this.props.errorType}
                <Container>
                    <Nav pills>
                        <NavbarBrand tag={Link} to="/">
                                Home
                        </NavbarBrand>
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