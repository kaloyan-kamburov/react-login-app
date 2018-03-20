import initialState from '../initialState';
import * as constants from '../../common/constants';
import * as helpers from '../../common/helpers';

const formMessagesReducer = (state = initialState.user.formMessages, action) => {
	switch (action.type) {
		case constants.USER_REGISTER_ERROR:
			return {
				...state,
				msgRegisterFail: action.payload.msg
			}
		default:
			return state;
	}
}

export default formMessagesReducer;