import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import Categories from '../../../components/pages/Admin/Categories';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    changeSearchField: payload => (
        dispatch({
            type: constants.ADMIN_CHANGE_SEARCH_FIELD,
            payload 
        })        
    )
});

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(Categories), true, true);