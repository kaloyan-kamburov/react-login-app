import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';
import { Redirect } from 'react-router-dom';

import isTokenExpired from './jwtHelper';

import { isAdmin } from './authFunctions';


const AuthGuard = (WrappedComponent, authEnabled = true, adminOnly = false) => {
    class Guarded extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authorized: localStorage.getItem('token') && !isTokenExpired(localStorage.getItem('token')),
                adminLogged: isAdmin()
            }
        }

        render() {
            if ((this.state.authorized && !authEnabled) || 
                (!this.state.authorized && authEnabled) ||
                (this.state.authorized && !this.state.adminLogged && authEnabled && adminOnly) ) {
                return <Redirect to='' />
            }
            return <WrappedComponent {...this.props}/>

        }
    }

    return connect(mapStateToProps)(Guarded)
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default AuthGuard;