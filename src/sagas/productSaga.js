import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants';

//sagas
export function* productAddSaga(action) {
    try {
        const newProduct = yield call(() =>
            axios.post(constants.API_URL + '/products/add', action.payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        )
        
        if(newProduct.data.errorType) {
            yield put({ type: constants.PRODUCT_ADD_ERROR, payload: newProduct.data });
        } else {
            yield put({ type: constants.PRODUCT_ADD_SUCCESS, payload: newProduct.data })
        }
       
    } catch(error) {
        yield put({ type: constants.PRODUCT_ADD_ERROR, payload: error.message });
    }
}

//watchers

export function* watchProductAdd() {
    yield takeLatest(constants.PRODUCT_ADD_REQUEST, productAddSaga)
}