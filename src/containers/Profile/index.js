import React, { Component } from 'react';
import AuthGuard from '../../common/auth/authGuard';

import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import Profile from '../../components/Profile';

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    onUpdateUserInfo: payload => (
        dispatch({
            type: constants.USER_UPDATE,
            payload
        })
    ),
    
    onChangeUserPassword: payload => (
        dispatch({
            type: constants.USER_CHANGE_PASSWORD,
            payload
        })
    ),
    
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(Profile));
