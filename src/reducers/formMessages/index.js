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
		msgAdminUpdateInfoSuccess: '',
		msgAdminUpdateInfoError: '',
		msgAdminChangeUserPasswordSuccess: '',
		msgAdminChangeUserPasswordError: '',
		msgAdminChangeUserPassword: '',
		msgCategoryAddSuccess: '',
		msgCategoryAddError: '',
		msgCategoryUpdateSuccess: '',
		msgCategoryUpdateError: '',
		msgProductAddError: '',
		msgProductUpdateSuccess: '',
		msgProductUpdateError: '',
		formErrorTypes: []
	}
}

const formMessagesReducer = (state = initialState.formMessages, action) => {
	switch (action.type) {
		case constants.USER_REGISTER_ERROR:
			return {
				...state,
				msgRegisterError: action.payload.msg || '',
				formErrorTypes: action.payload.errorType
			}
		case constants.USER_LOGIN_ERROR:		
			return {
				...state,
				msgLoginError: action.payload.msg || ''
			}
		case constants.USER_LOGIN_SUCCESS:
			return {
				...state,
				...resetFormMessages()
			}
		case constants.USER_UPDATE_SUCCESS:
		case constants.ADMIN_UPDATE_USER_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgUserUpdateSuccess: action.payload.msg || '',
			}
		case constants.USER_UPDATE_ERROR:
		case constants.ADMIN_UPDATE_USER_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgUserUpdateError: action.payload.msg || '',
				formErrorTypes: action.payload.errorType
			}

			
		case constants.ADMIN_CHANGE_USER_PASSWORD_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgAdminChangeUserPasswordError: action.payload.msg || ''
			}
		
		case constants.ADMIN_CHANGE_USER_PASSWORD_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgAdminChangeUserPasswordSuccess: action.payload.msg || ''
			}
		
		case constants.USER_CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgUserChangePasswordSuccess: action.payload.msg || ''
			}
		case constants.USER_CHANGE_PASSWORD_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgUserChangePasswordError: action.payload.msg || '',
				formErrorTypes: action.payload.errorType
			}
		
		case constants.CATEGORY_ADD_ERROR:
			return {
				...state,
				...resetFormMessages(),
				formErrorTypes: action.payload.errorType,
				msgCategoryAddError: action.payload.msg || ''
			}
		
		case constants.CATEGORY_ADD_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgCategoryAddSuccess: action.payload.msg || '',
			}
		
		case constants.CATEGORY_ADD_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgCategoryAddError: action.payload.msg || '',
			}
		
		case constants.CATEGORY_UPDATE_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgCategoryUpdateSuccess: action.payload.msg || '',
			}
		
		case constants.CATEGORY_UPDATE_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgCategoryUpdateError: action.payload.msg || '',
			}
		
		case constants.ADMIN_UPDATE_INFO_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgAdminUpdateInfoSuccess: action.payload.msg || ''
			}
		
		case constants.ADMIN_UPDATE_INFO_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgAdminUpdateInfoError: action.payload.msg || ''
			}

		case constants.PRODUCT_ADD_ERROR:
			return {
				...state,
				...resetFormMessages(),
				msgProductAddError: action.payload.msg || '',
				formErrorTypes: action.payload.errorType
			}

		case constants.PRODUCT_UPDATE_SUCCESS:
			return {
				...state,
				...resetFormMessages(),
				msgProductUpdateSuccess: action.payload.msg || '',
				formErrorTypes: action.payload.errorType
			}

		case constants.USER_LOGOUT:
		case constants.ROUTE_CHANGED:
			return {
				...state,
				...resetFormMessages()
			}
		
		default:
			return state;
	}
}

export default formMessagesReducer;