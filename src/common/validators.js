export function email(email) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return true;
    } else {
        return 'Incorrect email format'
    }
}

export function notEmpty(input) {
    if (input.length > 0) {
        return true;
    } else {
        return 'This field must not be empty'
    }
}

/*export function comparePasswords(password1, password2) {
    if (password1.localeCompare(password2) === 0) {
        return true;
    } else {
        return 'Passwords mismatch'
    }
}*/

export function length(min, max) {
    let f = (value) => {
        if (value.length < min) {
            return 'This field must be at least ' + min + ' symbols long'
        }

        if (value.length > max) {
            return 'This field must be at maximum ' + max + ' symbols long'
        }

        return true;
    }

    return f;
}

export function password(password) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)) {
        return true;
    } else {
        return 'Password must be at least 8 symbols long and containing 1 number, 1 upper and 1 lowercase'
    }
}

export function comparePasswords(password1, password2) {
    let f = value => {
        
        if (document.getElementsByName(password1)[0].value.localeCompare(document.getElementsByName(password2)[0].value) === 0) {
            return true;
        } else {
            return 'Passwords mismatch'
        }
    }
        
    
    return f;
    // if (password1.localeCompare(password2) === 0) {
    //     return true;
    // } else {
    //     return 'Passwords mismatch'
    // }
}