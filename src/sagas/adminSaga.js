import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'
// import { debug } from 'util';

//sagas
export function* userGetAllSaga(action) {
    try {
        const users = yield call(() => axios.get(constants.API_URL + '/admin/users/'));

        if (users.data.success) {
            yield put({ 
                type: constants.USER_ADMIN_SET_ALL,
                payload: {
                    ...users.data,
                } 
            }); 
        }

    } catch (error) {
        
    }
}

export function* userGetAdminSaga(action) {
    
    try {
        const user = yield call(() => axios.get(constants.API_URL + '/users/' + action.payload))
        
        if (user.data.success) {
            yield put({ 
                type: constants.USER_ADMIN_SET,
                payload: user.data
            }); 
        } else {
            yield put({ 
                type: constants.USER_ADMIN_SET_ERROR
            });
        }

    } catch (error) {
        yield put({ 
            type: constants.USER_ADMIN_SET_ERROR
        });
    }
}

export function* userAdminUpdateSaga(action) {
    
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/users/update/' + action.payload.get('id'), action.payload))
        
        if (newUserData.data.success) {
            yield put({ type: constants.USER_ADMIN_UPDATED, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_ADMIN_UPDATE_ERROR, payload: newUserData.data });
        }
    } catch(error) {
        yield put({ type: constants.USER_ADMIN_UPDATE_ERROR });
    }
}

//watchers
export function* watchUserGetAll() {
    yield takeLatest(constants.USER_ADMIN_GET_ALL_REQUEST, userGetAllSaga)
}

export function* watchUserGet() {
    yield takeLatest(constants.USER_ADMIN_GET_REQUEST, userGetAdminSaga)
}

export function* watchUserAdminUpdate() {
    yield takeLatest(constants.USER_ADMIN_UPDATE_REQUEST, userAdminUpdateSaga)
}