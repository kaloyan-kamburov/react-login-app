import initialState from '../initialState';
import * as constants from '../../common/constants';

const resetFormMessages = () => {
	return {
		msgRegisterError: '',
		msgLoginError: '',
		msgUserUpdateSuccess: '',
		msgUserUpdateError: '',
		msgUserChangePasswordSuccess: '',
		msgUserChangePasswordError: '',
		formErrorTypes: []
	}
}

const formMessagesReducer = (state = initialState.user.formMessages, action) => {
	switch (action.type) {
		case constants.USER_REGISTER_ERROR:
			return {
				...state,
				msgRegisterError: action.payload.msg,
				formErrorTypes: action.payload.errorType
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
				...resetFormMessages()
			}
		case constants.USER_UPDATED:
		case constants.USER_ADMIN_UPDATED:
			return {
				...state,
				...resetFormMessages(),
				msgUserUpdateSuccess: action.payload.msg,
			}
		case constants.USER_UPDATE_ERROR:
		case constants.USER_ADMIN_UPDATE_ERROR:
			return {
				...state,
				msgUserUpdateSuccess: '',
				...resetFormMessages(),
				msgUserUpdateError: action.payload.msg,
				formErrorTypes: action.payload.errorType
			}
		
		case constants.USER_CHANGE_PASWORD_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgUserChangePasswordSuccess: action.payload.msg
			}
		case constants.USER_CHANGE_PASWORD_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgUserChangePasswordError: action.payload.msg,
				formErrorTypes: action.payload.errorType
			}
		case constants.ROUTE_CHANGED:
			return{
				...state,
				...resetFormMessages()
			}
		default:
			return state;
	}
}

export default formMessagesReducer;