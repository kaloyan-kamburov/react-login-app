import decode from 'jwt-decode';

export function getUserIdFromToken(state) {
    if (localStorage.getItem('token')) {
        return decode(localStorage.getItem('token'))._doc._id;
    }
    return false;
}

export function getTokenExpirationDate(token) {
    const decoded = decode(token);

    if (!decoded.exp) {
        return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
}

export default function isTokenExpired(token) {
    if (!token) {
        return false;
    }
    const date = getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date === null) {
        return false;
    }

    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}