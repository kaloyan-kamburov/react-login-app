import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'

export function* userRegisterSaga(action) {
    try {
        const newUserData = yield call(() =>
            axios.post('http://localhost:8080/users/register', {
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                address: action.payload.address
            })            
        )
        debugger
        yield put({ type: constants.USER_REGISTERED, payload: newUserData.data.user })
    } catch(error) {
        console.log(error)
        yield put({ type: constants.USER_REGISTER_ERROR });
    }
}

function* userLoginSaga(action) {
    try {
        const newUserData = yield call(() => 
            axios.post('http://localhost:8080/users/authenticate', {
                email: action.payload.email,
                password: action.payload.password
            })  
        )

        console.log(newUserData)
        debugger

        yield put({ type: constants.USER_LOGIN, payload: newUserData.data.user })
    } catch(error) {
        yield put({ type: constants.USER_LOGIN_ERROR })
    }
}

export function* watchUserRegister() {
    yield takeEvery(constants.USER_REGISTER, userRegisterSaga)
}

export function* watchUserLogin() {
    yield takeEvery(constants.USER_LOGIN, userLoginSaga)
}