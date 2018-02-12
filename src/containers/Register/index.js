import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import RegisterForm from '../../components/RegisterForm';

import { isEmail } from '../../common/validators'; 

class RegisterContainer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: {
                value: props.user.name.value,
                class: ""
            },
            email: {
                value: props.user.email.value,
                class: "",
                validator: isEmail
            },
            password: {
                value: props.user.password.value,
                class: ""
            },
            password2: {
                value: props.user.password2.value,
                class: ""
            }
        }

    }

    componentDidMount() {
        
        // console.log(this.state)
    }

    onChange = (event) => {
        let newState = Object.assign({}, this.state);
        newState[event.target.name].value = event.target.value;
        newState[event.target.name].class = this.state[event.target.name].validator(event.target.value) ? "" : "has-error"
        this.setState(newState);
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state)
    }

    render() {
        return (
            <RegisterForm 
                name={this.state.name} 
                email={this.state.email}
                password={this.state.password}
                password2={this.state.password2}
                onChange={this.onChange} 
                onSubmit={this.onSubmit}
            />
        )
    }
    
}

const mapStateToProps = state => {
    return {
        user: {
            ...state.user,
            name: state.user.name,
            email: state.user.email,
            password: state.user.password,
            password2: state.user.password2
        }
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: ({name, email}) => (
        dispatch({
            type: constants.USER_REGISTER,
            payload:{
                name,
                email
            }
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);