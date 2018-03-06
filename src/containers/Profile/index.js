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
    onSubmit: payload => (
        dispatch({
            type: constants.USER_UPDATE,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(Profile));
