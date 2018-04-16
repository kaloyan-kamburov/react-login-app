import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'
import { debug } from 'util';

//sagas
export function* userRegisterSaga(action) {
    try {
        const newUserData = yield call(() =>
            axios.post(constants.API_URL + '/users/register', action.payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        )
        if(newUserData.data.errorType) {
            yield put({ type: constants.USER_REGISTER_ERROR, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_REGISTER_SUCCESS, payload: newUserData.data })
        }
       
    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

export function* userLoginSaga(action) {
    try {
        const newUserData = yield call(() => 
            axios.post(constants.API_URL + '/users/authenticate', {
                userOrEmail: action.payload.username,
                password: action.payload.password
            })
        )
        if (newUserData.data.success) {
            yield put({ type: constants.USER_LOGIN_SUCCESS, payload: newUserData.data || '' });
        } else {
            yield put({ type: constants.USER_LOGIN_ERROR, payload: newUserData.data || '' });

        }
        

    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

export function* userSetPersonalInfoSaga(action) {
    if (action.payload) {
        try {
            const user = yield call(() => axios.get(constants.API_URL + '/users/' + action.payload))
            
            if (user.data.success) {
                yield put({ 
                    type: constants.USER_SET_PERSONAL_INFO_SUCCESS, 
                    payload: {
                        ...user.data,
                    } 
                });
            }
           
        } catch(error) {
            yield put({ 
                type: constants.USER_SET_PERSONAL_INFO_ERROR
            });
        }
    } else {
        yield put({ 
            type: constants.USER_SET_PERSONAL_INFO_ERROR
        });
    }
    
}

export function* userUpdateSaga(action) {
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/users/update/' + action.payload.get('id'), action.payload))
        
        if (newUserData.data.success) {
            yield put({ type: constants.USER_UPDATE_SUCCESS, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_UPDATE_ERROR, payload: newUserData.data });
        }
    } catch(error) {
        yield put({ type: constants.USER_UPDATE_ERROR });
    }
}

export function* userChangePasswordSaga(action) {
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/users/changepassword/' + action.payload.id, action.payload))
        if (newUserData.data.success) {
            yield put({ type: constants.USER_CHANGE_PASWORD_SUCCESS, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_CHANGE_PASWORD_ERROR, payload: newUserData.data });
        }

    } catch(error) {

    }
}

export function* serverCheckSaga(action) {  
    try {
        const serverCheck = yield call(() => axios.get(constants.API_URL));
        if (typeof serverCheck !== 'undefined') {
            yield put({ type: constants.SERVER_CHECK_SUCCESS });
        }
    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

//watchers
export function* watchUserRegister() {
    yield takeLatest(constants.USER_REGISTER_REQUEST, userRegisterSaga)
}

export function* watchUserLogin() {
    yield takeLatest(constants.USER_LOGIN_REQUEST, userLoginSaga)
}

export function* watchUserSetPersonalInfo() {
    yield takeLatest(constants.USER_SET_PERSONAL_INFO_REQUEST, userSetPersonalInfoSaga)
}

export function* watchUserUpdate() {
    yield takeLatest(constants.USER_UPDATE_REQUEST, userUpdateSaga)
}

export function* watchUserChangePassword() {
    yield takeLatest(constants.USER_CHANGE_PASSWORD_REQUEST, userChangePasswordSaga)
}

export function* watchServerCheck() {
    yield takeLatest(constants.SERVER_CHECK_REQUEST, serverCheckSaga)
}