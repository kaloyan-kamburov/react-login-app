import React, {  Component } from 'react'
import LoginForm from '../../components/LoginForm'

import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        name: state.login.name
    }
}

export default connect(mapStateToProps)(LoginForm)