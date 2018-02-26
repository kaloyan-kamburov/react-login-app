import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { notEmpty, length } from '../../common/validators';
import * as constants from '../../common/constants';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            fieldsEmpty: true,
            errorMsg: '',
            user: props.user,
            userOrEmail: {
                value: props.userOrEmail,
                class: '',
                validators: [
                    notEmpty
                ],
                errorMessages: []
            },
            password: {
                value: props.password,
                class: '',
                validators: [
                    notEmpty
                ],
                errorMessages: []
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let newState = Object.assign({}, this.state, {
            user: nextProps.user
        });
        this.setState(newState);
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.onSubmit({ 
            userOrEmail: this.state.userOrEmail, 
            password: this.state.password
        });
    }

    fieldsNotEmpty = fields => {
        return fields.every(field => {
            return field.length > 0;
        });
    }

    
    renderServerError = (error) => {
        if (this.props.errorType) {
            return <Alert color='danger'>{error}</Alert>
        }
    }

    onChange = event => {
        let newState = Object.assign({}, this.state);
        newState[event.target.name].value = event.target.value;

        newState.fieldsEmpty = !this.fieldsNotEmpty([
            this.state.userOrEmail.value,
            this.state.password.value
        ]);
        
        this.setState(newState);

    }
    
    render() { 
        if (this.state.user.personal_info.username.value) {
            return <Redirect to='' />
        }       
        return(
            <div>
                <h1>Login</h1>
                {this.renderServerError(this.props.errorMsg)}
                <Form onSubmit={this.onSubmit} noValidate>
                    <FormGroup>
                        <Label for='username'>Username or email</Label>
                        <Input
                            name='userOrEmail'
                            onChange={this.onChange} 
                            // className={this.state.username.class}
                            value={this.state.userOrEmail.value}
                            type='text'
                            id='username' 
                            placeholder='Username'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input
                            name='password'
                            onChange={this.onChange} 
                            // className={this.state.username.class}
                            value={this.state.password.value}
                            type='password'
                            id='password' 
                            placeholder='password'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button className='btn' type='submit' disabled={this.state.fieldsEmpty}>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default LoginForm
