import axios from 'axios';
import * as constants from '../constants';

export const authDefaultFunc = () => {
    return axios.post(constants.API_URL + '/users/validateToken')
}