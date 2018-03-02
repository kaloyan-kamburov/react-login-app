import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants'

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pristine: true,
            formSubmitted: false,
            formData: {}
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.setState(state => ({
            formSubmitted: true
        }));
        
        this.validateForm(() => {
            if (Object.keys(this.refs).every(key => this.refs[key].state.valid)) {
                this.props.onSubmit(this.state.formData);
            }
        });
    }

    onChange = payload => {
        this.setState(state => ({
            pristine: false,
            formData: {
                ...this.state.formData,
                ...payload
            }
        }));
        this.props.onChange(payload)
        
    }
    

    validateForm = (callback) => {
        Object.keys(this.refs).forEach(key => {
            console.log(this.refs[key])
            this.refs[key].validateField();
        });
        callback();
    }

    render() {
        return(
            <form onSubmit={this.onSubmit} noValidate>
                {
                    React.Children.map(this.props.children, (child, i) => {
                        return React.cloneElement(child, { onChange: this.onChange, formSubmitted: this.state.formSubmitted, ref: 'child' + i, valid: false });
                    })
                }
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