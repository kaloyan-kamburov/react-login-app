import initialState from '../initialState';
import * as constants from '../../common/constants';

const productsReducer = (state = initialState.products, action) => {
    // console.log(action)
    switch (action.type) {
        case constants.PRODUCT_GET_ALL_SUCCESS:
            return {
                ...state,
                all: action.payload.products || []
            }
        
        case constants.PRODUCT_GET_SUCCESS:
            return {
                ...state,
                currentEditableProduct: action.payload.product
            }

        case constants.PRODUCT_ADD_SUCCESS:
            let allProducts = state.all;
            allProducts.push(action.payload.product)
            return {
                ...state,
                productAdded: true,
                all: allProducts
            }

        case constants.PRODUCT_ADD_ERROR:
            return {
                ...state,
                productAdded: false
            }

        case constants.PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                currentEditableProduct: action.payload.product,
            }
        
            
        case constants.ROUTE_CHANGED:
            return {
                ...state,
                productAdded: false
            }
            
        default:
            return state;
    }
}

export default productsReducer;