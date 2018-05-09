import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as constants from '../../common/constants';

import Home from '../../components/pages/Home';

const mapStateToProps = state => {
    return {
        ...state
    }
}

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => (
        dispatch({
            type: constants.ADMIN_GET_ALL_USERS_REQUEST
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

