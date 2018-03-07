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

export default class Profile extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            user: {
                personalInfo: {}
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: {
                personalInfo: {
                    ...nextProps.user.personalInfo
                }
            }
        })

    }

    render() {
        return(
            <Form 
                onSubmit={this.props.onSubmit}
                passwordSend={true}
                formData={this.state.user.personalInfo}
            >
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