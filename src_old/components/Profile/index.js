import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { email, notEmpty, comparePasswords, length, password } from '../../common/validators';
import * as constants from '../../common/constants';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        
        console.log(props)

        this.state = {
            userChanged: false,
            formSubmitted: false,
            fieldsEmpty: true,
            errorType: props.errorType,
            errorMsg: props.errorMsg,
            token: props.user.token,
            user: {
                ...props.user,
                personal_info: {
                    username: {
                        ...props.user.personal_info.username,
                        validators: [
                            // notEmpty,
                            length(3, 32)
                        ],
                        errorMessages: []
                    },
                    firstname: {
                        ...props.user.personal_info.firstname,
                        validators: [
                            notEmpty,
                            length(3, 32)
                        ],
                        errorMessages: []
                    },
                    lastname: {
                        ...props.user.personal_info.lastname,
                        validators: [
                            notEmpty,
                            length(3, 32)
                        ],
                        errorMessages: []
                    },
                    address: {
                        ...props.user.personal_info.address,
                        validators: [
                            notEmpty,
                            length(3, 32)
                        ],
                        errorMessages: []
                    },
                    phone: {
                        ...props.user.personal_info.phone,
                        validators: [
                            notEmpty,
                        ],
                        errorMessages: []
                    },
                    email: {
                        ...props.user.personal_info.email,
                        validators: [
                            email,
                            notEmpty
                        ],
                        errorMessages: []
                    },
                    password: {
                        ...props.user.personal_info.password,
                        validators: [
                            notEmpty,
                            // password
                        ],
                        errorMessages: []
                    },
                    password2: {
                        ...props.user.personal_info.password2,
                        validators: [
                            notEmpty,
                            comparePasswords
                        ],
                        errorMessages: []
                    }
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        debugger

        // this.setState({
        //     user: {
        //         personal_info: 
        //         ...state.user,
        //     }
        // })

        this.setState({
            personal_info: {
                username: {
                    ...this.state.user.personal_info.username,
                    ...nextProps.username,
                },
                firstname: {
                    ...this.state.user.personal_info.firstname,
                    ...nextProps.firstname,
                },
                lastname: {
                    ...this.state.user.personal_info.lastname,
                    ...nextProps.username,
                },
                address: {
                    ...this.state.user.personal_info.address,
                    ...nextProps.address,
                },
                phone: {
                    ...this.state.user.personal_info.phone,
                    ...nextProps.phone,
                },
                email: {
                    ...this.state.user.personal_info.email,
                    ...nextProps.email,
                },
                password: {
                    ...this.state.user.personal_info.password,
                    ...nextProps.password,
                },
                password2: {
                    ...this.state.user.personal_info.password2,
                    ...nextProps.password2,
                }
            }
        })
    }
    
    onChange = (event) => {
        let newState = Object.assign({}, this.state);
        newState.user.personal_info[event.target.name].value = event.target.value;
        if (this.state.formSubmitted) {
            Object.keys(this.state.user.personal_info).forEach((key, index) => {
                this.validateField(event.target.name);
            });

            if (event.target.name === 'password') {
                this.validateField('password2')
            }
        }

        newState.fieldsEmpty = !this.fieldsNotEmpty([
            this.state.user.personal_info.username.value,
            this.state.user.personal_info.firstname.value,
            this.state.user.personal_info.lastname.value,
            this.state.user.personal_info.address.value,
            this.state.user.personal_info.phone.value,
            this.state.user.personal_info.email.value,
            this.state.user.personal_info.password.value,
            this.state.user.personal_info.password2.value
        ]);
        
        this.setState(newState);
    }

    triggerValidations = () => {
        Object.keys(this.state.user.personal_info).forEach((key, index) => {
            if (key !== 'errorType' && key !== 'errorMsg') {
                this.validateField(key);
            }
        });
    }

    fieldsNotEmpty = fields => {
        return fields.every(field => {
            console.log(fields)
            return field.length > 0;
        });
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            formSubmitted: true
        }, this.triggerValidations());

        if (this.formValid()) {
            this.props.onSubmit({
                id: this.props.user.id,
                username: this.state.user.personal_info.username.value,
                firstname: this.state.user.personal_info.firstname.value,
                lastname: this.state.user.personal_info.lastname.value,
                address: this.state.user.personal_info.address.value,
                phone: this.state.user.personal_info.phone.value,
                email: this.state.user.personal_info.email.value,
                password: this.state.user.personal_info.password.value
            });
        }
    }

    formValid = () => {
        let fields = [];
        Object.keys(this.state.user.personal_info).forEach((key, index) => {
            if (typeof this.props[key] !== 'function' && key !== 'errorType' && key !== 'errorMsg') {
                fields.push(Object.assign({}, this.state.user.personal_info[key]));
            }
        });

        return fields.every(field => {
            return field.errorMessages.length === 0;
        });
    }
    
    validateField = name => {
        let newState = Object.assign({}, this.state);
        if (this.state.user.personal_info[name].validators && this.state.user.personal_info[name].validators.length > 0) {
            newState.user.personal_info[name].errorMessages = [];
            this.state.user.personal_info[name].validators.forEach(validator => {
                let validatorStatus = (validator.name === 'comparePasswords') ? validator(this.state.user.personal_info.password.value, this.state.user.personal_info[name].value) : validator(this.state.user.personal_info[name].value); 
                
                if (validatorStatus === true) {
                    newState.user.personal_info[name].class = '';
                } else {
                    newState.user.personal_info[name].class = constants.ERROR_CLASS;
                    newState.user.personal_info[name].errorMessages.push(validatorStatus);
                }
                
            });

        }

        this.setState(newState);
    }


    render() {
        if (!this.state.user.personal_info.username.value) {
            return <Redirect to='' />
        } 
        return(
            <Form onSubmit={this.onSubmit} noValidate>
                <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                        name='username'
                        onChange={this.onChange} 
                        className={this.state.user.personal_info.username.class}
                        value={this.state.user.personal_info.username.value}
                        type='text'
                        id='username' 
                        placeholder='Username'
                    />
                    {this.state.user.personal_info.username.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Label for='firstname'>First name</Label>
                    <Input
                        name='firstname'
                        onChange={this.onChange} 
                        className={this.state.user.personal_info.firstname.class}
                        value={this.state.user.personal_info.firstname.value}
                        type='text'
                        id='firstname' 
                        placeholder='First name'
                    />
                    {this.state.user.personal_info.firstname.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Label for='lastname'>Last name</Label>
                    <Input
                        name='lastname'
                        onChange={this.onChange} 
                        className={this.state.user.personal_info.firstname.class}
                        value={this.state.user.personal_info.firstname.value}
                        type='text'
                        id='lastname' 
                        placeholder='Last name'
                    />
                    {this.state.user.personal_info.lastname.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Label for='address'>Address</Label>
                    <Input
                        name='address'
                        onChange={this.onChange} 
                        className={this.state.user.personal_info.address.class}
                        value={this.state.user.personal_info.address.value}
                        type='text'
                        id='address' 
                        placeholder='Address'
                    />
                    {this.state.user.personal_info.address.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Label for='phone'>Phone number</Label>
                    <Input
                        name='phone'
                        onChange={this.onChange} 
                        className={this.state.user.personal_info.phone.class}
                        value={this.state.user.personal_info.phone.value}
                        type='number'
                        id='phone' 
                        placeholder='Phone number'
                    />
                    {this.state.user.personal_info.phone.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Label for='email'>Email</Label>
                    <Input 
                        name='email'
                        onChange={this.onChange} 
                        className={this.state.user.personal_info.email.class}
                        value={this.state.user.personal_info.email.value}
                        type='email'
                        id='email' 
                        placeholder='Email'
                    />
                    {this.state.user.personal_info.email.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label> 
                    <Input 
                        name='password'
                        onChange={this.onChange} 
                        className={this.state.user.personal_info.password.class}
                        value={this.state.user.personal_info.password.value}
                        type='password'
                        id='password' 
                        placeholder='Password' 
                    />
                    {this.state.user.personal_info.password.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Label for='name'>Confirm Password</Label>
                    <Input 
                        name='password2'
                        onChange={this.onChange} 
                        onFocus={this.onChange}
                        className={this.state.user.personal_info.password2.class}
                        value={this.state.user.personal_info.password2.value}
                        type='password'
                        id='password2' 
                        placeholder='Confirm password' 
                    />
                    {this.state.user.personal_info.password2.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                </FormGroup>
                <FormGroup>
                    <Button className='btn' type='submit' disabled={this.state.fieldsEmpty}>Submit</Button>
                </FormGroup>
            </Form>
        )
    }
}