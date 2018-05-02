import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import ProductEdit from '../../../components/pages/Admin/Products/edit';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

class ProductEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: isAuthorized()
        }
    }

    componentWillMount() {
        this.props.getProduct(this.props.match.params.id);
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
            <ProductEdit {...this.props} />
        );
    }

}

const mapStateToProps = state => {
    return {  
        ...state
    }
}

const mapDispatchToProps = dispatch => ({ 
    getProduct: payload => (
        dispatch({
            type: constants.PRODUCT_GET_REQUEST,
            payload
        })
    ),

    updateProduct: payload => (
        dispatch({
            type: constants.PRODUCT_UPDATE_REQUEST,
            payload
        })
    )
    
})

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(ProductEditContainer), true, true);