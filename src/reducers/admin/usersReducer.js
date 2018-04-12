import initialState from '../initialState';
import * as constants from '../../common/constants';


const usersReducer = (state = initialState.admin.users, action) => {
    switch (action.type) {
        case constants.ADMIN_GET_USER_SUCCESS:
            return {
                ...state,
                currentEditableUser: action.payload.user
            }

        case constants.ADMIN_UPDATE_SUCCESS: 
        
            return {
                ...state,
                currentEditableUser: action.payload.user
            }

        case constants.ADMIN_UPDATE_ERROR:
            return {
                ...state
            }

        case constants.ADMIN_SEARCH_USERS_SUCESS: 
            return {
                ...state,
                searchResults: action.payload.users
            }
        
        case constants.ADMIN_CHANGE_SEARCH_FIELD:
            return {
                ...state,
                searchResults: [],
                searchField: action.payload
            }

        case constants.ADMIN_DELETE_USER_SUCCESS:
            return {
                ...state,
                searchResults: [...state.searchResults.slice(0, action.payload), ...state.searchResults.slice(action.payload+1)],
            }

        case constants.ADMIN_DELETE_USER_ERROR:
            return {
                ...state
            }

        default:
            return state;
    }

}


export default usersReducer;