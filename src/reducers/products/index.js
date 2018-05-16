import initialState from '../initialState';
import * as constants from '../../common/constants';

const productsReducer = (state = initialState.products, action) => {
    // console.log(action)
    let all = {};
    switch (action.type) {
        case constants.PRODUCT_GET_ALL_SUCCESS:
            all = state.all;
            if (action.payload.products.length) {
                action.payload.products.forEach(product => {
                    all[product._id] = {
                        categories: product.categories,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        avatar: product.avatar
                    }
                });
            }
            return {
                ...state,
                all
            }
        
        case constants.PRODUCT_GET_SUCCESS:
            return {
                ...state,
                currentEditableProduct: action.payload.product
            }

        case constants.PRODUCT_ADD_SUCCESS:
            all = state.all;
            all[action.payload.product._id] = {
                categories: action.payload.product.categories,
                name: action.payload.product.name,
                price: action.payload.product.price,
                description: action.payload.product.description,
                avatar: action.payload.product.avatar
            }
            // allProducts.push(action.payload.product)
            return {
                ...state,
                productAdded: true,
                all
            }

        case constants.PRODUCT_ADD_ERROR:
            return {
                ...state,
                productAdded: false
            }

        case constants.PRODUCT_UPDATE_SUCCESS: 
            all = state.all;
            all[action.payload.product.id] = {
                categories: action.payload.product.categories,
                name: action.payload.product.name,
                price: action.payload.product.price,
                description: action.payload.product.description,
                avatar: action.payload.product.avatar
            }
            return {
                ...state,
                currentEditableProduct: action.payload.product,
                all
            }

        case constants.PRODUCT_DELETE_SUCCESS:
            let products = {
                ...state
            }            
            delete products.all[action.payload.product._id]
            return {
                ...products
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