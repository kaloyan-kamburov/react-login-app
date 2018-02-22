import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as constants from '../constants';
import { Redirect } from 'react-router-dom';

import isTokenExpired from './jwtHelper';


const AuthGuard = (WrappedComponent, authFunc) => {
    class Guarded extends Component {
        constructor(props) {
            super(props)
            this.state = {
                token: localStorage.getItem('loginAppToken') || this.props.user.token
            }
        }

        render() {
            if (this.state.token && !isTokenExpired(this.state.token)) {
                return <WrappedComponent />
            }
            return <Redirect to='' />
        }
    }

    return connect(mapStateToProps)(Guarded)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default AuthGuard;

// export default function(ComposedComponent, shouldCheck) {
    
//     class Authentication extends Component {

//         state = {
//             authenticated: false
//         }
//         componentDidMount() {
//             this.checkAuth()
//         }

//         checkAuth = () => {
//             const config = {
//                 headers: {
//                     'Authorization': localStorage.getItem('loginAppToken'),
//                     'Content-type': 'application/json'
//                 }
//             }


//             const validateToken = axios.post(constants.API_URL + '/users/validateToken', {
//                 token: localStorage.getItem('loginAppToken')
//             }, config)
//             .then(result => {
//                 this.setState({authenticated: true})
//                 return true;
//             })
//             .catch(error => {
//                 console.log('error');
//                 return false;
//             })

//             // try {
//             //     const validateToken = axios.post(constants.API_URL + '/users/validateToken', {
//             //         token: localStorage.getItem('loginAppToken')
//             //     }, config);
//             //     return true;
//             // } catch(error) {
//             //     console.log('error')
//             //     return false;
//             // }
//         }

//         render() {
//             if (shouldCheck && this.state.authenticated) {
//                 return <ComposedComponent />
//             }
//             return <Redirect to='' />
            

//         }
//     }

//     function mapStateToProps(state) {
//         return { 
//             ...state
//         };
//     }

//     function mapDispatchToProps(dispatch) {
//         return {

//         }
//     }

//     return connect(mapStateToProps)(Authentication);
// }