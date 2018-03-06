import { all } from 'redux-saga/effects';
import { 
    watchUserRegister, 
    watchUserLogin,
    watchUserSetPersonalInfo, 
    watchUserUpdate
} from './userSaga';


export default function* rootSaga() {
    yield all([
        watchUserRegister(),
        watchUserLogin(),
        watchUserSetPersonalInfo(),
        watchUserUpdate()
    ])
}