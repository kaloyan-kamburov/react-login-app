import initialState from './initialState';
import * as actionTypes from '../common/constants';

const productsReducer = (state = initialState.products, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.PRODUCTS_GET_ALL:
            return state;
        default:
            return state;
    }
}

export default productsReducer;