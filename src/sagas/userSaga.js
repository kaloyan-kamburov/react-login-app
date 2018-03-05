import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'

export function* userRegisterSaga(action) {
    try {
        const newUserData = yield call(() =>
            axios.post(constants.API_URL + '/users/register', action.payload)
        )
        if(newUserData.data.errorType) {
            yield put({ type: constants.USER_REGISTER_ERROR, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_REGISTERED, payload: newUserData.data })
        }
       
    } catch(error) {
        // console.log(error)
        yield put({ type: constants.USER_REGISTER_ERROR });
    }
}

export function* userLoginSaga(action) {
    try {
        const newUserData = yield call(() => 
            axios.post(constants.API_URL + '/users/authenticate', {
                userOrEmail: action.payload.userOrEmail,
                password: action.payload.password,
                token: action.payload.token
            })  
        )
        if (newUserData.data.success) {
            yield put({ type: constants.USER_LOGGED, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_LOGIN_ERROR, payload: newUserData.data });
        }
    } catch(error) {
        yield put({ type: constants.USER_LOGIN_ERROR });
    }
}

export function* userUpdateSaga(action) {
    console.log(constants.API_URL + '/' + action.payload.id + '/users/update');

    try {
        const newUserData = yield call(() => 
            axios.put(constants.API_URL + '/users/update', {
                ...action.payload
            })  
        )
        // if (newUserData.data.success) {
        //     yield put({ type: constants.USER_LOGGED, payload: newUserData.data });
        // } else {
        //     yield put({ type: constants.USER_LOGIN_ERROR, payload: newUserData.data });
        // }
    } catch(error) {
        // yield put({ type: constants.USER_LOGIN_ERROR });
    }
}


export function* watchUserRegister() {
    yield takeEvery(constants.USER_REGISTER, userRegisterSaga)
}

export function* watchUserLogin() {
    yield takeEvery(constants.USER_LOGIN, userLoginSaga)
}

export function* watchUserUpdate() {
    yield takeEvery(constants.USER_UPDATE, userUpdateSaga)
}