import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';

export default class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkPath: '/admin/categories/edit/',
            categories: props.categories,
            sortCriteria: '',
            sortDirectionDown: true,
            modalVisible: false,
            categoryDelete: {}
            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalVisible: false,
            categories: nextProps.categories
        })
    }

    renderTableHeader = () => {
        return (
            <div className='list-table-head'>
                <div>Name</div>
                <div>Action</div>
            </div>
        );
    }

    renderData = () => {
        if (Object.keys(this.state.categories).length) {
            return (
                <div className='list table'>
                    {this.renderTableHeader()}
                    {Object.keys(this.state.categories).map(key => 
                        this.categoryRenderFunction(this.state.categories[key])
                    )}
                </div>
            );
        }
        return <div>No categories found</div>;        
    }

    showDeleteCategoryModal = category => {
        this.setState({
            categoryDelete: category,
            modalVisible: true
        })
    }

    categoryRenderFunction = category => {
        let path = this.state.linkPath + category._id;
        return (
            <div className='list-item' key={category.name}>
                <div className='list-item-property'>{category.name}</div>
                <div className='list-item-property'>
                    <Link to={path}>Edit</Link>
                    <div onClick={() => this.showDeleteCategoryModal(category)}>Delete</div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='list-users'>
                {this.renderData()}
                <Modal 
                    show={this.state.modalVisible}
                    type='prompt'
                    confirmFunction={() => this.props.deleteCategory(this.state.categoryDelete._id)}
                    msg={`Are you sure you want to delete category <b>${this.state.categoryDelete.name}</b> ?`}
                />
            </div>
        )
    }
}