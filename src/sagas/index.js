import { all } from 'redux-saga/effects';
import { userRegisterSaga, watchUserRegister } from './userSaga';


export default function* rootSaga() {
    yield all([
        watchUserRegister()
    ])
}