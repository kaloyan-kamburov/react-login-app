import initialState from '../initialState';
import * as constants from '../../common/constants';

const cartReducer = (state = initialState.user.cart, action) => {
    switch (action.type) {
        case constants.USER_SET_DATA_SUCCESS:
            return {
                ...state,
                ...action.payload.cart
            }
        case constants.USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.user.cart
            }

        case constants.USER_ADD_PRODUCT_TO_CART_SUCCESS:
        case constants.USER_DECREMENT_PRODUCT_QUANTITY_SUCCESS:
        case constants.USER_REMOVE_PRODUCT_FROM_CART_SUCCESS:
            return {
                ...state,
                ...action.payload.cart
            }
            
        case constants.USER_LOGOUT:
            return {
                ...initialState.user.cart
            }
        default:
            return state;
    }
}

export default cartReducer;