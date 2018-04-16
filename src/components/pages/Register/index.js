import React, { Component } from 'react';

import Form from '../../../containers/Form';
// import Input from '../../containers/Form/Input'; 

import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password,
    checkFileSize
} from '../../../common/validators';

export default class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Register</h1>
                <Form
                    msgSuccess={this.props.user.formMessages.msgRegisterSuccess}
                    msgError={this.props.user.formMessages.msgRegisterError}
                    errorTypes={this.props.user.formMessages.formErrorTypes}
                    onSubmit={this.props.onSubmit}
                    encType='multipart/form-data'
                    fields={[
                        {
                            type: 'file',
                            label: 'Avatar',
                            name: 'avatar',
                            validators: [checkFileSize(200), notEmpty]
                        },
                        {
                            type: 'text',
                            label: 'Username',
                            name: 'username',
                            validators: [notEmpty, length(3, 24)]
                        },
                        {
                            type: 'text',
                            label: 'First name',
                            name: 'firstname',
                            validators: [notEmpty, length(3, 24)]
                        },
                        {
                            type: 'text',
                            label: 'Last name',
                            name: 'lastname',
                            validators: [notEmpty, length(3, 24)]
                        },
                        {
                            type: 'text',
                            label: 'Address',
                            name: 'address',
                            validators: [notEmpty]
                        },
                        {
                            type: 'email',
                            label: 'Email',
                            name: 'email',
                            validators: [notEmpty, email]
                        },
                        {
                            type: 'number',
                            label: 'Phone number',
                            name: 'phone',
                            validators: [notEmpty, length(3, 24)]
                        },
                        {
                            type: 'password',
                            label: 'Password',
                            name: 'password',
                            validators: [notEmpty]
                        },
                        {
                            type: 'password',
                            label: 'Password confirm',
                            name: 'passwordConfirm',
                            send: false,
                            validators: [notEmpty, comparePasswords('password', 'passwordConfirm')]
                        },
                    ]}
                />
            </div>
        )
    }
}
