import React, { Component } from 'react';
import UserList from '../../common/Lists/UserList'

import Search from '../../common/Search'

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            linkPath: '/users/edit/'
        }
    }

    searchUsers = searchValue => {
        this.props.searchUsers({
            searchValue,
            searchField: this.props.admin.users.searchField
        });
    }

    render() {
        return(
            <div>
                <h2>Users</h2>
                <Search 
                    search={searchValue => this.searchUsers(searchValue)} 
                    changeSearchField={this.props.changeSearchField}
                    searchField={this.props.admin.users.searchField}
                    searchFields={['username', 'email', 'firstname', 'lastname']}
                />
                <UserList deleteUser={this.props.deleteUser} users={this.props.admin.users.searchResults} />
            </div>
        )
    }
}