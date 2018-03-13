import React, { Component } from 'react';
import * as constants from '../../common/constants';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            valid: props.valid,
            errorMessages: []
        }
    }

    onChange = event => {
        event.persist();

        if (this.type !== 'password') {
            this.props.onChange({
                [this.props.name]: event.target.value
            });
        }

        this.setState({
            value: event.target.value
        }, () => {
            if ( this.props.formSubmitted ) {
                this.validateField();        
            }

        })
    }

    validateField = () => {
        let validators = this.props.validators,
            errorMessages = [],
            valid = false;
        
        if (validators.length) {
            validators.forEach(validator => {
                let validationType = this.props.type === 'password' ? this.state.value : this.props.value
                let status = validator(validationType);

                if (status !== true) {
                    errorMessages.push(status);
                }
            })
        }

        valid = errorMessages.length == 0 ? true : false;
        
        this.setState({
            errorMessages,
            valid
        });
    }

    render() {
        return(
            <div>
                <label>{this.props.label}</label>
                <input 
                    name={this.props.name} 
                    type={this.props.type} 
                    value={this.props.type === 'password' ? this.state.value : this.props.value} 
                    onChange={this.onChange} 
                    ref={this.props.name} 
                    className={
                        (this.props.formSubmitted && !this.state.valid) || 
                        (this.props.formSubmitted && typeof this.props.serverErrorType !== 'undefined' && this.props.serverErrorType.some(error => error == this.props.name)) ? 'has-error' : '' ||
                        this.props.class ? 'has-error' : ''
                    } 
                />
                { this.state.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
            </div>
        )
    }
}