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
            <Row>
                <Col xs='6'>
                    <Form 
                        onSubmit={this.props.onUpdateUserInfo}
                        msg={this.props.user.personalInfo.msgUserInfoChanged}
                        success={this.props.user.personalInfo.success}
                        formData={{
                            username: this.state.user.personalInfo.username,
                            firstname: this.state.user.personalInfo.firstname,
                            lastname: this.state.user.personalInfo.lastname,
                            address: this.state.user.personalInfo.address,
                            phone: this.state.user.personalInfo.phone,
                            email: this.state.user.personalInfo.email,
                            _id: this.state.user.personalInfo._id,
                            avatar: this.props.user.personalInfo.avatar
                        }}
                        encType='multipart/form-data'
                    >
                        <Input 
                            type='file' 
                            name='avatar'
                            label='Avatar'
                            file={this.props.user.personalInfo.file}
                            validators={[]}
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
                    </Form>
                </Col>
                <Col xs='6'>
                    <Form
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
                    </Form>
                </Col>
            </Row>
        )
    }
}