import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import Products from '../../../components/pages/Admin/Products';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

class ProductsContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            authorized: isAuthorized()
        });
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
            <Products {...this.props} />
        );
    }
} 
const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    deleteProduct: payload => (
        dispatch({
            type: constants.PRODUCT_DELETE_REQUEST,
            payload
        })
    )
});

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(ProductsContainer), true, true);