import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';

export default class UserList extends Component {
    constructor(props) {
        super();

        this.state = {
            linkPath: '/admin/users/edit/',
            users: props.users,
            sortCriteria: '',
            sortDirectionDown: true,
            modalVisible: false,
            userDelete: ''
            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modalVisible: false,
            users: nextProps.users
        })
    }
    
    tableHeaderCellClick = criteria => {
        let newUsers = this.state.users.sort((obj1, obj2) => this.compare(obj1, obj2, criteria)),
            sortDirectionDown = true;

        if (this.state.sortCriteria == criteria && this.state.sortDirectionDown) {
            sortDirectionDown = false;
            newUsers.reverse();
        }

        this.setState({
            users: newUsers,
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
        if (this.state.users.length) {
            return (
                <div className='list-table-head'>
                    <div className={this.setHeaderCriteriaClass('username')} onClick={() => this.tableHeaderCellClick('username')}>Username</div>
                    <div className={this.setHeaderCriteriaClass('firstname')} onClick={() => this.tableHeaderCellClick('firstname')}>Firstname</div>
                    <div className={this.setHeaderCriteriaClass('lastname')} onClick={() => this.tableHeaderCellClick('lastname')}>Lastname</div>
                    <div className={this.setHeaderCriteriaClass('email')} onClick={() => this.tableHeaderCellClick('email')}>Email</div>
                    <div>Action</div>
                </div>
            );
        }
    }

    renderData = () => {
        return (
            <div className='list table'>
                {this.renderTableHeader()}
                {this.state.users.map(user => (
                    this.userRenderFunction(user)
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

    userRenderFunction = (user, searchValue) => {
        let path = this.state.linkPath + user._id
        return (
            <div className='list-item' key={user._id}>
                <div className='list-item-property'>{user.username}</div>
                <div className='list-item-property'>{user.firstname}</div>
                <div className='list-item-property'>{user.lastname}</div>
                <div className='list-item-property'>{user.email}</div>
                <div className='list-item-property'>
                    <Link to={path}>Edit</Link>
                    <div onClick={() => this.showDeleteUserModal(user)}>Delete</div>
                </div>
            </div>

        )
    }

    deleteUser = () => {
        let userIndex = this.state.users.findIndex(user => user._id === this.state.userDelete._id)
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