import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import RegisterForm from '../../components/RegisterForm';
import AuthGuard from '../../common/auth/authGuard';
import { Redirect } from 'react-router-dom';

import Form from '../Form';
import Input from '../Form/Input';

import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password 
} from '../../common/validators';

class RegisterContainer extends Component {
    constructor(props) {
        super(props);

        // console.log('PROPS REGISTER PAGE:')
        // console.log(this.props)
        // console.log('-------------------')
    }

    onSubmit = payload => {
        this.props.onSubmit(payload);
    }

    render() {
        // console.log(this.props)
        return(
            <Form 
                onSubmit={this.onSubmit}
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
                    value={this.props.user.personalInfo.lastname} 
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);