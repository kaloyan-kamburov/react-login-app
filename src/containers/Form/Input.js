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

        this.setState(state => ({
            value: event.target.value
        })) 

        if (this.props.formSubmitted ) {
            this.validateField();        
        }

        this.props.onChange({
            [this.props.name]: event.target.value
        });

        
    }

    componentWillUpdate(nextProps) {
        console.log(nextProps)
    }

    validateField = () => {
        let validators = this.props.validators,
            errorMessages = [],
            valid = false;
        
        if (validators.length) {
            validators.forEach(validator => {
                let status = validator(this.state.value);

                if (status === true) {
                    valid = true;
                } else {
                    valid = false;
                    errorMessages.push(status);
                }
            })
        }

        this.setState((state) => ({
            errorMessages,
            valid
        })) 

        // this.setState({
        // })
    }

    render() {
        return(
            <div>
                <label>{this.props.label}</label>
                <input 
                    name={this.props.name} 
                    type={this.props.type} 
                    value={this.state.value} 
                    onChange={this.onChange} 
                    ref={this.props.name} 
                    className={(this.props.formSubmitted && !this.state.valid) ? 'has-error' : ''} 
                />
                { this.state.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
            </div>
        )
    }
}