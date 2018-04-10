import { all } from 'redux-saga/effects';
import { 
    watchUserRegister, 
    watchUserLogin,
    watchUserSetPersonalInfo, 
    watchUserUpdate,
    watchUserChangePassword    
} from './userSaga';

import {
    watchUserGet,
    watchUserAdminUpdate,
    watchUserAdminSearchUsers,
    watchUserAdminDeleteUser,
    watchUserAdminChangeUserPassword
} from './adminSaga'


export default function* rootSaga() {
    yield all([
        watchUserRegister(),
        watchUserLogin(),
        watchUserSetPersonalInfo(),
        watchUserUpdate(),
        watchUserChangePassword(),
        watchUserGet(),
        watchUserAdminUpdate(),
        watchUserAdminSearchUsers(),
        watchUserAdminDeleteUser(),
        watchUserAdminChangeUserPassword()
    ])
}