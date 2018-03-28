import { all } from 'redux-saga/effects';
import { 
    watchUserRegister, 
    watchUserLogin,
    watchUserSetPersonalInfo, 
    watchUserUpdate,
    watchUserChangePassword    
} from './userSaga';

import {
    watchUserGetAll,
    watchUserGet,
    watchUserAdminUpdate
} from './adminSaga'


export default function* rootSaga() {
    yield all([
        watchUserRegister(),
        watchUserLogin(),
        watchUserSetPersonalInfo(),
        watchUserUpdate(),
        watchUserChangePassword(),
        watchUserGetAll(),
        watchUserGet(),
        watchUserAdminUpdate()
    ])
}