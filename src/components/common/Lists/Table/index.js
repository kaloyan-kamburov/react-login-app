import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UserList extends Component {
    constructor(props) {
        super();
        
        this.state = {
            linkPath: '/users/edit/',
            data: props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        })
    }

    tableHeaderCellClick = criteria => {
        console.log(criteria)
    }

    renderTableHeader = () => {
        if (this.state.data.length) {
            return(
                <div className='list-table-head'>
                    <div onClick={() => this.tableHeaderCellClick('username')}>Username</div>
                    <div onClick={() => this.tableHeaderCellClick('firstname')}>Firstname</div>
                    <div onClick={() => this.tableHeaderCellClick('lastname')}>Lastname</div>
                    <div onClick={() => this.tableHeaderCellClick('email')}>Email</div>
                    <div>Action</div>
                </div>
            );
        }
    }

    renderData = () => {
        return(
            <div className='list table'>
                {this.renderTableHeader()}
                {this.state.users.map(user => (
                    this.tableRenderFunction(user)
                ))}
            </div>
        )
    }

    tableRenderFunction = item => {
        let path = this.state.linkPath + item._id
        return(
            <div className='list-item' key={item._id}>
                <div className='list-item-property'>{item.username}</div>
                <div className='list-item-property'>{item.firstname}</div>
                <div className='list-item-property'>{item.lastname}</div>
                <div className='list-item-property'>{item.email}</div>
                <div className='list-item-property'><Link to={path}>Edit</Link></div>
            </div>

        )
    }

    render() {
        return(

            this.renderData()
        )
    }
}