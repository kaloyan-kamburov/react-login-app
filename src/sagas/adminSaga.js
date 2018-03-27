import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'
import { debug } from 'util';

export function* watchUserGetAll() {
    yield takeLatest(constants.USER_GET_ALL_REQUEST, userGetAllSaga)
}

export function* userGetAllSaga(action) {
    try {
        const users = yield call(() => axios.get(constants.API_URL + '/admin/users/'));

        if (users.data.success) {
            yield put({ 
                type: constants.USER_SET_ALL,
                payload: {
                    ...users.data,
                } 
            }); 
        }

    } catch (error) {
        
    }
}