import { all } from 'redux-saga/effects';
import { 
    watchUserRegister, 
    watchUserLogin, 
    watchUserUpdate 
} from './userSaga';


export default function* rootSaga() {
    yield all([
        watchUserRegister(),
        watchUserLogin(),
        watchUserUpdate()
    ])
}