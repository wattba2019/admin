
import ActionTypes from '../constant/constant';
import axios from 'axios';
import baseURL from '../../config/config';
import swal from 'sweetalert2';

export function setUserCredentials(userCredentials) {
    return dispatch => {
        dispatch({ type: ActionTypes.SAVE_USER, payload: userCredentials })
    }
}


export function addService(service) {
    return dispatch => {
        console.log('inside action', service);
        var options = {
            method: 'POST',
            url: `${baseURL.baseURL}/servicesandgallery/add/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: service
        };
        axios(options)
            .then((data) => {
                console.log(data.data, "Service added successfully.")
                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.log(err.response.data.message, "ERROR_ON_SAVING")
                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )

            })
    }
}


export function getServices(userID) {
    return dispatch => {
        var options = {
            method: 'GET',
            url: `${baseURL.baseURL}/servicesget/${userID}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            }
        };
        axios(options)
            .then((services) => {
                console.log(services, 'fetched services');
                dispatch({ type: ActionTypes.FETCHED_SERVICES, payload: services.data.data })

            })
            .catch((err) => {
                console.log(err, "Error in fetching services")
                // alert(err.response.data.message)
            })
    }
}


//servicesget