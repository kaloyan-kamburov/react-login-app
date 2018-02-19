import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classNames from 'classnames';

import { email, notEmpty, comparePasswords, length, password } from '../../common/validators';
import * as constants from '../../common/constants';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            formSubmitted: false,
            fieldsEmpty: true,
            errorType: props.errorType,
            errorMsg: props.errorMsg,
            username: {
                ...props.username,
                validators: [
                    notEmpty,
                    length(3, 32)
                ],
                errorMessages: []
            },
            firstname: {
                ...props.firstname,
                validators: [
                    notEmpty,
                    length(3, 32)
                ],
                errorMessages: []
            },
            lastname: {
                ...props.lastname,
                validators: [
                    notEmpty,
                    length(3, 32)
                ],
                errorMessages: []
            },
            address: {
                ...props.address,
                validators: [
                    notEmpty,
                    length(3, 32)
                ],
                errorMessages: []
            },
            phone: {
                ...props.phone,
                validators: [
                    notEmpty,
                ],
                errorMessages: []
            },
            email: {
                ...props.email,
                validators: [
                    email,
                    notEmpty
                ],
                errorMessages: []
            },
            password: {
                ...props.password,
                validators: [
                    notEmpty,
                    
                ],
                errorMessages: []
            },
            password2: {
                ...props.password2,
                validators: [
                    notEmpty,
                    comparePasswords
                ],
                errorMessages: []
            },
        }
    }

    onChange = (event) => {
        let newState = Object.assign({}, this.state);
        newState[event.target.name].value = event.target.value;

        if (this.state.formSubmitted) {
            Object.keys(this.state).forEach((key, index) => {
                this.validateField(event.target.name);
            });

            if (event.target.name === 'password') {
                this.validateField('password2')
            }
        }

        newState.fieldsEmpty = !this.fieldsNotEmpty([
            this.state.username.value,
            this.state.firstname.value,
            this.state.lastname.value,
            this.state.address.value,
            this.state.phone.value,
            this.state.email.value,
            this.state.password.value,
            this.state.password2.value
        ]);
        
        this.setState(newState);
    }

    triggerValidations = () => {
        Object.keys(this.state).forEach((key, index) => {
            if (key !== 'errorType' && key !== 'errorMsg') {
                this.validateField(key);
            }
        });
    }

    componentWillReceiveProps(props) {
        let newState = Object.assign({}, this.state);
        let errorType = props.errorType;

        if (errorType !== 'userAndEmail') {
            newState[errorType].class = constants.ERROR_CLASS;
        } else {
            newState['username'].class = constants.ERROR_CLASS;
            newState['email'].class = constants.ERROR_CLASS;
        }

        this.setState(newState);

    }

    formValid = () => {
        let fields = [];
        Object.keys(this.props).forEach((key, index) => {
            if (typeof this.props[key] !== 'function' && key !== 'errorType' && key !== 'errorMsg') {
                fields.push(Object.assign({}, this.state[key]));
            }
        });

        return fields.every(field => {
            return field.errorMessages.length == 0;
        });
        console.log(this.state)
    }

    fieldsNotEmpty = fields => {
        return fields.every(field => {
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
                username: this.state.username.value,
                firstname: this.state.firstname.value,
                lastname: this.state.lastname.value,
                address: this.state.address.value,
                phone: this.state.phone.value,
                email: this.state.email.value,
                password: this.state.password.value
            });
        }
    }
    
    validateField = name => {
        let newState = Object.assign({}, this.state);
        if (this.state[name].validators && this.state[name].validators.length > 0) {
            newState[name].errorMessages = [];
            this.state[name].validators.forEach(validator => {
                let validatorStatus = (validator.name === 'comparePasswords') ? validator(this.state.password.value, this.state[name].value) : validator(this.state[name].value); 
                
                if (validatorStatus === true) {
                    newState[name].class = '';
                } else {
                    newState[name].class = constants.ERROR_CLASS;
                    newState[name].errorMessages.push(validatorStatus)
                }
                
            });

        }

        this.setState(newState);
    }

    renderServerError = (error, field) => {
        if (error === field) {
            return <span className='error-msg'> already exists</span>
        }

        // if (error) {
        //     switch (field) {
        //         case 'username':
        //             if (error !== 'email') { 
        //                 return <span className='error-msg'>Username already exists</span>
        //                 break;
        //             }                   
        //         case 'email':
        //             if (error !== 'username') { 
        //                 return <span className='error-msg'>Email already exists</span>
        //                 break;
        //             }
        //         default:
        //             break;
        //     }
        // }
        
        
    }

    render() {
        return (
            <div className='col-xs-8 offset-2'>
                <h1>Registration</h1>
                {this.props.errorMsg}
                <Form onSubmit={this.onSubmit} noValidate>
                    <FormGroup>
                        <Label for='username'>Username</Label>
                        <Input
                            name='username'
                            onChange={this.onChange} 
                            className={this.state.username.class}
                            value={this.state.username.value}
                            type='text'
                            id='username' 
                            placeholder='Username'
                        />
                        {this.state.username.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for='firstname'>First name</Label>
                        <Input
                            name='firstname'
                            onChange={this.onChange} 
                            className={this.state.firstname.class}
                            value={this.state.firstname.value}
                            type='text'
                            id='firstname' 
                            placeholder='First name'
                        />
                        {this.state.firstname.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastname'>Last name</Label>
                        <Input
                            name='lastname'
                            onChange={this.onChange} 
                            className={this.state.lastname.class}
                            value={this.state.lastname.value}
                            type='text'
                            id='lastname' 
                            placeholder='Last name'
                        />
                        {this.state.lastname.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for='address'>Address</Label>
                        <Input
                            name='address'
                            onChange={this.onChange} 
                            className={this.state.address.class}
                            value={this.state.address.value}
                            type='text'
                            id='address' 
                            placeholder='Address'
                        />
                        {this.state.address.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for='phone'>Phone number</Label>
                        <Input
                            name='phone'
                            onChange={this.onChange} 
                            className={this.state.phone.class}
                            value={this.state.phone.value}
                            type='number'
                            id='phone' 
                            placeholder='Phone number'
                        />
                        {this.state.phone.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input 
                            name='email'
                            onChange={this.onChange} 
                            className={this.state.email.class}
                            value={this.state.email.value}
                            type='email'
                            id='email' 
                            placeholder='Email'
                        />
                        {this.state.email.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label> 
                        <Input 
                            name='password'
                            onChange={this.onChange} 
                            className={this.state.password.class}
                            value={this.state.password.value}
                            type='password'
                            id='password' 
                            placeholder='Password' 
                        />
                        {this.state.password.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for='name'>Confirm Password</Label>
                        <Input 
                            name='password2'
                            onChange={this.onChange} 
                            onFocus={this.onChange}
                            className={this.state.password2.class}
                            value={this.state.password2.value}
                            type='password'
                            id='password2' 
                            placeholder='Confirm password' 
                        />
                        {this.state.password2.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Button className='btn' type='submit' disabled={this.state.fieldsEmpty}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
            
        )
    }
    


}

export default RegisterForm;
