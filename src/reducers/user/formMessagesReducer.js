import initialState from '../initialState';
import * as constants from '../../common/constants';
import * as helpers from '../../common/helpers';

const formMessagesReducer = (state = initialState.user.formMessages, action) => {
	switch (action.type) {
		case constants.USER_REGISTER_ERROR:
			return {
				...state,
				msgRegisterError: action.payload.msg
			}
		case constants.USER_LOGIN_ERROR:
		// debugger
			return {
				...state,
				msgLoginError: action.payload.msg
			}
		case constants.USER_LOGGED:
			return {
				...state,
				msgLoginError: ''
			}
		case constants.USER_UPDATED:
			return {
				...state,
				msgUserUpdateSuccess: action.payload.msg,
				msgUserUpdateError: ''
			}
		case constants.USER_UPDATE_ERROR:
			return {
				...state,
				msgUserUpdateSuccess: '',
				msgUserUpdateError: action.payload.msg
			}
		
		case constants.USER_CHANGE_PASWORD_SUCCESS:
			return {
				...state,
				msgUserChangePasswordSuccess: action.payload.msg,
				msgUserChangePasswordError: ''
			}
		case constants.USER_CHANGE_PASWORD_ERROR:
			return {
				...state,
				msgUserChangePasswordSuccess: '',
				msgUserChangePasswordError: action.payload.msg
			}
		default:
			return state;
	}
}

export default formMessagesReducer;