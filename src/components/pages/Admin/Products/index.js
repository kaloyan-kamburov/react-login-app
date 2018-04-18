import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Products extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>Products</h2>
                <Link to='/admin/products/add'>Add product</Link>
            </div>
        )
    }
}