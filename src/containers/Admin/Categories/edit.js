import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import CategoryEdit from '../../../components/pages/Admin/Categories/edit';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

class CategoryEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: isAuthorized()
        }
    }

    componentWillMount() {
        this.props.getCategory();
    }

    componentWillReceiveProps() {
        this.setState({
            authorized: isAuthorized()
        });
    }

    render() {
        if (!this.state.authorized) {
            return <Redirect to=''/>
        }

        return(
            <CategoryEdit {...this.props} />
        );
    }

}

const mapStateToProps = state => {
    return {  
        ...state
    }
}

const mapDispatchToProps = dispatch => ({ 
    getCategory: payload => (
        dispatch({
            type: constants.CATEGORY_GET_REQUEST,
            payload
        })
    ),
    onUpdateUserInfo: payload => (
        dispatch({
            type: constants.ADMIN_UPDATE_REQUEST,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(CategoryEditContainer), true, true);