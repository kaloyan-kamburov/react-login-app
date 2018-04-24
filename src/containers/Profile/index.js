import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import Profile from '../../components/pages/Profile';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../common/auth/authGuard';
import { isAuthorized } from '../../common/auth/authFunctions';

class ProfileContainer extends Component {
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
            <Profile {...this.props} />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    onUpdateUserInfo: payload => (
        dispatch({
            type: constants.USER_UPDATE_REQUEST,
            payload
        })
    ),

    onUpdateAdminInfo: payload => (
        dispatch({
            type: constants.ADMIN_UPDATE_INFO_REQUEST,
            payload
        })
    ),
    
    onChangeUserPassword: payload => (
        dispatch({
            type: constants.USER_CHANGE_PASSWORD_REQUEST,
            payload
        })
    ),
    
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));
