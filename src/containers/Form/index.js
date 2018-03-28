import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { debug } from 'util';
 
class Form extends Component {
    constructor(props) {
        super(props);

        let errors = {},
            formData = props.formData || {},
            images = {};

        if (Object.keys(formData).length) {
            props.fields.forEach(field => {
                if (field.type === 'file') {
                    images[field.name + 'File'] = formData[field.name + 'File'];
                }
                errors[field.name] = [];
            });            
        } else {
            props.fields.forEach(field => {
                errors[field.name] = [];
                formData[field.name] = '';
            });
        }

        this.state = {
            formData,
            formValid: false,
            formSubmitted: false,
            errors,
            images
        }
    } 
    
    componentWillReceiveProps(nextProps) {
        let images = {};
        this.props.fields.forEach(field => {
            if (field.type === 'file') {
                if (typeof nextProps.formData !== 'undefined') {
                    images[field.name + 'File'] = nextProps.formData[field.name + 'File'] || ''
                }
            }
        })
        this.setState({
            formData: nextProps.formData ? nextProps.formData : this.state.formData,
            images
        });
    }

    onChange = event => {
        event.persist();

        if (event.target.type === 'file') {
            let reader = new FileReader(),
            file = event.target.files[0] || ''

            reader.onloadend = () => {
                this.setState({
                    formData: {
                        ...this.state.formData,
                        [event.target.name]: file
                    },
                    images: {
                        [event.target.name + 'File']: reader.result
                    }
                }, this.validateField(event.target));
            }

            if (file !== '') {
                reader.readAsDataURL(file);
            } else {
                this.setState({
                    formData: {
                        ...this.state.formData,
                        [event.target.name]: ''
                    },
                    images: {
                        ...this.state.images,
                        [event.target.name + 'File']: reader.result
                    }
                }, this.validateField(event.target));
            }
                
        } else {

            this.setState((state) => {
                return {
                    formData: {
                        ...this.state.formData,
                        [event.target.name]: event.target.value
                    }
                }
            }, this.validateField(event.target));

        }
    }

    validateField = field => {
        if (this.props.fields[field.getAttribute('index')].validators.length > 0) {
            let fieldErrors = [];

            this.props.fields[field.getAttribute('index')].validators.forEach(validator => {
                let status = validator(field);

                if (status !== true) {
                    fieldErrors.push(status);
                }
            });

            //fix dis sh..
            setTimeout(() => {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        [field.name]: fieldErrors
                    }
                });
            }, 1);
        }
    }

    validateForm = callback => {
        Object.keys(this.refs).forEach(key => {
            this.validateField(this.refs[key])
        });

        //fix dis sh..
        setTimeout(() => {
            this.setState({
                formValid: Object.keys(this.state.errors).every(key => this.state.errors[key].length == 0)
            }, () => {
                if (this.state.formValid) {
                    callback();
                }
            });            
        }, 1);
    }

    onSubmit = event => {
        event.preventDefault();
        let formValues;

        this.setState({
            formSubmitted: true
        })
 
        if (this.props.encType) {            
            formValues = new FormData();
            Object.keys(this.state.formData).forEach(key => {
                if (!key.endsWith('File')) { 
                    formValues.append(key, this.state.formData[key]);
                }
            });
        } else {
            formValues = {
                ...this.state.formData,
                ...this.props.hiddenData
            }
        }

        // debugger
        this.validateForm(() => { return this.props.onSubmit(formValues) });
    }

    renderServerErrorMsg = msg => {
        if (msg && msg.length) {
            return <Alert color={ 'danger' }>{msg}</Alert>
        }
    }

    renderServerSuccessMsg = msg => {
        if (msg && msg.length) {
            return <Alert color={ 'success' }>{msg}</Alert>
        }
    }

    renderFieldError = name => {
        if (this.state.formSubmitted) {
            return(
                this.state.errors[name].map((msg, index) => <span className='error-msg' key={index}>{msg}</span> )
            );
        }
    }

    renderField = (field, index)  => {
        if (field.type !== 'file') {            
            return(
                <input 
                    type={field.type} 
                    name={field.name}
                    className={ (this.props.errorTypes && this.props.errorTypes.some(error => { return field.name === error })) ? 'has-error' : '' }
                    id={field.name}
                    onChange={this.onChange}
                    ref={field.name}
                    index={index}
                    value={this.state.formData[field.name] || ''}
                />
            ) 
        } else {            
            return (
                <div>
                    <img style={{display: this.state.images[field.name + 'File'] ? 'block' : 'none'}} className='avatar' src={this.state.images[field.name + 'File']} />
                        
                    <br/>
                    <input 
                        type={field.type} 
                        name={field.name}
                        className={ this.props.errorTypes.some(error => { field.name === error }) ? 'has-error' : '' }    
                        id={field.name}
                        onChange={this.onChange}
                        ref={field.name}
                        index={index}
                    />
                </div>
            );
        }
    }

    render() {
        return(
            <form encType={this.props.encType} onSubmit={this.onSubmit}>
                {this.renderServerErrorMsg(this.props.msgError)}
                {this.renderServerSuccessMsg(this.props.msgSuccess)}
                {
                    this.props.fields.map((field, index) => {
                        return(
                            <div key={index}>
                                <label htmlFor={field.name}>{field.label}</label>
                                {this.renderField(field, index)}
                                
                                { this.renderFieldError(field.name) }
                            </div>
                        );
                    })
                }
                <br/>
                <button type='submit'>Submit</button>
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
