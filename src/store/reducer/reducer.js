import ActionTypes from '../constant/constant';
import baseURL from '../../config/config';

const INITIAL_STATE = {
    bseUrl: baseURL.baseURL,
    userProfile: {},
    currentLocation: null,
    services: [],
    specialPackages: []
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
        case ActionTypes.ADD_SERVICE:
            let updatedServices = state.services.slice(0);
            updatedServices.push(action.payload);
            return {
                ...state,
                services: updatedServices
            };
        case ActionTypes.UPDATE_SERVICES:
            let editedServices = state.services.slice(0);
            let indexToUpdate = action.payload.indexToEdit;
            editedServices.splice(indexToUpdate, 1, action.payload);
            return {
                ...state,
                services: editedServices
            };

        case ActionTypes.ADD_SPECIAL_OFFER:
            let updatedSpecialPackage = state.specialPackages.slice(0);
            console.log(updatedSpecialPackage, "ACTION_CONSOLE")
            updatedSpecialPackage.push(action.payload);
            return {
                ...state,
                specialPackages: updatedSpecialPackage
            };

        case ActionTypes.FETCHED_SPECIAL_PACKAGE:
            return {
                ...state,
                specialPackages: action.payload
            };
        case ActionTypes.UPDATE_SPECIAL_OFFER:
            let editedSpecialOffer = state.specialPackages.slice(0);
            let indexToUpdateOffer = action.payload.indexToEdit;
            editedSpecialOffer.splice(indexToUpdateOffer, 1, action.payload);
            console.log('inside reducer', action.payload, editedSpecialOffer)
            return {
                ...state,
                specialPackages: editedSpecialOffer
            };





        default:
            return state;
    }

}