import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import Register from '../../components/Register';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../common/auth/authGuard';
import { isAuthorized } from '../../common/auth/authFunctions';



class RegisterContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: isAuthorized()
        }
    }

    onSubmit = payload => {
        this.props.onSubmit(payload);
    }

    componentWillReceiveProps() {
        this.setState({
            authorized: isAuthorized()
        });
    }


    render() {
        if (this.state.authorized) {
            return <Redirect to=''/>
        }

        return(
            <Register {...this.props} />
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
            type: constants.USER_REGISTER,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer), false);