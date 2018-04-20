import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../../common/constants';

import Categories from '../../../components/pages/Admin/Categories';
import { Redirect } from 'react-router-dom';

import AuthGuard from '../../../common/auth/authGuard'; 
import { isAuthorized } from '../../../common/auth/authFunctions';

class CategoriesContainer extends Component {
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
            <Categories {...this.props} />
        );
    }
} 
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

export default AuthGuard(connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer), true, true);