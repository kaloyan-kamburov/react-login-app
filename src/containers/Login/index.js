import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import Login from '../../components/Login';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../common/auth/authGuard'



class LoginContainer extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = payload => {
        this.props.onSubmit(payload);
    }

    render() {
        return(
            <Login {...this.props} />
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: payload => (
        dispatch({
            type: constants.USER_LOGIN,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(LoginContainer), false);