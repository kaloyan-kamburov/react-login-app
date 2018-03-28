import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

// export default class Login extends Component {
//     constructor(props) {
//         super(props);
//     }
    

export default class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            linkPath: '/users/edit/'
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            users: nextProps.admin.users.all
        })
    }
    
    renderUser = (user, index) => {
        let path = this.state.linkPath + user._id
        return(
            <tr key={index}>
                <td>{user.username}</td>
                <td><Link to={path}>Edit</Link></td>
            </tr>
        )
    }

    render() {
        return(
            <div>
                <h2>Users</h2>
                <Table>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => this.renderUser(user, index))}
                    </tbody>
                </Table>
            </div>
            
        )
        
    }
}