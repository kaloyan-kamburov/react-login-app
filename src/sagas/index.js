import { all } from 'redux-saga/effects';
import { userRegisterSaga, watchUserRegister, watchUserLogin, watchUserLogged } from './userSaga';


export default function* rootSaga() {
    yield all([
        watchUserRegister()
        // watchUserLogin()
    ])
}