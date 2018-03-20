import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';
import { Alert } from 'reactstrap';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pristine: true,
            formSubmitted: false,
            formData: props.formData,            
            serverErrorMsg: '',
            serverErrorType: '',
            serverMsg: '',
            success: props.success,
            msg: props.msg
        }
    }

    onSubmit = event => {
        event.preventDefault();

        let formValues;

        this.setState({
            formSubmitted: true
        });

        if (this.props.encType) {
            formValues = new FormData();
        
            Object.keys(this.props.formData).forEach(key => {
                formValues.append(key, this.props.formData[key])
            });
        } else {
            formValues = this.props.formData
        }

        this.validateForm(() => {
            //TODO: fix this dirty hack mofo...
            setTimeout(() => {
                if ( Object.keys(this.refs).every(key => this.refs[key].state.valid) ) {
                    this.props.onSubmit(formValues);
                }
            }, 1);                
        });
    }


    renderServerMsg = (msg, success) => {
        if (msg && msg.length) {
            return <Alert color={ success ? 'success' : 'danger' }>{msg}</Alert>
        }
    }

    componentWillMount() {
        this.props.onChange({
            msg: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({     
            serverErrorType: nextProps.serverErrorType,
            success: nextProps.success,
            msg: nextProps.msg,
            formData: nextProps.formData
        });
    }

    onChange = payload => {
        this.setState({
            pristine: false
        });
        
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
        return(
            <form onSubmit={this.onSubmit} noValidate encType={this.props.encType}>
                {this.renderServerMsg(this.state.msg, this.state.success)}
                {
                    React.Children.map(this.props.children, (child, i) => {
                        return React.cloneElement(child, { 
                            onChange: this.onChange, 
                            formSubmitted: this.state.formSubmitted,
                            serverErrorType: this.state.serverErrorType,
                            ref: 'child' + i, 
                            valid: false,
                            class: (this.state.formSubmitted && !!child.props.class) ? child.props.class : ''
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