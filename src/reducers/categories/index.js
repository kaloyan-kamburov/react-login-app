import initialState from '../initialState';
import * as constants from '../../common/constants';

const categoryReducer = (state = initialState.categories, action) => {
    switch (action.type) {        
        case constants.CATEGORY_GET_ALL_SUCCESS:
            return {
                ...state,
                all: action.payload.categories
            }
        case constants.CATEGORY_GET_SUCCESS:
            return {
                ...state,
                currentEditableCategory: action.payload.category
            }
        case constants.CATEGORY_ADD_SUCCESS:
            return {
                ...state,
                categoryAdded: true,
                [action.payload.category.name]: action.payload.category
            }
            
        case constants.CATEGORY_ADD_ERROR:
            return {
                ...state,
                categoryAdded: false,
            }
        
        case constants.ROUTE_CHANGED: {
            return {
                ...state,
                categoryAdded: false,
                currentEditableCategory: {}
            }
        }
            
            
        default:
            return state;
    }
}

export default categoryReducer;