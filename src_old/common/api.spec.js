import api from './api'
import * as constants from './constants';

describe('test api', () => {

    it('renders without crashing', () => {
       expect(api().getApiUrl()).toEqual(constants.API_URL);
    });
   
})
  