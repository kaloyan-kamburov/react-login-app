import * as constants from './constants';

export default function api() {
    return {
        getApiUrl: () => {
            return constants.API_URL;
        }
    }
} 