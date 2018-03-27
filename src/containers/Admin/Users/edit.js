import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import UserEdit from '../../../components/Admin/Users/edit';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

class UserEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: isAuthorized()
        }

        console.log(props)
    }

    componentWillReceiveProps() {
        this.setState({
            authorized: isAuthorized()
        });
    }

    render() {
        return(
            <UserEdit {...this.props} />
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
            type: constants.USER_LOGIN,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(UserEditContainer), true, true);