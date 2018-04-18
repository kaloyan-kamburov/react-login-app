import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Categories extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>Categories</h2>
                <Link to='/admin/categories/add'>Add category</Link>
            </div>
        )
    }
}