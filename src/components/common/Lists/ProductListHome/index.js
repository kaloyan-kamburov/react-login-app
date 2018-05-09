import React, { Component } from 'react';

export default class ProductListHome extends Component {
    constructor(props) {
        super(props);
    }

    renderProduct = productId => {
        console.log(productId)
        let imgPath = '../server/images/products/';
        return(
            <div className='col-md-4 col-xs-12 item-product' key={productId}>
                <div className='content'>
                    <img src={imgPath + this.props.products[productId].avatar} />
                    <strong>{this.props.products[productId].name}   </strong>
                </div>
            </div>
        )
    }

    renderProducts = () => {
        if (Object.keys(this.props.products).length) {
            return Object.keys(this.props.products).map(key => this.renderProduct(key))
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