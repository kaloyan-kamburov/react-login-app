import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants';

//sagas
export function* watchCategoryAddSaga(action) {
    // debugger

    try {
        const newCategory = yield call(() =>
            axios.post(constants.API_URL + '/categories/add', action.payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        )
        
        if(newCategory.data.errorType) {
            yield put({ type: constants.CATEGORY_ADD_ERROR, payload: newCategory.data });
        } else {
            yield put({ type: constants.CATEGORY_ADD_SUCCESS, payload: newCategory.data })
        }
       
    } catch(error) {
        yield put({ type: constants.CATEGORY_ADD_ERROR, payload: error.message });
    }
}

//watchers
export function* watchCategoryAdd(action) {
    yield takeLatest(constants.CATEGORY_ADD_REQUEST, watchCategoryAddSaga)
}