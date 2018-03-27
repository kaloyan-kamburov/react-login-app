import initialState from '../initialState';
import * as constants from '../../common/constants';
import * as helpers from '../../common/helpers';


const usersReducer = (state = initialState.admin.users, action) => {
    switch (action.type) {
        case constants.USER_SET_ALL:
            return action.payload.users;
            
        default:
            return state;
    }

}


export default usersReducer;