import decode from 'jwt-decode';

export function getUserIdFromToken(state) {
    if (localStorage.getItem('token')) {
        try {
            const decoded = decode(localStorage.getItem('token'))._doc._id;
            return decoded;
        } catch(error) {
            return false;
        }
    }
    return false;
}

export function getTokenExpirationDate(token) {
    try {
        const decoded = decode(token); 
        if (!decoded.exp) {
            return null;
        }
    
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    } catch(error) {        
        return new Date(0)
    }
}

export default function isTokenExpired(token) {
    if (!token) {
        return true;
    } else {
        const date = getTokenExpirationDate(token);
        const offsetSeconds = 0;
        if (date === null) {
            return false;
        }

        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
    }
}