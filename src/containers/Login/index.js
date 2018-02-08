import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as constants from '../../common/constants';

import LoginForm from '../../components/LoginForm';

class LoginContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount() {

    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })

    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
    }


    render() {
        return <LoginForm 
            email={this.state.email} 
            password={this.state.password} 
            onChange={this.onChange}
            onSubmit={this.onSubmit}
        />
    }
}

const mapStateToProps = state => {
    return {
            email: state.name,
            password: state.password

    }
}

const mapDispatchToProps = dispatch => {


    return {
        onSubmit: ({ email, password}) => {
            dispatch({
                type: constants.USER_LOGIN,
                payload: {
                    email,
                    password
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);