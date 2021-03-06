import { all } from 'redux-saga/effects';
import { 
    watchUserRegister, 
    watchUserLogin,
    watchUserSetData, 
    watchUserUpdate,
    watchUserChangePassword,    
    watchServerCheck,
    watchProductEditCart
} from './userSaga';

import {
    watchAdminUpdateInfo,
    watchAdminGetUser,
    watchAdminUpdateUser,
    watchAdminSearchUsers,
    watchAdminDeleteUser,
    watchAdminChangeUserPassword,
    watchAdminGetAllUsers
} from './adminSaga'

import {
    watchCategoryAdd,
    watchCategoryGet,
    watchCategoryGetAll,
    watchCategoryUpdate,
    watchCategoryDelete
} from './categorySaga';

import {
    watchProductAdd,
    watchProductGetAll,
    watchProductGet,
    watchProductUpdate,    
    watchProductDelete
} from './productSaga';


export default function* rootSaga() {
    yield all([
        watchAdminUpdateInfo(),
        watchUserRegister(),
        watchUserLogin(),
        watchUserSetData(),
        watchUserUpdate(),
        watchUserChangePassword(),
        watchProductEditCart(),

        watchAdminGetUser(),
        watchAdminUpdateUser(),
        watchAdminGetAllUsers(),
        watchAdminSearchUsers(),
        watchAdminDeleteUser(),
        watchAdminChangeUserPassword(),
        
        watchServerCheck(),
        
        watchCategoryGetAll(),
        watchCategoryGet(),
        watchCategoryAdd(),
        watchCategoryUpdate(),
        watchCategoryDelete(),

        watchProductAdd(),
        watchProductGetAll(),
        watchProductGet(),
        watchProductUpdate(),
        watchProductDelete()
    ])
}