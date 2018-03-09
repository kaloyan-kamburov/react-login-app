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
                msg={this.props.user.personalInfo.msg}
                success={this.props.user.personalInfo.success}
                formData={{
                    firstname: this.state.user.personalInfo.firstname,
                    lastname: this.state.user.personalInfo.lastname,
                    address: this.state.user.personalInfo.address,
                    phone: this.state.user.personalInfo.phone,
                    email: this.state.user.personalInfo.email,
                    _id: this.state.user.personalInfo._id,
                }}
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
            </Form>
        )
    }
}