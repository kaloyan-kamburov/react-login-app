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
    // onSubmit: payload => (
    //     dispatch({
    //         type: constants.USER_LOGIN_REQUEST,
    //         payload
    //     })
    // )
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

