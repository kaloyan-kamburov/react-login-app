import initialState from '../initialState';
import * as actionTypes from '../../common/constants';

const categoryReducer = (state = initialState.categories, action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_ADD_SUCCESS:
            return {
                ...state,
                error: ''
            }
        case actionTypes.CATEGORY_ADD_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer;