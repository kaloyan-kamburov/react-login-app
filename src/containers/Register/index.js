import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import RegisterForm from '../../components/RegisterForm';

import { isEmail } from '../../common/validators'; 

class RegisterContainer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: props.user.name,
            email: props.user.email,
            password: props.user.password,
            password2: props.user.password2
        }

    }

    componentDidMount() {
        
    }

    onSubmit = (payload) => {
        // event.preventDefault();
        console.log(payload)
        this.props.onSubmit(payload)
    }

    render() {
        return (
            <RegisterForm 
                name={this.state.name} 
                email={this.state.email}
                password={this.state.password}
                password2={this.state.password2}
                onSubmit={this.onSubmit}
            />
        )
    }
    
}

const mapStateToProps = state => {
    return {
        user: {
            ...state.user
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