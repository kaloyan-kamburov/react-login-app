import axios from 'axios';

export function setAxiosHeaders(token) {
	axios.defaults.headers['Authorization'] = 'JWT ' + token;
}

var timeout;

export function debounce(func, wait, immediate) {
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}