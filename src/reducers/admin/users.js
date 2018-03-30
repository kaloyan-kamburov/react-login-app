import initialState from '../initialState';
import * as constants from '../../common/constants';


const usersReducer = (state = initialState.admin.users, action) => {
    switch (action.type) {
        case constants.USER_ADMIN_SET_ALL:
            return {
                ...state,
                all: action.payload.users
            }
        
        case constants.USER_ADMIN_SET:
            return {
                ...state,
                currentEditableUser: action.payload.user
            }

        case constants.USER_ADMIN_UPDATED: 
            return {
                ...state,
                currentEditableUser: action.payload.user
            }

        case constants.USER_ADMIN_UPDATE_ERROR:
            return {
                ...state
            }

        case constants.USER_ADMIN_SEARCH_USERS_SUCESS: 
            return {
                ...state
            }

        default:
            return state;
    }

}


export default usersReducer;