export function email(email) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) {
        return true;
    } else {
        return 'Incorrect email format'
    }
}

export function notEmpty(input) {
    if (input.value.length > 0) {
        return true;
    } else {
        return 'This field must not be empty'
    }
}

export function length(min, max) {
    let f = input => {
        if (input.value.length < min) {
            return 'This field must be at least ' + min + ' symbols long'
        }

        if (max && input.value.length > max) {
            return 'This field must be at maximum ' + max + ' symbols long'
        }
        return true;
    }
    return f;
}

export function password(password) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password.value)) {
        return true;
    } else {
        return 'Password must be at least 8 symbols long and containing 1 number, 1 upper and 1 lowercase'
    }
}

export function comparePasswords(password1, password2) {
    let f = () => {        
        if (document.getElementsByName(password1)[0].value.localeCompare(document.getElementsByName(password2)[0].value) === 0) {
            return true;
        } else {
            return 'Passwords mismatch'
        }
    }
    return f;
}

export function checkFileSize(maxSizeKB) {
    let f = input => {
        let file = input.files[0];
        if (file) {
            if (file.size > maxSizeKB * 1024) {
                return `File is larger than ${maxSizeKB} kB`;
            }
            return true;
        }
        return true;
    }
    return f;
}