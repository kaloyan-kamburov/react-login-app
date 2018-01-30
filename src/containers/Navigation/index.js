import React from 'react';
import { connect } from 'react-redux'

import Navigation from '../../components/Navigation';

const mapStateToProps = state => {
    return {
        name: state.user.name
    }
}

export default connect(mapStateToProps)(Navigation);