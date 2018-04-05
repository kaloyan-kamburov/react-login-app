import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'
// import { debug } from 'util';

//sagas
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

export function* userAdminSearchUserSaga(action) {
    try {
        const users = yield call(() => axios.post(constants.API_URL + '/admin/searchUsers', 
            action.payload
        ));   

        if (users.data.success) {
            if (!action.payload.searchValue.length) {
                yield put({ type: constants.USER_ADMIN_SEARCH_USERS_SUCESS, payload: {
                    success: true,
                    users: []
                } });
            } else {
                yield put({ type: constants.USER_ADMIN_SEARCH_USERS_SUCESS, payload: users.data });
            }
        } else {
            yield put({ type: constants.USER_ADMIN_SEARCH_USERS_ERROR, payload: users.data });
        }
    } catch(error) {
        yield put({ type: constants.USER_ADMIN_SEARCH_USERS_ERROR });

    }
}

export function* userAdminDeleteUserSaga(action) {
    try {
        const userDelete = yield call(
            () => axios.delete(constants.API_URL + '/admin/' + action.payload           
        ));

        if (userDelete.data.success) {
            yield put({ type: constants.USER_ADMIN_DELETE_USER_SUCCESS, payload: userDelete.data });
        } else {
            yield put({ type: constants.USER_ADMIN_DELETE_USER_ERROR });

        }
    } catch(error) {
        yield put({ type: constants.USER_ADMIN_DELETE_USER_ERROR });

    }
}

//watchers
export function* watchUserGet() {
    yield takeLatest(constants.USER_ADMIN_GET_REQUEST, userGetAdminSaga)
}

export function* watchUserAdminUpdate() {
    yield takeLatest(constants.USER_ADMIN_UPDATE_REQUEST, userAdminUpdateSaga)
}

export function* watchUserAdminSearchUsers() {
    yield takeLatest(constants.USER_ADMIN_SEARCH_USERS_REQUEST, userAdminSearchUserSaga)
}

export function* watchUserAdminDeleteUser() {
    yield takeLatest(constants.USER_ADMIN_DELETE_USER_REQUEST, userAdminDeleteUserSaga)
}