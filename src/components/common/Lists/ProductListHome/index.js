import React, { Component } from 'react';
import * as constants from '../../../../common/constants';
import { isAuthorized } from '../../../../common/auth/authFunctions';
import { connect } from 'react-redux';
import { FaCartPlus } from 'react-icons/lib/fa';

class ProductListHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products.all
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
    }

    addToCart = productId => {

        let cart = this.props.user.cart;
        if (typeof cart.products[productId] !== 'undefined') {
            cart.products[productId]++;
        } else {
            cart.products[productId] = 1;
        }

        this.props.addToCart({
            userId: this.props.user.personalInfo.id,
            cart
        })
    }

    renderAddToCartButton = productId => {
        if (isAuthorized()) {
            return(                
                <button className='btn btn-primary' 
                    onClick={() => this.addToCart(productId)}>
                    <FaCartPlus /> Add to cart
                </button>
            );
        }
        return;
    }

    renderProduct = productId => {
        let imgPath = constants.API_URL + '/images/products/' + this.state.products[productId].avatar;
        return(
            <div className='col-md-4 col-xs-12 item-product' key={productId}>
                <div className='content'>
                    <img src={imgPath} />
                    <strong>{this.state.products[productId].name}   </strong>
                    <strong>${this.state.products[productId].price}   </strong>
                    {this.renderAddToCartButton(productId)}
                </div>
            </div>
        )
    }

    renderProducts = () => {
        if (Object.keys(this.state.products).length) {
            return Object.keys(this.state.products).map(key => this.renderProduct(key))
        } else {
            return(
                <strong>No products found</strong>
            )
        }
    }

    render() {
        return(
            <div className='row'>
                {this.renderProducts()}                    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({ 
    addToCart: payload => (
        dispatch({
            type: constants.USER_ADD_PRODUCT_TO_CART_REQUEST,
            payload
        })
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListHome);