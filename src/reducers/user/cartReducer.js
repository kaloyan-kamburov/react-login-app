import initialState from '../initialState';
import * as constants from '../../common/constants';

const cartReducer = (state = initialState.user.cart, action) => {
    switch (action.type) {
        case constants.USER_SET_DATA_SUCCESS: 
            console.log(action)
            
            return {
                ...state
            }
        case constants.USER_LOGIN_SUCCESS:
            
            return {
                ...state
            }
        default:
            return state;
    }
}

export default cartReducer;