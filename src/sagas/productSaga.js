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

export function* productGetAllSaga(action) {
    try {
        const products = yield call(() =>
            axios.get(constants.API_URL + '/products/', action.payload)
        )
        if(products) {
            yield put({ type: constants.PRODUCT_GET_ALL_SUCCESS, payload: products.data });
        } else {
            yield put({ type: constants.PRODUCT_GET_ALL_ERROR, payload: products.data });            
        }
    
    } catch(error) {
        yield put({ type: constants.PRODUCT_GET_ALL_ERROR, payload: error.message });
    }
}

//watchers
export function* watchProductAdd() {
    yield takeLatest(constants.PRODUCT_ADD_REQUEST, productAddSaga)
}

export function* watchProductGetAll() {
    yield takeLatest(constants.PRODUCT_GET_ALL_REQUEST, productGetAllSaga)
}