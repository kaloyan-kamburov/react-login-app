import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';

export default class UserList extends Component {
    constructor(props) {
        super();

        this.state = {
            linkPath: '/admin/categories/edit/',
            categories: props.categories,
            sortCriteria: '',
            sortDirectionDown: true,
            modalVisible: false,
            userDelete: ''
            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalVisible: false,
            categories: nextProps.categories
        })
    }
    
    tableHeaderCellClick = criteria => {
        let newCategories = this.state.categories.sort((obj1, obj2) => this.compare(obj1, obj2, criteria)),
            sortDirectionDown = true;

        if (this.state.sortCriteria == criteria && this.state.sortDirectionDown) {
            sortDirectionDown = false;
            newCategories.reverse();
        }

        this.setState({
            categories: newCategories,
            sortCriteria: criteria,
            sortDirectionDown,
            modalVisible: false        
        });
    }

    compare = (obj1, obj2, criteria) => {
        if (obj1[criteria] < obj2[criteria])
            return -1;
        if (obj1[criteria] > obj2[criteria])
            return 1;
        return 0;
    }

    setHeaderCriteriaClass = criteria => {
        let className = '';

        if (this.state.sortCriteria == criteria) {
            className = 'active';

            if (this.state.sortDirectionDown) {
                className += ' down';
            } else {
                className += ' up';
            }
        }

        return className;
    }

    renderTableHeader = () => {
        if (this.state.categories.length) {
            return (
                <div className='list-table-head'>
                    <div className={this.setHeaderCriteriaClass('name')} onClick={() => this.tableHeaderCellClick('username')}>Name</div>
                    <div>Action</div>
                </div>
            );
        }
    }

    renderData = () => {
        return (
            <div className='list table'>
                {this.renderTableHeader()}
                {this.state.categories.map(user => (
                    this.categoryRenderFunction(user)
                ))}
            </div>
        )
    }

    highlightFunction = (string, searchValue) => {
        // return string.
    }

    showDeleteUserModal = user => {
        this.setState({
            userDelete: user,
            modalVisible: true
        })
    }

    categoryRenderFunction = (category, searchValue) => {
        let path = this.state.linkPath + category._id
        return (
            <div className='list-item' key={category._id}>
                <div className='list-item-property'>{category.name}</div>
                <div className='list-item-property'>
                    <Link to={path}>Edit</Link>
                    <div onClick={() => this.showDeleteUserModal(category)}>Delete</div>
                </div>
            </div>

        )
    }

    deleteUser = () => {
        let userIndex = this.state.categories.findIndex(user => user._id === this.state.userDelete._id)
        this.props.deleteUser({
            id: this.state.userDelete._id
        })
        this.props.deleteUserSuccess(userIndex)
    }

    render() {
        return (
            <div className='list-users'>
                {this.renderData()}
                <Modal 
                    show={this.state.modalVisible}
                    type='prompt'
                    confirmFunction={this.deleteUser}
                    msg={`Are you sure you want to delete user <b>${this.state.userDelete.username}</b> ?`}
                />
            </div>
        )
    }
}