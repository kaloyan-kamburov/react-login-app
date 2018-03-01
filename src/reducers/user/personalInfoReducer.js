import initialState from '../initialState';
import * as constants from '../../common/constants';

const personalInfoReducer = (state = initialState.user.personalInfo, action) => {
    switch (action.type) {
        case constants.USER_REGISTER: 
            return {
                ...state,
                ...action.payload
            }
            break;
        case action.USER_INFO_CHANGE:
        console.log('change')
            return {
                ...state,
                ...action.payload
            }
            break;
        default:
            return state;
    }
}

export default personalInfoReducer;


/*case constants.USER_LOGGED:
            localStorage.setItem('loginAppToken', action.payload.token);
            return Object.assign({}, state, {
                loggedIn: true,
                personal_info: {
                    ...state.personal_info,
                    username: {
                        ...state.personal_info.username,
                        value: action.payload.user.username
                    },
                    firstname: {
                        ...state.personal_info.firstname,
                        value: action.payload.user.firstname
                    },
                    lastname: {
                        ...state.personal_info.lastname,
                        value: action.payload.user.lastname
                    },
                    email: {
                        ...state.personal_info.email,
                        value: action.payload.user.email
                    },
                    address: {
                        ...state.personal_info.address,
                        value: action.payload.user.address
                    },
                    phone: {
                        ...state.personal_info.phone,
                        value: action.payload.user.phone
                    }
                }
            });
            
            // return Object.assign({}, state, {
            //     ...state,
            //     userOrEmail: action.payload.email,
            //     password: action.payload.password
            // })
        */