import React, { Component } from 'react';

import Form from '../../containers/Form';
import Input from '../../containers/Form/Input';

import { Row, Col } from 'reactstrap';

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

        console.log(props)

        this.state = {
            id: props.id || '',
            avatar: props.avatar || ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.user.personalInfo.id,
            avatar: nextProps.user.personalInfo.avatar
        })
    }

    render() {
        // console.log(this.props.user.personalInfo.id)
        return(
            <Row>
                <Col xs='6'>                
                    <Form
                        formData={this.props.user.personalInfo}
                        msgSuccess={this.props.user.formMessages.msgUserUpdateSuccess}
                        msgError={this.props.user.formMessages.msgUserUpdateError}
                        onSubmit={this.props.onUpdateUserInfo}
                        hiddenData={{
                            avatar: this.state.avatar
                        }}
                        encType='multipart/form-data'
                        fields={[
                            {
                                type: 'file',
                                label: 'Avatar',
                                name: 'avatar',
                                validators: []
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
                            }
                        ]}
                    /> 
                </Col>
                <Col xs='6'>
                    <Form
                        msgSuccess={this.props.user.formMessages.msgUserChangePasswordSuccess}
                        msgError={this.props.user.formMessages.msgUserChangePasswordError}
                        onSubmit={this.props.onChangeUserPassword}
                        hiddenData={{
                            id: this.state.id
                        }}
                        fields={[
                            {
                                type: 'password',
                                label: 'Old password',
                                name: 'oldPassword',
                                validators: [notEmpty]
                            },
                            {
                                type: 'password',
                                label: 'New password',
                                name: 'newPassword',
                                validators: [notEmpty]
                            },
                            {
                                type: 'password',
                                label: 'Confirm new password',
                                name: 'confirmNewPassword',
                                validators: [notEmpty, comparePasswords('newPassword', 'confirmNewPassword')]
                            },
                        ]}
                    />
                    {/* <Form
                        onSubmit={this.props.onChangeUserPassword}
                        msg={this.props.user.personalInfo.msgChangePassword}
                        success={this.props.user.personalInfo.changePasswordSuccess}
                        formData={{
                            oldPassword: this.props.user.personalInfo.oldPassword,
                            newPassword: this.props.user.personalInfo.newPassword,
                            confirmNewPassword: this.props.user.personalInfo.confirmNewPassword,
                            _id: this.state.user.personalInfo._id
                        }}
                    >
                        <Input 
                            type='password'
                            name='oldPassword'
                            label='Old password'
                            value={this.props.user.personalInfo.oldPassword} 
                            onChange={this.onChange}
                            validators={[notEmpty]}
                            class={(!!this.props.user.personalInfo.changePasswordSuccess) ? '' : 'has-error'}
                        />
                        <Input 
                            type='password'
                            name='newPassword'
                            label='New password'
                            value={this.props.user.personalInfo.newPassword} 
                            onChange={this.onChange}
                            validators={[notEmpty]}
                        />
                        <Input 
                            type='password'
                            name='confirmNewPassword'
                            label='Confirm new password'
                            value={this.props.user.personalInfo.confirmNewPassword} 
                            onChange={this.onChange}
                            validators={[comparePasswords('newPassword', 'confirmNewPassword')]}
                        />
                    </Form> */}
                </Col>
            </Row>
        )
    }
}