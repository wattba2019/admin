import ActionTypes from '../constant/constant';
import baseURL from '../../config/config';

const INITIAL_STATE = {
    bseUrl: baseURL.baseURL,
    userProfile: {},
    currentLocation: null,
    services: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_USER:
            return {
                ...state,
                userProfile: action.payload
            };
        case ActionTypes.FETCHED_SERVICES:
            return {
                ...state,
                services: action.payload
            };

        default:
            return state;
    }

}