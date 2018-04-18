import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants';

//sagas
export function* watchCategoryAddSaga(action) {
    // debugger
    try {
        const newCategoryData = yield call(() =>
            axios.post(constants.API_URL + '/categories/add', action.payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        )
        if(newCategoryData.data.errorType) {
            yield put({ type: constants.CATEGORY_ADD_ERROR, payload: newCategoryData.data });
        } else {
            yield put({ type: constants.CATEGORY_ADD_SUCCESS, payload: newCategoryData.data })
        }
       
    } catch(error) {
        yield put({ type: constants.CATEGORY_ADD_ERROR, payload: error.message });
    }
}

//watchers
export function* watchCategoryAdd(action) {
    yield takeLatest(constants.CATEGORY_ADD_REQUEST, watchCategoryAddSaga)
}