import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import RegisterForm from '../../components/RegisterForm';

import { isEmail } from '../../common/validators'; 

class RegisterContainer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: props.personal_info.username,
            firstname: props.personal_info.firstname,
            lastname: props.personal_info.lastname,
            address: props.personal_info.address,
            phone: props.personal_info.phone,
            email: props.personal_info.email,
            password: props.personal_info.password,
            password2: props.personal_info.password2,
            errorType: props.personal_info.errorType
        }

    }

    // componentWillReceiveProps(props) {
    //     debugger;
    //     console.log(props)
    // }    

    onSubmit = payload => {
        // console.log(payload)
        this.props.onSubmit(payload)
    }

    render() {
        return (
            <RegisterForm 
                username={this.state.username} 
                firstname={this.state.firstname} 
                lastname={this.state.lastname} 
                address={this.state.address} 
                phone={this.state.phone} 
                email={this.state.email}
                password={this.state.password}
                password2={this.state.password2}
                errorType={this.state.errorType}
                onSubmit={this.onSubmit}
            />
        )
    }
    
}

const mapStateToProps = state => {
    return {
        personal_info: {
            ...state.user.personal_info,
            errorType: state.user.personal_info.errorType
        },
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: (payload) => (
        dispatch({
            type: constants.USER_REGISTER,
            payload
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);