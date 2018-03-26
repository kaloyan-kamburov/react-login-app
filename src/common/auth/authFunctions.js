import axios from 'axios';
import * as constants from '../constants';

import isTokenExpired from './jwtHelper'; 
import decode from 'jwt-decode';

const adminCheck = role => {
    return role === 'admin';
}

export function authDefaultFunc() {
    return axios.post(constants.API_URL + '/users/validateToken')
}

export function isAuthorized() {
    // console.log(isTokenExpired(localStorage.getItem('token')) === false);
    return !!(
        localStorage.getItem('token') && !isTokenExpired(localStorage.getItem('token')) 
    );
}

export function isAdmin() {
    if (isTokenExpired(localStorage.getItem('token'))) {
        return false;
    }


    const decoded = decode(localStorage.getItem('token'))._doc; 
    if (decoded.roles.some(adminCheck)) {
       return true;
    }

    return false;
}