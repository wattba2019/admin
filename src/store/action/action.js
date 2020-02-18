
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
                    'Service updated successfully.',
                    'success'
                )
            }).catch((err) => {
                // console.log(err.response.data.message, "ERROR_ON_SAVING")
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

export function updateSpecialOffer(specialOffer, indexToEdit, base64) {
    return dispatch => {
        console.log('insideaction', specialOffer, indexToEdit);
        // console.log('insideaction', specialOffer.packageImage.packageImage);

        var bodyFormData = new FormData();
        bodyFormData.append('packageName', specialOffer.packageName);
        bodyFormData.append('packageDescription', specialOffer.packageDescription);
        bodyFormData.append('price', specialOffer.price);
        bodyFormData.append('userId', specialOffer.userId);

        if (specialOffer.packageImage.packageImage) {
            bodyFormData.append('packageImage', specialOffer.packageImage.packageImage);
        }
        else {
            bodyFormData.append('imgs', specialOffer.packageImage);
        }

        var options = {
            method: 'PUT',
            url: `${baseURL.baseURL}/packagesandoffers/${specialOffer._id}/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: bodyFormData
        };
        axios(options)
            .then((data) => {
                console.log(data, "package updated successfully.");
                specialOffer.indexToEdit = indexToEdit;
                specialOffer.base64 = base64;
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
                // console.log(err.response.data.message, "ERROR_ON_SAVING")
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
    console.log(shopId, bookingDate, "DATA_IN_ACTION")
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
                dispatch({ type: ActionTypes.FETCHED_BOOKINGS, payload: bookings.data })
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
    alert("working_ACTION")
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
                // localStorage.setItem('userProfile', JSON.stringify(data.data.user));
                // dispatch({ type: ActionTypes.SAVE_USER, payload: data.data.user })
                // swal.fire(
                //     'Success!',
                //     data.data.message,
                //     'success'
                // )
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
        // console.log(imgFile, _id, "DATA_INSIDE_ACTION")
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
                localStorage.setItem('userProfile', JSON.stringify(data.data.user));
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



export function getGallery(userID) {
    return dispatch => {
        var options = {
            method: 'GET',
            url: `${baseURL.baseURL}/galleryget/${userID}`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            }
        };
        axios(options)
            .then((data) => {
                console.log(data.data.data[0].galleryImages, 'Fetched_gallery');
                dispatch({ type: ActionTypes.FETCHED_GALLERY, payload: data.data.data[0].galleryImages })
            })
            .catch((err) => {
                console.log(err, "Error in fetching savedStylists")
            })
    }
}

export function uploadGallery(imgFile, _id) {
    return dispatch => {
        console.log(imgFile[0], imgFile, _id, "DATA_INSIDE_ACTION_ADD_IMG")
        var bodyFormData = new FormData();
        bodyFormData.append('userId', _id);
        for (var i = 0; i < imgFile.length; i++) {
            bodyFormData.append("imgs", imgFile[i].originFileObj);
        }
        var options = {
            method: 'post',
            url: `${baseURL.baseURL}/servicesandgallery/addGalleryImages/`,
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
                console.log(data, "profile updated successfully.");
                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
            })
    }
}


export function updateGallery(oldImages, _id) {
    return dispatch => {
        console.log(oldImages, _id, "DATA_INSIDE_ACTION_UPDATE_IMG")

        let fileData = []
        let urlData = []
        for (let index = 0; index < oldImages.length; index++) {
            const element = oldImages[index];
            if (element.originFileObj) {
                // console.log(element, "FILE")
                fileData.push(element)
            }
            else {
                // console.log(element, "URL")
                urlData.push(element.url)
            }
        }

        var bodyFormData = new FormData();
        // add user id
        bodyFormData.append('userId', _id);
        // add img files
        for (var i = 0; i < fileData.length; i++) {
            bodyFormData.append("imgs", fileData[i].originFileObj);
        }
        // add img url old imgs
        for (var i = 0; i < urlData.length; i++) {
            bodyFormData.append("oldImages", urlData[i]);
        }

        var options = {
            method: 'post',
            url: `${baseURL.baseURL}/servicesandgallery/updateGalleryImages/`,
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
                console.log(data, "Gallery updated successfully.");
                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
            })


    }
}

