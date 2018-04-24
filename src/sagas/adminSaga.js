import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'

//sagas
export function* adminUpdateInfoSaga(action) {
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/users/update/' + action.payload.id, action.payload))
        
        if (newUserData.data.success) {
            yield put({ type: constants.ADMIN_UPDATE_INFO_SUCCESS, payload: newUserData.data });
        } else {
            yield put({ type: constants.ADMIN_UPDATE_INFO_ERROR, payload: newUserData.data });
        }
    } catch(error) {
        yield put({ type: constants.ADMIN_UPDATE_USER_ERROR });
    }
}

export function* adminGetUserSaga(action) {    
    try {
        const user = yield call(() => axios.get(constants.API_URL + '/users/' + action.payload))
        
        if (user.data.success) {
            yield put({ 
                type: constants.ADMIN_GET_USER_SUCCESS,
                payload: user.data
            }); 
        } else {
            yield put({ 
                type: constants.ADMIN_GET_USER_ERROR
            });
        }

    } catch (error) {
        yield put({ 
            type: constants.ADMIN_GET_USER_ERROR
        });
    }
}

export function* adminUpdateUserSaga(action) {  
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/users/update/' + action.payload.get('id'), action.payload))
        
        if (newUserData.data.success) {
            yield put({ type: constants.ADMIN_UPDATE_USER_SUCCESS, payload: newUserData.data });
        } else {
            yield put({ type: constants.ADMIN_UPDATE_USER_ERROR, payload: newUserData.data });
        }
    } catch(error) {
        yield put({ type: constants.ADMIN_UPDATE_USER_ERROR });
    }
}

export function* adminSearchUsersSaga(action) {
    try {
        const users = yield call(() => axios.post(constants.API_URL + '/admin/searchUsers', 
            action.payload
        ));   

        if (users.data.success) {
            if (!action.payload.searchValue.length) {
                yield put({ type: constants.ADMIN_SEARCH_USERS_SUCESS, payload: {
                    success: true,
                    users: []
                } });
            } else {
                yield put({ type: constants.ADMIN_SEARCH_USERS_SUCESS, payload: users.data });
            }
        } else {
            yield put({ type: constants.ADMIN_SEARCH_USERS_ERROR, payload: users.data });
        }
    } catch(error) {
        yield put({ type: constants.ADMIN_SEARCH_USERS_ERROR });

    }
}

export function* adminDeleteUserSaga(action) {
    try {
        const userDelete = yield call(
            () => axios.delete(constants.API_URL + '/admin/' + action.payload.id                       
        ));
        if (!userDelete.data.success) {
            yield put({ type: constants.ADMIN_DELETE_USER_ERROR });
        }
    } catch(error) {
        yield put({ type: constants.ADMIN_DELETE_USER_ERROR });

    }
}

export function* adminChangeUserPassword(action) {
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/admin/users/updatePassword/', action.payload))
        if (newUserData.data.success) {
            yield put({ type: constants.ADMIN_CHANGE_USER_PASSWORD_SUCCESS, payload: newUserData.data });
        } else {
            yield put({ type: constants.ADMIN_CHANGE_USER_PASSWORD_ERROR, payload: newUserData.data });
        }
        
        // const userChange
    } catch(error) {

    }
}

//watchers
export function* watchAdminUpdateInfo() {
    yield takeLatest(constants.ADMIN_UPDATE_INFO_REQUEST, adminUpdateInfoSaga)
}

export function* watchAdminGetUser() {
    yield takeLatest(constants.ADMIN_GET_USER_REQUEST, adminGetUserSaga)
}

export function* watchAdminUpdateUser() {
    yield takeLatest(constants.ADMIN_UPDATE_USER_REQUEST, adminUpdateUserSaga)
}

export function* watchAdminSearchUsers() {
    yield takeLatest(constants.ADMIN_SEARCH_USERS_REQUEST, adminSearchUsersSaga)
}

export function* watchAdminDeleteUser() {
    yield takeLatest(constants.ADMIN_DELETE_USER_REQUEST, adminDeleteUserSaga)
}

export function* watchAdminChangeUserPassword() {
    yield takeLatest(constants.ADMIN_CHANGE_USER_PASSWORD_REQUEST, adminChangeUserPassword)
}