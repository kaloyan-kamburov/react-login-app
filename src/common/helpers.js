import axios from 'axios';

export function setAxiosHeaders(token) {
	axios.defaults.headers['Authorization'] = 'JWT ' + token;
}