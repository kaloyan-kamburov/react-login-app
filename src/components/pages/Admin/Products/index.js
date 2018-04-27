import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../../../common/Lists/ProductList';

export default class Products extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>Products</h2>
                <Link to='/admin/products/add'>Add product</Link>
                <ProductList 
                    products={this.props.products.all}
                />
            </div>
        )
    }
}