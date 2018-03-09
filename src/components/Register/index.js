import React, { Component } from 'react';

import Form from '../../containers/Form';
import Input from '../../containers/Form/Input';

import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password 
} from '../../common/validators';

export default class Register extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Form 
                onSubmit={this.props.onSubmit}
                msg={this.props.user.personalInfo.msg}
                success={this.props.user.personalInfo.success}
                serverErrorType={this.props.user.personalInfo.serverErrorType}
                formData={this.props.user.personalInfo}
            >
                <Input 
                    type='text' 
                    name='username'
                    label='Username'
                    value={this.props.user.personalInfo.username} 
                    validators={[notEmpty, length(3, 24)]}
                />
                <Input 
                    type='text' 
                    name='firstname'
                    label='First name'
                    value={this.props.user.personalInfo.firstname} 
                    validators={[notEmpty, length(3, 24)]}
                />
                <Input 
                    type='text' 
                    name='lastname' 
                    label='Last name'
                    value={this.props.user.personalInfo.lastname} 
                    validators={[notEmpty, length(3, 24)]}
                />
                <Input 
                    type='text' 
                    name='address' 
                    label='Address'
                    value={this.props.user.personalInfo.address} 
                    validators={[notEmpty]}
                />
                <Input 
                    type='number' 
                    name='phone' 
                    label='Phone number'
                    value={this.props.user.personalInfo.phone} 
                    validators={[notEmpty]}
                />
                <Input 
                    type='email' 
                    name='email' 
                    label='Email'
                    value={this.props.user.personalInfo.email} 
                    validators={[notEmpty, email]}
                />
                <Input 
                    type='password' 
                    name='password' 
                    label='Password'
                    value=''
                    validators={[notEmpty]}
                />
                <Input 
                    type='password' 
                    name='passwordConfirm'
                    label='Confirm password'
                    value=''
                    validators={[comparePasswords('password', 'passwordConfirm')]}
                />
            </Form>
        )
    }
}
