import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import ProductAdd from '../../../components/pages/Admin/Products/add';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 

const mapStateToProps = state => {
    return {  
        ...state
    }
}

const mapDispatchToProps = dispatch => ({ 
    productAdd: payload => (
        dispatch({
            type: constants.PRODUCT_ADD_REQUEST,
            payload
        })
    )
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(ProductAdd), true, true);