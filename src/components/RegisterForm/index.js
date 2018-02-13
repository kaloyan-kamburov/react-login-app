import React, { Component } from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import classNames from 'classnames';

import { email, notEmpty, comparePasswords, length, password } from '../../common/validators';
import * as constants from '../../common/constants';

// export default class Register extends React.Component {
//     render() {
//         return(
//             <div>REGISTsER</div>
//         )
//     }
// }

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props,
            formSubmitted: false,
            fieldsEmpty: true,
            name: {
                ...props.name,
                validators: [
                    notEmpty,
                    length(3, 5)
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
                    notEmpty
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
            this.state.name,
            this.state.email,
            this.state.password,
            this.state.password2
        ]);
        
        this.setState(newState);
    }

    triggerValidations = () => {
        Object.keys(this.state).forEach((key, index) => {
            this.validateField(key);
        });
    }

    fieldsNotEmpty = (fields) => {
        return fields.every( (field) => {
            return field.value.length > 0;
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            formSubmitted: true
        }, this.triggerValidations());
        

        this.props.onSubmit(this.state);
    }
    
    validateField = (name) => {
        let newState = Object.assign({}, this.state);
        if (this.state[name].validators && this.state[name].validators.length > 0) {
            newState[name].errorMessages = [];
            this.state[name].validators.forEach(validator => {
                let validatorStatus = (validator.name === 'comparePasswords') ? validator(this.state.password.value, this.state[name].value) : validator(this.state[name].value); 
                
                
                if (validatorStatus === true) {
                    newState[name].class = "";
                } else {
                    newState[name].class = constants.ERROR_CLASS;
                    newState[name].errorMessages.push(validatorStatus)
                }
                
            });

        }

        this.setState(newState);
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <Form onSubmit={this.onSubmit} noValidate>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            name="name"
                            onChange={this.onChange} 
                            className={this.state.name.class}
                            value={this.state.name.value}
                            type="text"
                            id="name" 
                            placeholder="Name"
                            // onInvalid={(event) => {
                            //     event.target.setCustomValidity('boobies')
                            // }}
                            // onInput={(event) => {
                            //     event.target.setCustomValidity('')
                            // }}
                            />
                            {this.state.name.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input 
                            name="email"
                            onChange={this.onChange} 
                            className={this.state.email.class}
                            value={this.state.email.value}
                            type="email"
                            id="email" 
                            placeholder="Email"
                        />
                        {this.state.email.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label> 
                        <Input 
                            name="password"
                            onChange={this.onChange} 
                            className={this.state.password.class}
                            value={this.state.password.value}
                            type="password"
                            id="password" 
                            placeholder="Password" 
                        />
                        {this.state.password.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Confirm Password</Label>
                        <Input 
                            name="password2"
                            onChange={this.onChange} 
                            onFocus={this.onChange}
                            className={this.state.password2.class}
                            value={this.state.password2.value}
                            type="password"
                            id="password2" 
                            placeholder="Confirm password" 
                        />
                        {this.state.password2.errorMessages.map((msg, i) => <span className='error-msg' key={i}>{msg}</span> ) }
                    </FormGroup>
                    <FormGroup>
                        <Button className="btn" type="submit" disabled={this.state.fieldsEmpty}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
            
        )
    }
    


}

export default RegisterForm;
