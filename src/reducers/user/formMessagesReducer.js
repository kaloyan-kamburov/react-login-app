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
		msgAdminChangeUserPasswordSuccess: '',
		msgAdminChangeUserPasswordError: '',
		msgAdminChangeUserPassword: '',
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
			return {
				...state,
				msgLoginError: (action.payload.msg || '')
			}
		case constants.USER_LOGIN_SUCCESS:
			return {
				...state,
				...resetFormMessages()
			}
		case constants.USER_UPDATE_SUCCESS:
		case constants.ADMIN_UPDATE_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgUserUpdateSuccess: action.payload.msg,
			}
		case constants.USER_UPDATE_ERROR:
		case constants.ADMIN_UPDATE_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgUserUpdateError: action.payload.msg,
				formErrorTypes: action.payload.errorType
			}

			
		case constants.ADMIN_CHANGE_USER_PASSWORD_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgAdminChangeUserPasswordError: action.payload.msg
			}
		
		case constants.ADMIN_CHANGE_USER_PASSWORD_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgAdminChangeUserPasswordSuccess: action.payload.msg
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