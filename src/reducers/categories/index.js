import initialState from '../initialState';
import * as actionTypes from '../../common/constants';

const categoryReducer = (state = initialState.categories, action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_ADD_SUCCESS:
            return {
                ...state,
                [action.payload.category.name]: action.payload.category
            }
        case actionTypes.CATEGORY_ADD_ERROR:
            return state;
            
        default:
            return state;
    }
}

export default categoryReducer;