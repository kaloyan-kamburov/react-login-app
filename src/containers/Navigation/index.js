import React from 'react';
import { connect } from 'react-redux'

import Navigation from '../../components/Navigation';

const mapStateToProps = state => {
    console.log(state)
    return {
        email: state.user.personal_info.email.value
    }
}

export default connect(mapStateToProps)(Navigation);