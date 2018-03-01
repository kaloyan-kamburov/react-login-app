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

        this.setState({
            value: event.target.value
        }, () => {
            if (this.props.formSubmitted ) {
                this.validateField();        
            }
        });

        this.props.onChange({
            [this.props.name]: event.target.value
        });
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

        this.setState({
            errorMessages,
            valid
        })
    }

    render() {
        return(
            <div>
                <input name={this.props.name} type={this.props.type} value={this.state.value} onChange={this.onChange} ref={this.props.name} />
                { this.state.errorMessages.map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                
            </div>
        )
    }
}