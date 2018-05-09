import React, { Component } from 'react';
import { isAdmin } from '../../../common/auth/authFunctions';
import ProductListHome from '../../common/Lists/ProductListHome';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (isAdmin()) {
            this.props.getAllProducts();
        }
    }

    render() {
        if (isAdmin()) {
            return(
                <div>
                    <h1>Admin panel</h1>
                    <div>
                        <strong>Users:</strong> {this.props.admin.users.all.length}
                    </div>
                    <div>
                        <strong>Products:</strong> {Object.keys(this.props.products.all).length}
                    </div>
                    <div>
                        <strong>Categories:</strong> {Object.keys(this.props.categories.all).length}
                    </div>
                </div>               
            )
        } else {
            return(
                <div>
                    <h1>Home</h1>
                    <ProductListHome products={this.props.products.all} />
                </div>
            )
        }
    }
}