import React, { Component } from 'react';

import Form from '../../../components/common/Form';

import { isAdmin } from '../../../common/auth/authFunctions';

import { Row, Col } from 'reactstrap';

import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password 
} from '../../../common/validators';

export default class Profile extends Component {
    constructor(props) {
        super(props);

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

    renderForm = () => {
        if (isAdmin()) {
            return <Form
                formData={this.props.user.personalInfo}
                msgSuccess={this.props.formMessages.msgAdminUpdateInfoSuccess}
                msgError={this.props.formMessages.msgAdminUpdateInfoError}
                errorTypes={this.props.formMessages.formErrorTypes}
                onSubmit={this.props.updateAdminInfo}
                fields={[
                    {
                        type: 'email',
                        label: 'Email', 
                        name: 'email',
                        validators: [notEmpty, email]
                    }
                ]}
            />;
        }
        // console.log(this.state)
        return <Form
            formData={this.props.user.personalInfo}
            msgSuccess={this.props.formMessages.msgUserUpdateSuccess}
            msgError={this.props.formMessages.msgUserUpdateError}
            errorTypes={this.props.formMessages.formErrorTypes}
            onSubmit={this.props.updateUserInfo}
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
    }

    render() {
        return(
            <div>
                <h2>Profile</h2>
                <Row>
                
                    <Col xs='6'>                
                        {this.renderForm()}
                    </Col>
                    <Col xs='6'>
                        <Form
                            msgSuccess={this.props.formMessages.msgUserChangePasswordSuccess}
                            msgError={this.props.formMessages.msgUserChangePasswordError}
                            onSubmit={this.props.changeUserPassword}
                            errorTypes={this.props.formMessages.formErrorTypes}
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
                    </Col>
                </Row>
            </div>
        )
    }
}