import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as constants from '../../common/constants';

import LoginForm from '../../components/LoginForm';
import AuthGuard from '../../common/auth/authGuard';
import axios from 'axios';
import * as authFunctions from '../../common/auth/authFunctions';
import { Redirect } from 'react-router-dom';

class LoginContainer extends Component {

    constructor(props) {
        super(props);

        
        this.state = {            
            userOrEmail: '',
            password: '',
            user: props.user
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
        });
    }


    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })

    }

    onSubmit = payload => {
        this.props.onSubmit({
            userOrEmail: payload.userOrEmail.value,
            password: payload.password.value,
        })
    }

    render() {
        return <LoginForm 
            userOrEmail={this.state.userOrEmail} 
            password={this.state.password} 
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            errorMsg={this.state.user.errorMsg}
            user={this.state.user}
        />
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: payload => {
            dispatch({
                type: constants.USER_LOGIN,
                payload
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)