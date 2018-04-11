import { all } from 'redux-saga/effects';
import { 
    watchUserRegister, 
    watchUserLogin,
    watchUserSetPersonalInfo, 
    watchUserUpdate,
    watchUserChangePassword    
} from './userSaga';

import {
    watchAdminGetUser,
    watchAdminUpdate,
    watchAdminSearchUsers,
    watchAdminDeleteUser,
    watchAdminChangeUserPassword
} from './adminSaga'


export default function* rootSaga() {
    yield all([
        watchUserRegister(),
        watchUserLogin(),
        watchUserSetPersonalInfo(),
        watchUserUpdate(),
        watchUserChangePassword(),

        watchAdminGetUser(),
        watchAdminUpdate(),
        watchAdminSearchUsers(),
        watchAdminDeleteUser(),
        watchAdminChangeUserPassword()
    ])
}