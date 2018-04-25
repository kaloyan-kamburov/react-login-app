import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants';

//sagas
export function* productAddSaga(action) {
}

//watchers

export function* watchProductAdd() {
    yield takeLatest(constants.USER_REGISTER_REQUEST, productAddSaga)
}