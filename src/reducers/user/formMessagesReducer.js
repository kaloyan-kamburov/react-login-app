import initialState from '../initialState';
import * as constants from '../../common/constants';
import * as helpers from '../../common/helpers';

const formMessagesReducer = (state = initialState.user.formMessages, action) => {
	switch (action.type) {
		case constants.USER_REGISTER_ERROR:
			return {
				...state,
				msgRegister: action.payload.msg
			}
		case constants.USER_LOGIN_ERROR:
		// debugger
			return {
				...state,
				msgLogin: action.payload.msg
			}
		case constants.USER_UPDATED:
		case constants.USER_UPDATE_ERROR:
			return {
				...state,
				msgUserUpdate: action.payload.msg
			}
		
		case constants.USER_CHANGE_PASWORD_SUCCESS:
		case constants.USER_CHANGE_PASWORD_ERROR:
			return {
				...state,
				msgUserChangePassword: action.payload.msg
			}
		default:
			return state;
	}
}

export default formMessagesReducer;