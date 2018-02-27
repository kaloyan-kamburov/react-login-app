import initialState from './initialState';
import * as actionTypes from '../common/constants';

const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case actionTypes.USER_SET_PERSONAL_INFO:
        
            if (action.payload) {
                return Object.assign({}, state, {
                    id: action.payload._doc._id,
                    personal_info: {
                        username: {
                            ...state.personal_info.username,
                            value: action.payload._doc.username
                        },
                        firstname: {
                            ...state.personal_info.firstname,
                            value: action.payload._doc.firstname
                        },
                        lastname: {
                            ...state.personal_info.lastname,
                            value: action.payload._doc.lastname
                        },
                        email: {
                            ...state.personal_info.email,
                            value: action.payload._doc.email
                        },
                        address: {
                            ...state.personal_info.address,
                            value: action.payload._doc.address
                        },
                        phone: {
                            ...state.personal_info.phone,
                            value: action.payload._doc.phone
                        },
                        password: {
                            ...state.personal_info.password
                        },
                        password2: {
                            ...state.personal_info.password2
                        }
                    }
                });
            };
            return state;
        case actionTypes.USER_REGISTER:
            return state;
        case actionTypes.USER_REGISTERED:
        case actionTypes.USER_LOGGED:
            localStorage.setItem('loginAppToken', action.payload.token);
            return Object.assign({}, state, {
                token: action.payload.token,
                id: action.payload.user._id,
                personal_info: {
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
                    },
                    errorType: '',
                    errorMsg: ''
                }
            }) 
        case actionTypes.USER_UPDATE:    
            return Object.assign({}, state, {
                token: action.payload.token,
                loggedIn: true,
                personal_info: {
                    username: {
                        ...state.personal_info.username,
                        value: action.payload.username
                    },
                    firstname: {
                        ...state.personal_info.firstname,
                        value: action.payload.firstname
                    },
                    lastname: {
                        ...state.personal_info.lastname,
                        value: action.payload.lastname
                    },
                    email: {
                        ...state.personal_info.email,
                        value: action.payload.email
                    },
                    address: {
                        ...state.personal_info.address,
                        value: action.payload.address
                    },
                    phone: {
                        ...state.personal_info.phone,
                        value: action.payload.phone
                    },
                    errorType: '',
                    errorMsg: ''
                }
            })                
        case actionTypes.USER_REGISTER_ERROR:
            return Object.assign({}, state, {
                loggedIn: false,
                personal_info: {
                    ...state.personal_info,
                    errorMsg: action.payload.errorMsg,
                    errorType: action.payload.errorType
                },
            }); 
        case actionTypes.USER_LOGIN:
            return Object.assign({}, state, {
                errorMsg: ''
            })
        case actionTypes.USER_LOGOUT:
            localStorage.removeItem('loginAppToken');        
            return Object.assign({}, state, initialState.user);
        case actionTypes.USER_LOGIN_ERROR:
            return Object.assign({}, state, {
                errorMsg: action.payload.msg
            })
            
        default:
            return state;
    }
}

export default userReducer;


/*case actionTypes.USER_LOGGED:
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