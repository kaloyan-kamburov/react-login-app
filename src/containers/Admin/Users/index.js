import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import Users from '../../../components/Admin/Users';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';


class UsersContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Users {...this.props} />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    searchUsers: payload => (
        dispatch({
            type: constants.USER_ADMIN_SEARCH_USERS_REQUEST,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(UsersContainer), true, true);