import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <li key={index}>{user.username} <Link to={path}>Edit</Link></li>
        )
    }

    render() {
        return(
            this.state.users.map((user, index) => this.renderUser(user, index))
        )
        
    }
}