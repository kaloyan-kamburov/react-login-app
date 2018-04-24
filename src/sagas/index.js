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
    watchAdminUpdateInfo,
    watchAdminGetUser,
    watchAdminUpdateUser,
    watchAdminSearchUsers,
    watchAdminDeleteUser,
    watchAdminChangeUserPassword
} from './adminSaga'

import {
    watchCategoryAdd,
    watchCategoryGet,
    watchCategoryGetAll,
    watchCategoryUpdate
} from './categorySaga';


export default function* rootSaga() {
    yield all([
        watchAdminUpdateInfo(),
        watchUserRegister(),
        watchUserLogin(),
        watchUserSetPersonalInfo(),
        watchUserUpdate(),
        watchUserChangePassword(),

        watchAdminGetUser(),
        watchAdminUpdateUser(),
        watchAdminSearchUsers(),
        watchAdminDeleteUser(),
        watchAdminChangeUserPassword(),
        
        watchServerCheck(),
        
        watchCategoryGetAll(),
        watchCategoryGet(),
        watchCategoryAdd(),
        watchCategoryUpdate()
    ])
}