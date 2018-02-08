import React from 'react';
import { connect } from 'react-redux'

import Navigation from '../../components/Navigation';

const mapStateToProps = state => {
    return {
        name: state.user.name,
        email: state.user.email
    }
}

export default connect(mapStateToProps)(Navigation);