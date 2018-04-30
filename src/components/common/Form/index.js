import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { debug } from 'util';
import PropTypes from 'prop-types';
 
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
                if (field.type === 'group-checkboxes') {
                    formData[field.name] = [];
                }
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
    
    /**
     * 
     * @param {*} nextProps - 
     */
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
            formData: nextProps.formData ? nextProps.formData : this.state.formData
        });
    }

    /**
     * Change the input content and perform the corresponding actions - validatione, set etc
     * @param {Object} event - native form event
     */
    onChange = event => {
        event.persist();

        switch(event.target.type) {
            case 'file':
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
            
            case 'checkbox':
                let checkboxValues = []
            
                document.getElementsByName(event.target.name).forEach(el => {
                    if (el.checked) {
                        checkboxValues.push(el.value)
                    }
                });
                
                //fix dis sh..
                setTimeout(() => {
                    this.setState({
                        formData: {
                            ...this.state.formData,
                            [event.target.name]: checkboxValues
                        }
                    })
                    
                }, 1);
            default: 
                
                this.setState({
                    formData: {
                        ...this.state.formData,
                        [event.target.name]: event.target.value
                    }
                }, this.validateField(event.target));
        }
    }

    onChangeCheckboxInGroup = (event, checkbox) => {
        event.persist();

        let checkboxValues = [
            ...this.state.formData[event.target.name]
        ]


        if (event.target.checked) {
            checkboxValues.push(event.target.value);
            // event.target.checked = false;
        } else {
            checkboxValues.splice(checkboxValues.indexOf(event.target.value), 1);
            // event.target.checked = true;
        }
        

        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: checkboxValues
            }
        }, () => {
            this.validateField(this.state.formData[event.target.name], true, event.target.dataset.indexgroup, event.target.name)
        });        
    }

    /**
     * @param {Object} fieldOrValue - form element or value (when you validate value from the state)
     * @param {Boolean} group - determine if we should perform group validation
     * @param {Number} fieldIndex - index of the field
     * @param {String} errorName - determine the key of state.errors where we should put the errors 
     */
    validateField = (fieldOrValue, group = false, fieldIndex, errorName) => {
        let errors = {
            ...this.state.errors
        }
        let fieldErrors = [];
        if (!group) {
            if (fieldOrValue.getAttribute('index') && this.props.fields[fieldOrValue.getAttribute('index')].validators.length > 0) {
                this.props.fields[fieldOrValue.getAttribute('index')].validators.forEach(validator => {
                    let status = validator(fieldOrValue);
    
                    if (status !== true) {
                        fieldErrors.push(status);
                    }
                });
    
                //fix dis sh..
                setTimeout(() => {
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            [fieldOrValue.name]: fieldErrors
                        }
                    });
                }, 1);
            }
        } else {
            this.props.fields[fieldIndex].validators.forEach(validator => {
                
                let status = validator(fieldOrValue);

                if (status !== true) {
                    fieldErrors.push(status);
                }
            });

            //fix dis sh..
            setTimeout(() => {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        [errorName]: fieldErrors
                    }
                });
            }, 1);
        }        
    }

    validateForm = callback => {
        Object.keys(this.refs).forEach(key => {
            if (!this.refs[key].dataset.group) {
                this.validateField(this.refs[key])
            } else {
                this.validateField(this.state.formData[key], true, this.refs[key].dataset.index, key)
            }
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
 
        if (this.props.encType === 'multipart/form-data') {            
            formValues = new FormData();
            Object.keys(this.state.formData).forEach(key => {
                if (!(this.state.formData[key] instanceof File)) { 
                    formValues.append(key, this.state.formData[key]);
                }
            });
            Object.keys(this.state.formData).forEach(key => {
                if (this.state.formData[key] instanceof File) { 
                    formValues.append(key, this.state.formData[key]);
                }
            });
            
        } else {
            formValues = {
                ...this.state.formData,
                ...this.props.hiddenData
            }
        }

        this.validateForm(() => {
            return this.props.onSubmit(formValues)
        });
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

    checkboxChecked = (mainObj, criteria, value) => {
        return this.props.formData && mainObj[criteria].indexOf(value) > -1 ? 'checked' : undefined; 
            
    }

    renderField = (field, index)  => {
        switch (field.type) {
            case 'textarea':
                return(
                    <textarea
                        id={field.name}
                        name={field.name}
                        onChange={this.onChange}                        
                        ref={field.name}
                        index={index}
                        value={this.state.formData[field.name] || ''}
                    >
                    </textarea>
                )
            case 'file':
                return(
                    <div>
                        <img 
                            style={{display: (this.state.images[field.name + 'File'] || (this.props.formData && this.props.formData[field.name + 'File'])) ? 'block' : 'none'}} 
                            className='avatar' 
                            src={this.state.images[field.name + 'File'] ? this.state.images[field.name + 'File'] : ((this.props.formData && this.props.formData[field.name + 'File']) || '')} />
                            
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
                )
            case 'group-checkboxes':
                return(
                    <div className='checkbox-group'>
                        {field.values.map( value => {
                            return(
                                <div className='field-wrapper' 
                                    key={value[field.valueOption]}
                                    ref={field.name}
                                    data-group={true}
                                    data-index={index}
                                >
                                    <input 
                                        id={value[field.valueOption]} 
                                        name={field.name} 
                                        type='checkbox' 
                                        value={value[field.valueOption]} 
                                        key={value[field.valueOption]} 
                                        onChange={event => this.onChangeCheckboxInGroup(event, field)}
                                        data-indexgroup={index}                                        
                                        defaultChecked={this.checkboxChecked(this.props.formData, field.checkboxCheckCriteria, value[field.valueOption])}
                                    /> 
                                    <label htmlFor={value[field.valueOption]}>{value[field.textOption]}</label>
                                    
                                </div>
                            )
                        } )}
                    </div>
                    
                )
            default:
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
                                {this.renderFieldError(field.name)}
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

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    msgSuccess: PropTypes.string,
    msgError: PropTypes.string,
    errorTypes: PropTypes.array,
    encType: PropTypes.string,
    formData: PropTypes.object,
    hiddenData: PropTypes.object,
    // actionAfterSuccess: function(props, propName, componentName) {
    //     if (typeof props[propName] !== 'undefined' && typeof props['triggerActionAfterSuccess'] === 'undefined') {
    //         throw Error('Property "triggerActionAfterSuccess" must be also declared');
    //     }
    //     if (typeof props[propName] !== 'undefined' && typeof props[propName] !== 'function') {
    //         throw Error('Property "actionAfterSuccess" must be of type "function"');
    //     }
    // },
    // triggerActionAfterSuccess:  function(props, propName, componentName) {
    //     if (typeof props[propName] !== 'undefined' && typeof props['actionAfterSuccess'] === 'undefined') {
    //         throw Error('Property "actionAfterSuccess" must be also declared');
    //     }
    //     if (typeof props[propName] !== 'undefined' && typeof props[propName] !== 'boolean') {
    //         throw Error('Property "triggerActionAfterSuccess" must be of type "boolean"');
    //     }
    // }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Form);
