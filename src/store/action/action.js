
import ActionTypes from '../constant/constant';
import axios from 'axios';
import baseURL from '../../config/config';
import swal from 'sweetalert2';
import workingHours from '../../app/workingHours';
import WorkingHoursCard from '../../components/WorkingHoursCard';

export function setUserCredentials(userCredentials) {
    return dispatch => {
        dispatch({ type: ActionTypes.SAVE_USER, payload: userCredentials })
    }
}


/* Actions for Services */

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
                console.log(data.data.result, "Service added successfully.");
                dispatch({ type: ActionTypes.ADD_SERVICE, payload: data.data.result })
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



export function updateService(service, indexToEdit) {
    return dispatch => {
        console.log('inside action', service);
        var options = {
            method: 'PUT',
            url: `${baseURL.baseURL}/servicesget/${service._id}/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: service
        };
        axios(options)
            .then((data) => {
                console.log(data.data, "Service updated successfully.");
                service.indexToEdit = indexToEdit;
                dispatch({ type: ActionTypes.UPDATE_SERVICES, payload: service })

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


/* Actions for Services */






/* Actions for Special Offer */

export function addSpecialOffer(specialOffer) {
    return dispatch => {
        console.log('specialOffer', specialOffer);
        var bodyFormData = new FormData();
        bodyFormData.append('packageName', specialOffer.packageName);
        bodyFormData.append('packageDescription', specialOffer.packageDescription);
        bodyFormData.append('price', specialOffer.price);
        bodyFormData.append('imgs', specialOffer.packageImage);
        bodyFormData.append('userId', specialOffer.userId);


        var options = {
            method: 'POST',
            url: `${baseURL.baseURL}/packagesandoffers/add/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: bodyFormData
        };
        axios(options)
            .then((data) => {
                console.log(data, "Special offer added successfully.");
                dispatch({ type: ActionTypes.ADD_SPECIAL_OFFER, payload: data.data.result })
                swal.fire(
                    'Success!',
                    "Special offer added successfully.",
                    'success'
                )
            }).catch((err) => {
                // console.log(err.response.data.message, "ERROR_ON_SAVING")
                console.log(err, "Error in adding special offers")

                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )

            })
    }
}




export function getSpecialPackages(userID) {
    return dispatch => {
        var options = {
            method: 'GET',
            url: `${baseURL.baseURL}/packagesandoffersget/${userID}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            }
        };
        axios(options)
            .then((specialPackages) => {
                console.log(specialPackages, 'fetched specialPackages');
                dispatch({ type: ActionTypes.FETCHED_SPECIAL_PACKAGE, payload: specialPackages.data.data })
            })
            .catch((err) => {
                console.log(err, "Error in fetching packages")
                // alert(err.response.data.message)
            })
    }
}






export function updateSpecialOffer(specialOffer, indexToEdit) {
    return dispatch => {
        console.log('inside action', specialOffer, indexToEdit);
        var options = {
            method: 'PUT',
            url: `${baseURL.baseURL}/packagesandoffers/${specialOffer._id}/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: specialOffer
        };
        axios(options)
            .then((data) => {
                console.log(data, "package updated successfully.");
                specialOffer.indexToEdit = indexToEdit;

                dispatch({ type: ActionTypes.UPDATE_SPECIAL_OFFER, payload: specialOffer })

                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )

            })
    }
}









/* Actions for Special Offer */




/* Actions for Stylists */




export function addStylist(stylist) {
    return dispatch => {
        console.log('inside action', stylist);
        var options = {
            method: 'POST',
            url: `${baseURL.baseURL}/stylist/${stylist.userId}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: stylist
        };
        axios(options)
            .then((data) => {
                console.log(data, "Stylist added successfully.");
                dispatch({ type: ActionTypes.ADD_STYLIST, payload: data.data })
                swal.fire(
                    'Success!',
                    'Stylist Added',
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





export function getStylists(userID) {
    return dispatch => {
        var options = {
            method: 'GET',
            url: `${baseURL.baseURL}/stylist/${userID}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            }
        };
        axios(options)
            .then((savedStylists) => {
                console.log(savedStylists, 'fetched savedStylists');
                dispatch({ type: ActionTypes.FETCHED_STYLIST, payload: savedStylists.data.data })
            })
            .catch((err) => {
                console.log(err, "Error in fetching savedStylists")
                // alert(err.response.data.message)
            })
    }
}




export function updateStylist(stylist, indexToEdit) {
    return dispatch => {
        console.log('inside action', stylist, indexToEdit);
        var options = {
            method: 'PUT',
            url: `${baseURL.baseURL}/stylist/${stylist._id}/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: stylist
        };
        axios(options)
            .then((data) => {
                console.log(data, "stylist updated successfully.");
                stylist.indexToEdit = indexToEdit;

                dispatch({ type: ActionTypes.UPDATE_STYLIST, payload: stylist })

                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )

            })
    }
}

/* Actions for Stylists */





/* Actions for Working Hours */


export function getWorkingHours(userID) {
    return dispatch => {
        var options = {
            method: 'GET',
            url: `${baseURL.baseURL}/workinghours/${userID}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            }
        };
        axios(options)
            .then((wokringHours) => {
                console.log(wokringHours, 'fetched wokringHours');
                if (Object.keys(wokringHours).length > 0) {
                    dispatch({ type: ActionTypes.FETCHED_WORKINGHOURS, payload: wokringHours.data.workingHours })
                }
            })
            .catch((err) => {
                console.log(err, "Error in fetching wokringHours")
                // alert(err.response.data.message)
            })
    }
}



export function updateWorkingHours(workingHours) {
    return dispatch => {
        console.log('inside workingHours action', workingHours);
        var options = {
            method: 'POST',
            url: `${baseURL.baseURL}/workinghours/${workingHours.userID}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: workingHours
        };
        axios(options)
            .then((data) => {
                console.log(data, "stylist updated successfully.");
                // stylist.indexToEdit = indexToEdit;

                dispatch({ type: ActionTypes.FETCHED_WORKINGHOURS, payload: workingHours })

                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )

            })
    }
}

/* Actions for Working Hours */











/* Actions for Bookings */



export function getBookings(shopId, bookingDate) {
    return dispatch => {
        var options = {
            method: 'GET',
            url: `${baseURL.baseURL}/bookings/${shopId}/${bookingDate}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            }
        };
        axios(options)
            .then((bookings) => {

                console.log(bookings, 'fetched bookings');

                // if (Object.keys(wokringHours).length > 0) {
                dispatch({ type: ActionTypes.FETCHED_BOOKINGS, payload: bookings.data })
                // }
            })
            .catch((err) => {
                console.log(err, "Error in fetching bookings")
                // alert(err.response.data.message)
            })
    }
}




/* Actions for Bookings */








export function changePassword(email, password, rePassword) {
    return dispatch => {
        if (password === rePassword) {
            let cloneData = {
                email: email,
                newPassword: password,
            }
            var options = {
                method: 'POST',
                url: `${baseURL.baseURL}/resetpasswordAdmin/changepassword/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneData
            };
            axios(options)
                .then((data) => {
                    console.log(data.data, "CHANGE_PASSWORD_SUCCESSFULL")
                    swal.fire(
                        'Success!',
                        data.data.message,
                        'success'
                    )
                }).catch((err) => {
                    console.log(err.response.data.message, "ERROR_ON_PASSWORD_CHANGE")
                    swal.fire(
                        'Error!',
                        err.response.data.message,
                        'error'
                    )
                })
        }
        else {
            swal.fire(
                'Error!',
                'Password does not match',
                'error'
            )
        }

    }
}



export function updateProfile(updatedUserData) {
    return dispatch => {
        console.log(updatedUserData, "DATA_INSIDE_ACTION")
        var options = {
            method: 'put',
            url: `${baseURL.baseURL}/signupadmin/editProfile/${updatedUserData._id}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: updatedUserData
        };
        axios(options)
            .then((data) => {
                console.log(data.data.user, "profile updated successfully.");
                dispatch({ type: ActionTypes.SAVE_USER, payload: data.data.user })
                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )
            })
    }
}



export function updateProfileImg(imgFile, _id) {
    return dispatch => {
        console.log(imgFile, _id, "DATA_INSIDE_ACTION")
        var bodyFormData = new FormData();
        bodyFormData.append('img', imgFile);
        bodyFormData.append('_id', _id);

        var options = {
            method: 'post',
            url: `${baseURL.baseURL}/signupadmin/addshopimg/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
                contentType: 'application/json',
            },
            data: bodyFormData
        };
        axios(options)
            .then((data) => {
                console.log(data.data.user, "profile updated successfully.");
                dispatch({ type: ActionTypes.SAVE_USER, payload: data.data.user })
                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )
            })
    }
}