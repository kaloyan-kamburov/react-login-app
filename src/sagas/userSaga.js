import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'

export function* userRegisterSaga(action) {
    try {
        const newUserData = yield call(() =>
            axios.post('http://localhost:8080/users/register', {
                name: action.payload.name,
                email: action.payload.email
            })            
        )
        yield put({ type: constants.USER_REGISTERED, payload: newUserData.data.user })
    } catch(error) {
        console.log(error)
        yield put({ type: constants.USER_REGISTER_ERROR });
    }




    
}

export function* watchUserRegister() {
    yield takeEvery(constants.USER_REGISTER, userRegisterSaga)
}