import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    // bseUrl: "https://fathomless-citadel-43321.herokuapp.com",
    bseUrl: "http://192.168.200.130:3002",
    userProfile: {},
    currentLocation: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_USER:
            return {
                ...state,
                userProfile: action.payload
            };
        default:
            return state;
    }

}