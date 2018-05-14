import React, { Component } from 'react';
import { Link, Router, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


import { isAuthorized, isAdmin } from '../../../common/auth/authFunctions';

import { FaSignOut,FaShoppingCart, FaClose, FaPlusCircle, FaMinusCircle, FaTrash} from 'react-icons/lib/fa';


export default class Navigation extends Component {
    
    constructor(props) {
        super(props); 
        
        this.state = {
            activeRoute: this.props.activeRoute,
            authorized: isAuthorized(),
            adminLogged: isAdmin(),
            cartMenuVisible: false
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

    renderCartMenu = () => {
        let productCount = 0;
        Object.keys(this.props.user.cart.products).forEach(key => {
            productCount += this.props.user.cart.products[key]
        });
        let cartVisible = {
            display: this.state.cartMenuVisible ? 'block' : 'none'
        }
        let tableVisible = {
            display: Object.keys(this.props.user.cart.products).length ? 'table' : 'none'
        } 
        let tableHidden = {
            display: Object.keys(this.props.user.cart.products).length ? 'none' : 'block'
        } 
        return(
            <li className='ml-auto nav-item cart'>
                <div className='cart-button-wrapper' onClick={this.toggleCartMenu}>
                    <FaShoppingCart />
                    <div className='product-count'>{productCount}</div>
                </div>
                <div className='cart-menu-wrapper' style={cartVisible}>
                    <FaClose className='btn-close' onClick={this.toggleCartMenu}/>
                    <div style={tableHidden} className='text-center'>No products added yet</div>
                    <table style={tableVisible}>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td className='text-center'>Quantity</td>
                                <td className='text-center'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(this.props.user.cart.products).map(key => {
                                return(
                                    <tr className='product' key={key}>
                                        <td>
                                            { this.props.products.all[key].name} 
                                        </td>
                                        <td>
                                            ${this.props.products.all[key].price}
                                        </td>
                                        <td className='text-center'>
                                            {this.props.user.cart.products[key]}
                                        </td>
                                        <td className='actions text-center'>
                                            <FaPlusCircle onClick={() => this.incrementQuantity(key)}/>
                                            &nbsp;
                                            <FaMinusCircle onClick={() => this.decrementQuantity(key)} />
                                            &nbsp;
                                            <FaTrash onClick={() => this.removeProductFromCart(key)} />
                                        </td>
                                    </tr>
                                )})
                            }
                            <tr>
                                <td><b>Total: </b></td>
                                <td colSpan='3'>
                                    ${this.calculateTotalPrice()}
                                </td>
                            </tr>                            
                        </tbody>
                    </table>
                </div>
            </li>
        )
    }
    
    incrementQuantity = productId => {
        let cart = this.props.user.cart;
        if (typeof cart.products[productId] !== 'undefined') {
            cart.products[productId]++;
        } else {
            cart.products[productId] = 1;
        }

        this.props.incrementQuantity({
            userId: this.props.user.personalInfo.id,
            cart
        });
    }

    decrementQuantity = productId => {
        let cart = this.props.user.cart;
        if (typeof cart.products[productId] !== 'undefined' && cart.products[productId] >= 1) {
            cart.products[productId]--;
        }
        
        if (cart.products[productId] === 0) {            
            delete cart.products[productId];
        }

        this.props.decrementQuantity({
            userId: this.props.user.personalInfo.id,
            cart
        });
    }

    removeProductFromCart = productId => {
        let cart = this.props.user.cart;
        if (typeof cart.products[productId] !== 'undefined') {
            delete cart.products[productId];
        }

        this.props.removeProductFromCart({
            userId: this.props.user.personalInfo.id,
            cart
        });
    }

    calculateTotalPrice = () => {
        let price = 0;
        Object.keys(this.props.user.cart.products).forEach(key => {
            price += (this.props.user.cart.products[key] * this.props.products.all[key].price);
        })

        return price;
    }

    toggleCartMenu = () => {
        this.setState({
            cartMenuVisible: !this.state.cartMenuVisible
        })
    }

    

    render() {
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
                        {this.renderLink("Users", "/admin/users", false, true)}
                        {this.renderLink("Products", "/admin/products", false, true)}
                        {this.renderLink("Categories", "/admin/categories", false, true)}
                        {this.renderMenuItem(
                            this.renderCartMenu(),
                            true
                        )}
                        {this.renderMenuItem(
                            <NavItem onClick={() => this.logout()} >
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
