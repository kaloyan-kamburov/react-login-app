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

        this.setState({
            formSubmitted: true
        });

        this.validateForm();
        this.props.onSubmit(this.state.formData);
    }

    onChange = payload => {
        console.log('PAYLOAD: ');
        console.log(payload)
        this.setState({
            pristine: false,
            formData: {
                ...this.state.formData,
                payload
            }
        });
    }
    

    validateForm = () => {
        Object.keys(this.refs).forEach(key => {
            this.refs[key].validateField();
        });
    }

    render() {
        return(
            <form onSubmit={this.onSubmit} noValidate>
                {
                    React.Children.map(this.props.children, (child, i) => {
                        return React.cloneElement(child, { onChange: this.onChange, formSubmitted: this.state.formSubmitted, ref: 'child' + i });
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
    ),
    onSubmit: payload => (
        dispatch({
            type: constants.USER_REGISTER,
            payload
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);