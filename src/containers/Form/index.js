import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';
import { Redirect } from 'react-router-dom';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pristine: true,
            formSubmitted: false,
            formData: {},
            serverErrorMsg: '',
            serverErrorType: ''
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState({
            formSubmitted: true
        }, () => {
            this.validateForm(() => {
                //TODO: fix this dirty hack mofo...
                setTimeout(() => {
                    if ( Object.keys(this.refs).every(key => this.refs[key].state.valid) ) {
                        this.props.onSubmit(this.state.formData);
                    }
                }, 1);                
            });
        });
    }

    renderServerError = error => {
        return <span className='server-error'>{error}</span>
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            serverErrorMsg: nextProps.user.personalInfo.serverErrorMsg,            
            serverErrorType: nextProps.user.personalInfo.serverErrorType
        });
    }

    onChange = payload => {
        let formData;

        if (!payload.hasOwnProperty('passwordConfirm')) {
            formData = {
                ...this.state.formData,
                ...payload
            }
         } else {
            formData = {
                ...this.state.formData
            }
        }

        this.setState(state => ({
            pristine: false,
            formData
        }));
        
        if (!payload.hasOwnProperty('password') || !payload.hasOwnProperty('passwordConfirm')) {
            this.props.onChange(payload);
        } 
    }

    validateForm = (callback) => {
        let fieldsLength = Object.keys(this.refs).length
        Object.keys(this.refs).forEach((key, index) => {
            this.refs[key].validateField();
            if (index + 1 >= fieldsLength) {
                callback();
            }
        });
    }

    render() {
        if (this.props.user.personalInfo.token) {
            return <Redirect to=''/>;
        }
        return(
            <form onSubmit={this.onSubmit} noValidate>
                {this.renderServerError(this.state.serverErrorMsg)}
                {
                    React.Children.map(this.props.children, (child, i) => {
                        return React.cloneElement(child, { 
                            onChange: this.onChange, 
                            formSubmitted: this.state.formSubmitted,
                            serverErrorType: this.state.serverErrorType,
                            ref: 'child' + i, 
                            valid: false 
                        });
                    })
                }
                <br/>
                <button type='submit' disabled={ this.state.pristine ? 'disabled' : '' }>Submit</button>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    onChange: payload => (
        dispatch({
            type: constants.USER_INFO_CHANGE,
            payload
        })
    )    
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);