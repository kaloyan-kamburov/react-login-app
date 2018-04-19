import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import Users from '../../../components/pages/Admin/Users';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

class UsersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: isAuthorized()
        }
    }

    componentWillReceiveProps() {
        this.setState({
            authorized: isAuthorized()
        });
    }

    render() {
        if (!this.state.authorized) {
            return <Redirect to=''/>
        }

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
    changeSearchField: payload => (
        dispatch({
            type: constants.ADMIN_CHANGE_SEARCH_FIELD,
            payload 
        })        
    ),
    deleteUser: payload => (
        dispatch({ 
            type: constants.ADMIN_DELETE_USER_REQUEST,
            payload
        })
    ),
    deleteUserSuccess: payload => (
        dispatch({
            type: constants.ADMIN_DELETE_USER_SUCCESS,
            payload
        })
    ),
    searchUsers: payload => (
        dispatch({
            type: constants.ADMIN_SEARCH_USERS_REQUEST,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(UsersContainer), true, true);