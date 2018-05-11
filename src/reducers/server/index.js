import initialState from '../initialState';
import * as actionTypes from '../../common/constants';

const serverReducer = (state = initialState.server, action) => {
    switch (action.type) {
        case actionTypes.SERVER_CHECK_SUCCESS:
        case actionTypes.ROUTE_CHANGED:
        case actionTypes.USER_LOGIN_REQUEST:
        case actionTypes.USER_REGISTER_REQUEST:
        case actionTypes.USER_SET_DATA_REQUEST:
        case actionTypes.USER_UPDATE_REQUEST:
        case actionTypes.USER_CHANGE_PASSWORD_REQUEST:
        case actionTypes.ADMIN_GET_ALL_USERS_REQUEST:
        case actionTypes.ADMIN_GET_USER_REQUEST:
        case actionTypes.ADMIN_UPDATE_USER_REQUEST:
        case actionTypes.ADMIN_SEARCH_USERS_REQUEST:
        case actionTypes.ADMIN_DELETE_USER_REQUEST:
        case actionTypes.ADMIN_CHANGE_USER_PASSWORD_REQUEST:
            return {
                ...state,
                error: ''
            }
        case actionTypes.SERVER_CHECK_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default serverReducer;