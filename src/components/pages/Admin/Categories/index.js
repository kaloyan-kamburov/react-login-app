import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../../../common/Lists/CategoryList';

export default class Categories extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.props.getAllCategories();
    }

    render() {
        return(
            <div>
                <h2>Categories</h2>
                <Link to='/admin/categories/add'>Add category</Link>
                <CategoryList 
                    categories={this.props.categories.all}
                    deleteCategory={this.props.deleteCategory}
                />
            </div>
        )
    }
}