import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import CategoryAdd from '../../../components/pages/Admin/Categories/add';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 

const mapStateToProps = state => {
    return {  
        ...state
    }
}

const mapDispatchToProps = dispatch => ({ 
    onCategoryAdd: payload => (
        dispatch({
            type: constants.CATEGORY_ADD_REQUEST,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(CategoryAdd), true, true);