import initialState from '../initialState';
import * as actionTypes from '../../common/constants';

const serverReducer = (state = initialState.server, action) => {
    switch (action.type) {
        case actionTypes.SERVER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default serverReducer;