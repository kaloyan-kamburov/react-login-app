import React, { Component } from 'react';

import Form from '../../containers/Form';
import Input from '../../containers/Form/Input';

import { Redirect } from 'react-router-dom';

import { isAuthorized } from '../../common/auth/authFunctions';

import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password 
} from '../../common/validators';

// const HOC = (Component, statePart) => {
    
// }

export default class Login extends Component {
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
            return <Redirect to=''/>
        }
        return(
            <Form 
                onSubmit={this.props.onSubmit}
                msg={this.props.user.personalInfo.msgLoginError}
                formData={{
                    username: this.props.user.personalInfo.username,
                    password: this.props.user.personalInfo.password
                }}
            >
                <Input 
                    type='text' 
                    name='username'
                    label='Username'
                    value={this.props.user.personalInfo.username} 
                    validators={[notEmpty, length(3, 24)]}
                />
                <Input 
                    type='password' 
                    name='password' 
                    label='Password'
                    value=''
                    validators={[notEmpty]}
                />
            </Form>
        )
    }
}
