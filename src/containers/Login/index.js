import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import Login from '../../components/Login';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../common/auth/authGuard';
import { isAuthorized } from '../../common/auth/authFunctions';



class LoginContainer extends Component {
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
        if (this.state.authorized) {
            return <Redirect to='' />
        }

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
            type: constants.USER_LOGIN_REQUEST,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(LoginContainer), false);