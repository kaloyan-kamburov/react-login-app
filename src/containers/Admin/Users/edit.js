import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import UserEdit from '../../../components/Admin/Users/edit';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

class UserEditContainer extends Component {
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
        return(
            <UserEdit {...this.props} />
        );
    }

}

const mapStateToProps = state => {
    return {  
        ...state
    }
}

const mapDispatchToProps = dispatch => ({ 
    getUser: payload => (
        dispatch({
            type: constants.USER_ADMIN_GET_REQUEST,
            payload
        })
    ),
    onUpdateUserInfo: payload => (
        dispatch({
            type: constants.USER_ADMIN_UPDATE_REQUEST,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(UserEditContainer), true, true);