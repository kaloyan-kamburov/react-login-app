import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import RegisterForm from '../../components/RegisterForm';
import AuthGuard from '../../common/auth/authGuard';
import { Redirect } from 'react-router-dom';

import Form from '../Form';
import Input from '../Form/Input';

import { 
    email, 
    notEmpty, 
    comparePasswords, 
    length, 
    password 
} from '../../common/validators';

class RegisterContainer extends Component {
    constructor(props) {
        super(props);

        // console.log('PROPS REGISTER PAGE:')
        // console.log(this.props)
        // console.log('-------------------')
    }

    onSubmit = payload => {
        this.props.onSubmit(payload);
    }

    render() {
        return(
            <Form onSubmit={this.onSubmit}>
                <Input 
                    type='text' 
                    name='firstname'
                    label='First name'
                    value={this.props.user.personalInfo.firstname} 
                    validators={[notEmpty, length(3, 24)]}
                />
                <Input 
                    type='text' 
                    name='lastname' 
                    label='Last name'
                    value={this.props.user.personalInfo.lastname} 
                    validators={[notEmpty, length(3, 24)]}
                />
            </Form>
        );
    }
}

// class RegisterContainer extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             loggedIn: props.loggedIn,
//             personal_info: {
//                 username: props.personal_info.username,
//                 firstname: props.personal_info.firstname,
//                 lastname: props.personal_info.lastname,
//                 address: props.personal_info.address,
//                 phone: props.personal_info.phone,
//                 email: props.personal_info.email,
//                 password: props.personal_info.password,
//                 password2: props.personal_info.password2,
//                 errorType: props.personal_info.errorType,
//                 errorMsg: props.personal_info.errorMsg
//             }
//         }
//     }

//     componentWillReceiveProps(props) {
//         this.setState({
//             personal_info: {
//                 ...this.state.personal_info,
//                 ...props.personal_info
//             }
//         })
//     }

//     onSubmit = payload => {
//         this.props.onSubmit(payload)
//     }

//     render() {
//         if (this.props.personal_info.username.value) {
//             return <Redirect to='' />;            
//         };
//         return (
//             // <FormComponent onSubmit={() => handler()}>
//             //     <Input validators={[v1, v2]} 
//             // </FormComponent>
//             <RegisterForm 
//                 username={this.state.personal_info.username} 
//                 firstname={this.state.personal_info.firstname} 
//                 lastname={this.state.personal_info.lastname} 
//                 address={this.state.personal_info.address} 
//                 phone={this.state.personal_info.phone} 
//                 email={this.state.personal_info.email}
//                 password={this.state.personal_info.password}
//                 password2={this.state.personal_info.password2}
//                 errorType={this.state.personal_info.errorType}
//                 errorMsg={this.state.personal_info.errorMsg}
//                 onSubmit={this.onSubmit}
//             />
//         )
//     }
    
// }



const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: payload => (
        dispatch({
            type: constants.USER_REGISTER,
            payload
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);