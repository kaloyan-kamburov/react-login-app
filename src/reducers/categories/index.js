import initialState from '../initialState';
import * as constants from '../../common/constants';

const categoryReducer = (state = initialState.categories, action) => {
    switch (action.type) {        
        case constants.CATEGORY_GET_ALL_SUCCESS:
            let allCategories = {};
            if (action.payload.categories) {
                action.payload.categories.forEach(category => {
                    allCategories[category._id] = category
                });
            }
            return {
                ...state,
                all: allCategories
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
                all: {
                    ...state.all,
                    [action.payload.category.id]: action.payload.category
                }
            }
            
        case constants.CATEGORY_ADD_ERROR:
            return {
                ...state,
                categoryAdded: false
            }
            
        case constants.CATEGORY_UPDATE_SUCCESS:
            return {
                ...state,
                currentEditableCategory: action.payload.category,
                all: {
                    ...state.all,
                    [action.payload.category._id]: action.payload.category
                }
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