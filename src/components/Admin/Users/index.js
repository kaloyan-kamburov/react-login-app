import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import Search from '../../common/Search'

// export default class Login extends Component {
//     constructor(props) {
//         super(props);
//     }
    

export default class Users extends Component {

    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            users: [],
            linkPath: '/users/edit/'
        }

    }

    // componentWillMount() {
    //     this.props.searchUsers();
    // }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        // this.setState({
        //     users: nextProps.admin.users.all
        // })
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

    searchUsers = value => {
        this.props.searchUsers(value);
    }

    render() {
        return(
            <div>
                <h2>Users</h2>
                <Search search={value => this.searchUsers(value)} resultRenderFunction={this.renderUser}
                        />
                {/* <Table>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>

                        

                    </tbody>
                </Table> */}
                
                {/* <Table>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => this.renderUser(user, index))}
                    </tbody>
                </Table> */}
            </div>

            
        )
        
    }
}