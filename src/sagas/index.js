import { all } from 'redux-saga/effects';
import { 
    watchUserRegister, 
    watchUserLogin,
    watchUserSetPersonalInfo, 
    watchUserUpdate,
    watchUserChangePassword,    
    watchServerCheck
} from './userSaga';

import {
    watchAdminGetUser,
    watchAdminUpdate,
    watchAdminSearchUsers,
    watchAdminDeleteUser,
    watchAdminChangeUserPassword
} from './adminSaga'

import {
    watchCategoryAdd
} from './categorySaga';


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
        watchAdminChangeUserPassword(),
        
        watchServerCheck(),

        watchCategoryAdd()
    ])
}