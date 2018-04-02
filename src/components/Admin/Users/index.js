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

        this.state = {
            users: [],
            linkPath: '/users/edit/'
        }

    }

    // componentWillMount() {
    //     this.props.searchUsers();
    // }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
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

    searchUsers = searchValue => {
        this.props.searchUsers({
            searchValue,
            searchField: this.props.admin.users.searchField
        });
    }

    renderSearchResults = results => {
        return results.map( result => {
            return <tr key={result.username} className='result'><td>{result.username}</td></tr>
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
                    searchResults={this.props.admin.users.searchResults}
                    renderSearchResults={this.renderSearchResults}
                    resultsContainerType={'table'}
                />
                <br />
                
                
               
            </div>

            
        )
        
    }
}