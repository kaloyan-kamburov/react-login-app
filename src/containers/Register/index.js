import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import Register from '../../components/Register';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../common/auth/authGuard'



class RegisterContainer extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = payload => {
        this.props.onSubmit(payload);
    }

    render() {        
        // if (!this.props.user.personalInfo.token) {
        //     return(<Redirect to=''/>)
        // }
        return(
            <Register {...this.props} />
        );
    }
}

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