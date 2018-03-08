import React, { Component } from 'react';

import Form from '../../containers/Form';
import Input from '../../containers/Form/Input';

import { Redirect } from 'react-router-dom';

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
            loggedIn: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.user.personalInfo.email) {
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {
        
        if (this.state.loggedIn) {
            return(
                <Redirect to=''/>
            )
        }
        return(
            <Form 
                onSubmit={this.props.onSubmit}
                serverErrorMsg={this.props.user.personalInfo.serverErrorMsg}
                serverErrorType={this.props.user.personalInfo.serverErrorType}
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
