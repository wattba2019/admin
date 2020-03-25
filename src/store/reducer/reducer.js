import ActionTypes from '../constant/constant';
import baseURL from '../../config/config';

const INITIAL_STATE = {
    bseUrl: baseURL.baseURL,

    userProfile: undefined,
    currentLocation: null,
    services: [],
    specialPackages: [],
    stylists: [],
    workingHours: {},
    bookings: null,
    gallery: [],
    bookedService: []
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

        case ActionTypes.FETCHED_STYLIST:
            return {
                ...state,
                stylists: action.payload
            };
        case ActionTypes.ADD_STYLIST:
            let updatedStylist = state.stylists.slice(0);
            updatedStylist.push(action.payload);
            return {
                ...state,
                stylists: updatedStylist
            };

        case ActionTypes.UPDATE_STYLIST:
            let editedStylist = state.stylists.slice(0);
            let indexToUpdateStylist = action.payload.indexToEdit;
            editedStylist.splice(indexToUpdateStylist, 1, action.payload);
            console.log('inside reducer', action.payload, editedStylist)
            return {
                ...state,
                stylists: editedStylist
            };

        case ActionTypes.FETCHED_WORKINGHOURS:
            return {
                ...state,
                workingHours: action.payload
            };

        case ActionTypes.FETCHED_BOOKINGS:
            return {
                ...state,
                bookings: action.payload
            };
        case ActionTypes.FETCHED_GALLERY:
            return {
                ...state,
                gallery: action.payload
            };
        case ActionTypes.FETCHED_BOOKED_SERVICE:
            return {
                ...state,
                bookedService: action.payload
            };
        default:
            return state;
    }

}