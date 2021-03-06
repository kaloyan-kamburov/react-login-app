import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as constants from '../common/constants'
import { debug } from 'util';

//sagas
export function* userRegisterSaga(action) {
    try {
        const newUserData = yield call(() =>
            axios.post(constants.API_URL + '/users/register', action.payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        )
        if(newUserData.data.errorType) {
            yield put({ type: constants.USER_REGISTER_ERROR, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_REGISTER_SUCCESS, payload: newUserData.data })
        }
       
    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

export function* userLoginSaga(action) {
    try {
        const newUserData = yield call(() => 
            axios.post(constants.API_URL + '/users/authenticate', {
                userOrEmail: action.payload.username,
                password: action.payload.password
            })
        )
        if (newUserData.data.success === true) {
            yield put({ type: constants.USER_LOGIN_SUCCESS, payload: newUserData.data || '' });
        } else {
            yield put({ type: constants.USER_LOGIN_ERROR, payload: newUserData.data || '' });

        }
        

    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

export function* userSetDataSaga(action) {
    if (action.payload) {
        try {
            const user = yield call(() => axios.get(constants.API_URL + '/users/' + action.payload))
            
            if (user.data.success) {
                yield put({ 
                    type: constants.USER_SET_DATA_SUCCESS, 
                    payload: {
                        ...user.data
                    }
                });
            }
           
        } catch(error) {
            yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
        }
    } else {
        yield put({ 
            type: constants.USER_SET_DATA_ERROR
        });
    }
    
}

export function* userUpdateSaga(action) {
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/users/update/' + action.payload.get('id'), action.payload))
        
        if (newUserData.data.success) {
            yield put({ type: constants.USER_UPDATE_SUCCESS, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_UPDATE_ERROR, payload: newUserData.data });
        }
    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

export function* userChangePasswordSaga(action) {
    try {
        const newUserData = yield call(() => axios.put(constants.API_URL + '/users/changepassword/' + action.payload.id, action.payload))
        if (newUserData.data.success) {
            yield put({ type: constants.USER_CHANGE_PASSWORD_SUCCESS, payload: newUserData.data });
        } else {
            yield put({ type: constants.USER_CHANGE_PASSWORD_ERROR, payload: newUserData.data });
        }

    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });

    }
}

export function* serverCheckSaga(action) {  
    try {
        const serverCheck = yield call(() => axios.get(constants.API_URL));
        if (typeof serverCheck !== 'undefined') {
            yield put({ type: constants.SERVER_CHECK_SUCCESS });
        }
    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

export function* productUpdateSaga(action) {
    try {
        const productData = yield call(() => axios.put(constants.API_URL + '/products/update/' + action.payload.get('id'), action.payload))
        
        if (productData.data.success) {
            yield put({ type: constants.PRODUCT_UPDATE_SUCCESS, payload: productData.data });
        } else {
            yield put({ type: constants.PRODUCT_UPDATE_ERROR, payload: productData.data });
        }
    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
    }
}

export function* productEditCartSaga(action) {
    try {
        const userData = yield call(() => axios.put(constants.API_URL + '/users/editCart', action.payload));
        let type;
        
        if (userData.data.success) {
            switch(action.payload.type) {
                case constants.USER_ADD_PRODUCT_TO_CART_REQUEST:
                    type = constants.USER_ADD_PRODUCT_TO_CART_SUCCESS;
                case constants.USER_DECREMENT_PRODUCT_QUANTITY_REQUEST:
                    type = constants.USER_DECREMENT_PRODUCT_QUANTITY_SUCCESS;
                default:
                    type = constants.USER_REMOVE_PRODUCT_FROM_CART_SUCCESS;
            }

            yield put({ 
                type, 
                payload: userData.data 
            });

        } else {
            switch(action.payload.type) {
                case constants.USER_ADD_PRODUCT_TO_CART_REQUEST:
                    type = constants.USER_ADD_PRODUCT_TO_CART_ERROR;
                case constants.USER_DECREMENT_PRODUCT_QUANTITY_REQUEST:
                    type = constants.USER_DECREMENT_PRODUCT_QUANTITY_ERROR;
                default:
                    type = constants.USER_REMOVE_PRODUCT_FROM_CART_ERROR;
            }

            yield put({ 
                type,
                payload: userData.data 
            });
        }

    } catch(error) {
        yield put({ type: constants.SERVER_CHECK_ERROR, payload: error.message });
        
    }
}

//watchers
export function* watchUserRegister() {
    yield takeLatest(constants.USER_REGISTER_REQUEST, userRegisterSaga)
}

export function* watchUserLogin() {
    yield takeLatest(constants.USER_LOGIN_REQUEST, userLoginSaga)
}

export function* watchUserSetData() {
    yield takeLatest(constants.USER_SET_DATA_REQUEST, userSetDataSaga)
}

export function* watchUserUpdate() {
    yield takeLatest(constants.USER_UPDATE_REQUEST, userUpdateSaga)
}

export function* watchUserChangePassword() {
    yield takeLatest(constants.USER_CHANGE_PASSWORD_REQUEST, userChangePasswordSaga)
}

export function* watchServerCheck() {
    yield takeLatest(constants.SERVER_CHECK_REQUEST, serverCheckSaga)
}

export function* watchProductEditCart() {
    yield [
        takeLatest(constants.USER_ADD_PRODUCT_TO_CART_REQUEST, productEditCartSaga),
        takeLatest(constants.USER_DECREMENT_PRODUCT_QUANTITY_REQUEST, productEditCartSaga),
        takeLatest(constants.USER_REMOVE_PRODUCT_FROM_CART_REQUEST, productEditCartSaga)
    ]
}
