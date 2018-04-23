import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants';

//sagas
export function* categoryGetAllSaga(action) {
    if (!action.payload) {
        try {
            const categories = yield call(() =>
                axios.get(constants.API_URL + '/categories/', action.payload)
            )
            if(categories) {
                yield put({ type: constants.CATEGORY_GET_ALL_SUCCESS, payload: categories.data });
            } else {
                yield put({ type: constants.CATEGORY_GET_ALL_ERROR, payload: categories.data });            
            }
        
        } catch(error) {
            debugger
            yield put({ type: constants.CATEGORY_GET_ALL_ERROR, payload: error.message });
        }
    } else {
        debugger;
    }
}

export function* categoryGetSaga(action) {
    try {
        const category = yield call(() => axios.get(constants.API_URL + '/categories/' + action.payload))
        
        if (category.data.success) {
            yield put({ 
                type: constants.CATEGORY_GET_SUCCESS, 
                payload: {
                    ...category.data,
                } 
            });
        } else {
            yield put({ 
                type: constants.CATEGORY_GET_ERROR, 
                payload: {
                    ...category.data,
                } 
            });

        }
        
    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
    
}


export function* categoryAddSaga(action) {
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
export function* watchCategoryGetAll() {
    yield takeLatest(constants.CATEGORY_GET_ALL_REQUEST, categoryGetAllSaga)
}

export function* watchCategoryGet() {
    yield takeLatest(constants.CATEGORY_GET_REQUEST, categoryGetSaga)
}

export function* watchCategoryAdd() {
    yield takeLatest(constants.CATEGORY_ADD_REQUEST, categoryAddSaga)
}