import userSaga from './userSaga';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

describe('User Saga test', () => {
    it('registers user', done => {
        var mock = new MockAdapter(axios);
    })
})