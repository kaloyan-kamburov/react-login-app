import axios from 'axios';
import * as constants from '../constants';

import isTokenExpired from './jwtHelper'; 

export function authDefaultFunc() {
    return axios.post(constants.API_URL + '/users/validateToken')
}

export function isAuthorized() {
    return !!(localStorage.getItem('token') && !isTokenExpired(localStorage.getItem('token')));
}