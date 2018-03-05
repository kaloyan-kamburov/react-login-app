import axios from 'axios';

export function setAxiosHeaders(token) {
	axios.defaults.headers.common['Authorization'] = token;
	axios.defaults.headers.common['Content-type'] = 'application/json';
}