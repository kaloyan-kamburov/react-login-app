import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
 
class Form extends Component {
    constructor(props) {
        super(props);

        let errorsObj = {};

        props.fields.forEach(field => {
            errorsObj[field.name] = [];
        })

        // Object.keys( props.formData).map(key => errorsObj[key] = []);

        this.state = {
            formData: {
                ...props.formData
            },
            formValid: false,
            errors: errorsObj  
        }
    } 

    onChange = event => {
        event.persist();
        this.setState((state) => {
            return {
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value
                }
            }
        }, this.validateField(event.target));
    }

    validateField = field => {
        if (this.props.fields[parseInt(field.getAttribute('index'))].validators.length) {
            let fieldErrors = [];

            this.props.fields[parseInt(field.getAttribute('index'))].validators.forEach(validator => {
                let status = validator(field.value);

                if (status !== true) {
                    fieldErrors.push(status)
                }
            });

            this.setState((state) => {
                return {
                    errors: {
                        ...this.state.errors,
                        [field.name]: fieldErrors
                    }
                }
            }, this.validateForm());
        }
    }

    validateForm = () => {
        //fix dis sh..
        setTimeout(() => {
            this.setState({
                formValid: Object.keys(this.state.errors).every(key => this.state.errors[key].length == 0)
            })            
        }, 1);
    }

    onSubmit = event => {
        event.preventDefault();
        let formValues;

        if (this.props.encType) {            
            formValues = new FormData();        
            Object.keys(this.props.formData).forEach(key => {
                formValues.append(key, this.state.formData[key])
            });
        } else {
            formValues = this.state.formData;
        }
        this.props.onSubmit(formValues)
    }

    render() {
        return(
            <form encType={this.props.encType} onSubmit={this.onSubmit}>
                {
                    this.props.fields.map((field, i) => {
                        return(
                            <div key={i}>
                                <label htmlFor={field.name}>{field.label}</label>
                                <input 
                                    type={field.type} 
                                    name={field.name}
                                    id={field.name}
                                    onChange={this.onChange}
                                    index={i}
                                />
                                { this.state.errors[field.name].map((msg, index) => <span className='error-msg' key={index}>{msg}</span> ) }
                            </div>
                        );
                    })
                }
                <button type='submit' disabled={!this.state.formValid}>Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Form);
