
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
        // console.log('inside_action', service);
        if (service.categoryName != "" && service.serviceName != "" && service.price != "") {
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
        else {
            swal.fire(
                'Error!',
                'Category, Service Name and Price are required',
                'error'
            )
        }
    }
}


export function getServices(userID) {
    // console.log("ITS_WORKING", userID)
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
        // console.log('inside action', service);
        if (service.categoryName != "" && service.serviceName != "" && service.price != "") {
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
        else {
            swal.fire(
                'Error!',
                'Category, Service Name and Price are required',
                'error'
            )
        }
    }
}


/* Actions for Services */






/* Actions for Special Offer */

export function addSpecialOffer(specialOffer) {
    return dispatch => {
        console.log('specialOffer', specialOffer);
        if (specialOffer.businessType != undefined) {
            var bodyFormData = new FormData();
            bodyFormData.append('packageName', specialOffer.packageName);
            bodyFormData.append('packageDescription', specialOffer.packageDescription);
            bodyFormData.append('price', specialOffer.price);
            bodyFormData.append('imgs', specialOffer.packageImage);
            bodyFormData.append('userId', specialOffer.userId);
            bodyFormData.append('businessType', specialOffer.businessType);
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
                    swal.fire(
                        'Error!',
                        'Something went wrong.',
                        'error'
                    )
                })
        }
        else {
            swal.fire(
                'Error!',
                "Please Select Offer Type",
                'error'
            )
        }
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
        if (specialOffer.businessType != undefined) {
            var bodyFormData = new FormData();
            bodyFormData.append('packageName', specialOffer.packageName);
            bodyFormData.append('packageDescription', specialOffer.packageDescription);
            bodyFormData.append('price', specialOffer.price);
            bodyFormData.append('userId', specialOffer.userId);
            bodyFormData.append('businessType', specialOffer.businessType);
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
                    swal.fire(
                        'Error!',
                        'Something went wrong.',
                        'error'
                    )
                })
        }
        else {
            swal.fire(
                'Error!',
                "Please Select Offer Type",
                'error'
            )
        }
    }
}

/* Actions for Special Offer */

/* Actions for Stylists */

export function getStylists(userID) {
    // alert("getStylist")
    console.log(userID, "USERID")
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

// backup //

// export function addStylist(stylist) {
//     return dispatch => {
//         console.log('inside action', stylist);
//         var options = {
//             method: 'POST',
//             url: `${baseURL.baseURL}/stylist/${stylist.userId}`,
//             headers:
//             {
//                 'cache-control': 'no-cache',
//                 "Allow-Cross-Origin": '*',
//             },
//             data: stylist
//         };
//         axios(options)
//             .then((data) => {
//                 console.log(data, "Stylist added successfully.");
//                 dispatch({ type: ActionTypes.ADD_STYLIST, payload: data.data })
//                 swal.fire(
//                     'Success!',
//                     'Stylist Added',
//                     'success'
//                 )
//             }).catch((err) => {
//                 // console.log(err.response.data.message, "ERROR_ON_SAVING")
//                 // alert(err.response.data.message)
//                 swal.fire(
//                     'Error!',
//                     'Something went wrong.',
//                     'error'
//                 )

//             })
//     }
// }

// export function updateStylist(stylist, indexToEdit) {
//     return dispatch => {
//         console.log('inside action', stylist, indexToEdit);
//         var options = {
//             method: 'PUT',
//             url: `${baseURL.baseURL}/stylist/${stylist._id}/`,
//             headers:
//             {
//                 'cache-control': 'no-cache',
//                 "Allow-Cross-Origin": '*',
//             },
//             data: stylist
//         };
//         axios(options)
//             .then((data) => {
//                 console.log(data, "stylist updated successfully.");
//                 stylist.indexToEdit = indexToEdit;
//                 dispatch({ type: ActionTypes.UPDATE_STYLIST, payload: stylist })
//                 swal.fire(
//                     'Success!',
//                     data.data.message,
//                     'success'
//                 )
//             }).catch((err) => {
//                 console.error(err, "ERROR_ON_SAVING")
//                 // alert(err.response.data.message)
//                 swal.fire(
//                     'Error!',
//                     'Something went wrong.',
//                     'error'
//                 )
//             })
//     }
// }

// export function updateStylist(stylist, indexToEdit) {
//     return dispatch => {
//         console.log('inside action', stylist, indexToEdit);
//         var options = {
//             method: 'PUT',
//             url: `${baseURL.baseURL}/stylist/${stylist._id}/`,
//             headers:
//             {
//                 'cache-control': 'no-cache',
//                 "Allow-Cross-Origin": '*',
//             },
//             data: stylist
//         };
//         axios(options)
//             .then((data) => {
//                 console.log(data, "stylist updated successfully.");
//                 stylist.indexToEdit = indexToEdit;

//                 dispatch({ type: ActionTypes.UPDATE_STYLIST, payload: stylist })

//                 swal.fire(
//                     'Success!',
//                     data.data.message,
//                     'success'
//                 )
//             }).catch((err) => {
//                 console.error(err, "ERROR_ON_SAVING")
//                 // alert(err.response.data.message)
//                 swal.fire(
//                     'Error!',
//                     'Something went wrong.',
//                     'error'
//                 )

//             })
//     }
// }


export function addStylist(stylist, imgFile) {
    return dispatch => {
        if (stylist.serviceProvided.length) {
            var bodyFormData = new FormData();
            bodyFormData.append('userId', stylist.userId);
            bodyFormData.append('fullname', stylist.fullname);
            bodyFormData.append('gender', stylist.gender);
            bodyFormData.append('designation', stylist.designation);
            bodyFormData.append('description', stylist.description);
            bodyFormData.append('workingDays', JSON.stringify(stylist.workingDays));
            bodyFormData.append('serviceProvided', JSON.stringify(stylist.serviceProvided));

            for (var i = 0; i < imgFile.length; i++) {
                bodyFormData.append("imgs", imgFile[i].originFileObj);
            }
            var options = {
                method: 'POST',
                url: `${baseURL.baseURL}/stylistGallery/addStylistGalleryImages/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                    'Accept': 'application/json',
                },
                data: bodyFormData
            };
            axios(options)
                .then((data) => {
                    console.log(data, "Stylist_added_successfully");
                    dispatch({ type: ActionTypes.ADD_STYLIST, payload: data.data })
                    swal.fire(
                        'Success!',
                        'Stylist Added',
                        'success'
                    )
                }).catch((err) => {
                    swal.fire(
                        'Error!',
                        'Something went wrong.',
                        'error'
                    )

                })
        }
        else {
            swal.fire(
                'Error!',
                'Please select service',
                'error'
            )
        }

    }
}


export function updateStylist(stylist, indexToEdit, oldImages) {
    return dispatch => {
        let fileData = []
        let urlData = []
        for (let index = 0; index < oldImages.length; index++) {
            const element = oldImages[index];
            if (element.originFileObj) {
                fileData.push(element)
            }
            else {
                urlData.push(element.url)
            }
        }
        var bodyFormData = new FormData();
        // add stylist id and data
        bodyFormData.append('_id', stylist._id);
        bodyFormData.append('userId', stylist.userId);
        bodyFormData.append('fullname', stylist.fullname);
        bodyFormData.append('gender', stylist.gender);
        bodyFormData.append('designation', stylist.designation);
        bodyFormData.append('description', stylist.description);
        bodyFormData.append('workingDays', JSON.stringify(stylist.workingDays));
        // bodyFormData.append('serviceProvided', stylist.serviceProvided);
        bodyFormData.append('serviceProvided', JSON.stringify(stylist.serviceProvided));

        if (fileData.length) {
            // add img files
            for (var i = 0; i < fileData.length; i++) {
                bodyFormData.append("imgs", fileData[i].originFileObj);
            }
        }
        // add img url old imgs
        for (var i = 0; i < urlData.length; i++) {
            bodyFormData.append("oldImages", urlData[i]);
        }
        // add stylist data
        console.log('inside_action', stylist.userId,);
        var options = {
            method: 'POST',
            url: `${baseURL.baseURL}/stylistGallery/updateStylistGalleryImages/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
                'Accept': 'application/json',
            },
            data: bodyFormData
        };
        axios(options)
            .then((data) => {
                // stylist.indexToEdit = indexToEdit;
                let updatedStylist = data.data.data
                // console.log(updatedStylist, "stylist_updated_successfully.");
                dispatch({ type: ActionTypes.UPDATE_STYLIST, payload: updatedStylist })
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


export function deleteStylist(_id, stylists, index) {
    return dispatch => {
        let currentStylist = stylists[index]
        if (_id != undefined) {
            let idsCloneData = {
                _id: _id,
                userId: currentStylist.userId
            }
            var options = {
                method: 'POST',
                url: `${baseURL.baseURL}/stylistGallery/deleteStylist/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: idsCloneData
            }
            axios(options)
                .then(result => {
                    let data = result.data
                    let updatedStylist = data.data
                    dispatch({ type: ActionTypes.UPDATE_STYLIST, payload: updatedStylist })
                    swal.fire(
                        'Success!',
                        data.message,
                        'success'
                    )
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                    swal.fire(
                        'Error!',
                        'Something went wrong.',
                        'error'
                    )
                })
        }
    }
}






export function getWorkingHours(userID) {
    console.log(userID, "getWorkingHours")
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
                // console.log(wokringHours, 'fetched_wokringHours');
                if (Object.keys(wokringHours).length > 0 && wokringHours.data.workingHours != null) {
                    // console.log(wokringHours.data.workingHours, 'fetched_wokringHours');
                    dispatch({ type: ActionTypes.FETCHED_WORKINGHOURS, payload: wokringHours.data.workingHours })
                }
            })
            .catch((err) => {
                console.log(err, "Error in fetching wokringHours")
                // alert(err.response.data.message)
            })
    }
}

export function updateWorkingHours(workingHours, autoAdd) {
    return dispatch => {
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
                // console.log(data, "stylist updated successfully.");
                dispatch({ type: ActionTypes.FETCHED_WORKINGHOURS, payload: workingHours })
                if (!autoAdd) {
                    swal.fire(
                        'Success!',
                        data.data.message,
                        'success'
                    )
                }
            }).catch((err) => {
                // console.error(err, "ERROR_ON_SAVING")
                // alert(err.response.data.message)
                swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                )
            })
    }
}

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
                dispatch({ type: ActionTypes.FETCHED_BOOKINGS, payload: bookings.data })
                let booking = bookings.data.bookingSort
                const keys = Object.keys(booking)
                let serviceId = [];
                let packageId = [];
                for (const key of keys) {
                    let arr = booking[key]
                    for (let index = 0; index < arr.length; index++) {
                        let idArr = arr[index].requiredServiceId
                        // console.log(arr[index], "INSIDE_LOOP")
                        if (arr[index].package === false || arr[index].package === "false") {
                            for (let k = 0; k < idArr.length; k++) {
                                const element = idArr[k];
                                // console.log(element, "THIS_IS_SERVICE")
                                // Check if a value exists in the fruits array
                                if (serviceId.indexOf(element) === -1) {
                                    serviceId.push(element)
                                }
                            }
                        }
                        else {
                            for (let k = 0; k < idArr.length; k++) {
                                const element = idArr[k];
                                // console.log(element, "THIS_IS_PACKAGE")
                                // Check if a value exists in the fruits array
                                if (packageId.indexOf(element) === -1) {
                                    packageId.push(element)
                                }
                            }
                        }
                    }
                }
                // console.log(serviceId, packageId, "PACKID")
                dispatch(getBookedService(serviceId));
                dispatch(getBookedPackage(packageId));
            })
            .catch((err) => {
                console.log(err, "Error in fetching bookings")
            })
    }
}

export function getBookedService(serviceId) {
    return dispatch => {
        if (serviceId != undefined) {
            let idsCloneData = { serviceId: serviceId }
            var options = {
                method: 'POST',
                url: `${baseURL.baseURL}/getNearbyShopServices/NearbyAllShopServicesGetWithId/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: idsCloneData
            }
            axios(options)
                .then(result => {
                    let bookedService = result.data.data
                    // console.log(bookedService, "Fetch_Booked_Services")
                    dispatch({ type: ActionTypes.FETCHED_BOOKED_SERVICE, payload: bookedService })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                })
        }
        else {
            dispatch({ type: ActionTypes.FETCHED_BOOKED_SERVICE, payload: [] })
        }
    }
}

export function getBookedPackage(packageId) {
    return dispatch => {
        if (packageId != undefined) {
            let idsCloneData = { packageId: packageId }
            var options = {
                method: 'POST',
                url: `${baseURL.baseURL}/getNearbyShopServices/PackageFindWithId/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: idsCloneData
            }
            axios(options)
                .then(result => {
                    let bookedPackage = result.data.data
                    // console.log(bookedPackage, "Fetch_Booked_Package")
                    dispatch({ type: ActionTypes.FETCHED_BOOKED_PACKAGE, payload: bookedPackage })
                })
                .catch(err => {
                    let error = JSON.parse(JSON.stringify(err))
                    console.log(error, 'ERRROR', err)
                })
        }
        else {
            dispatch({ type: ActionTypes.FETCHED_BOOKED_PACKAGE, payload: [] })
        }
    }
}

export function cancledAndApproveBooking(bookingStatus, _id) {
    return dispatch => {
        console.log(bookingStatus, _id, "packageId")
        let statusClone = {
            bookingStatus: bookingStatus,
            _id: _id
        }
        var options = {
            method: 'POST',
            url: `${baseURL.baseURL}/bookings/cancleAndApproveBooking/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: statusClone
        }
        axios(options)
            .then(result => {
                let response = result.data.message
                // console.log(response, "Update_booking_status")
                swal.fire(
                    'Success!',
                    response,
                    'success'
                )
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
            })
    }
}

export function assignStylist(stylistId, _id) {
    return dispatch => {
        let objClone = {
            stylistId: stylistId,
            _id: _id
        }
        var options = {
            method: 'POST',
            url: `${baseURL.baseURL}/bookings/assignStylist/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: objClone
        }
        axios(options)
            .then(result => {
                let response = result.data.message
                // console.log(response, "Update_booking_status")
                swal.fire(
                    'Success!',
                    response,
                    'success'
                )
            })
            .catch(err => {
                let error = JSON.parse(JSON.stringify(err))
                console.log(error, 'ERRROR', err)
            })
    }
}

export function changePassword(email, password, rePassword) {
    return dispatch => {
        if (password === rePassword) {
            if (password.length >= 6) {
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
                    'Password must be minimum 6 characters.',
                    'error'
                )
            }

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
                localStorage.setItem('userProfile', JSON.stringify(data.data.user));
                dispatch({ type: ActionTypes.SAVE_USER, payload: data.data.user })
                swal.fire(
                    'Success!',
                    data.data.message,
                    'success'
                )
            }).catch((err) => {
                console.error(err, "ERROR_ON_SAVING")
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
        console.log(userID, "userID")
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

export function updateStylistImg(imgFile, _id, userId) {
    return dispatch => {
        console.log(imgFile, _id, userId, "DATA_INSIDE_ACTION")
        var bodyFormData = new FormData();
        bodyFormData.append('img', imgFile);
        bodyFormData.append('_id', _id);
        var options = {
            method: 'post',
            url: `${baseURL.baseURL}/signupadmin/addstylistimg/`,
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
                console.log(data.data, "stylist updated successfully.");
                let msg = data.data.message;
                dispatch(getStylists(userId))
                swal.fire(
                    'Success!',
                    msg,
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

// stylist images working
// export function uploadGallery(imgFile, stylistName) {
//     return dispatch => {
//         console.log(imgFile, stylistName, "DATA_INSIDE_ACTION_ADD_IMG")

//         var bodyFormData = new FormData();
//         bodyFormData.append('userId', Date.now() + "_" + stylistName);
//         for (var i = 0; i < imgFile.length; i++) {
//             bodyFormData.append("imgs", imgFile[i].originFileObj);
//         }
//         var options = {
//             method: 'post',
//             url: `${baseURL.baseURL}/servicesandgallery/addGalleryImages/`,
//             headers:
//             {
//                 'cache-control': 'no-cache',
//                 "Allow-Cross-Origin": '*',
//                 contentType: 'application/json',
//             },
//             data: bodyFormData
//         };
//         axios(options)
//             .then((data) => {
//                 console.log(data, "profile updated successfully.");
//                 swal.fire(
//                     'Success!',
//                     data.data.message,
//                     'success'
//                 )
//             }).catch((err) => {
//                 console.error(err, "ERROR_ON_SAVING")
//             })
//     }
// }

// export function updateGallery(oldImages, _id) {
//     return dispatch => {
//         console.log(oldImages, _id, "DATA_INSIDE_ACTION_UPDATE_IMG")
//         let fileData = []
//         let urlData = []
//         for (let index = 0; index < oldImages.length; index++) {
//             const element = oldImages[index];
//             if (element.originFileObj) {
//                 // console.log(element, "FILE")
//                 fileData.push(element)
//             }
//             else {
//                 // console.log(element, "URL")
//                 urlData.push(element.url)
//             }
//         }

//         var bodyFormData = new FormData();
//         // add user id
//         bodyFormData.append('userId', _id);
//         // add img files
//         for (var i = 0; i < fileData.length; i++) {
//             bodyFormData.append("imgs", fileData[i].originFileObj);
//         }
//         // add img url old imgs
//         for (var i = 0; i < urlData.length; i++) {
//             bodyFormData.append("oldImages", urlData[i]);
//         }

//         var options = {
//             method: 'post',
//             url: `${baseURL.baseURL}/servicesandgallery/updateGalleryImages/`,
//             headers:
//             {
//                 'cache-control': 'no-cache',
//                 "Allow-Cross-Origin": '*',
//                 contentType: 'application/json',
//             },
//             data: bodyFormData
//         };
//         axios(options)
//             .then((data) => {
//                 console.log(data, "Gallery updated successfully.");
//                 swal.fire(
//                     'Success!',
//                     data.data.message,
//                     'success'
//                 )
//             }).catch((err) => {
//                 console.error(err, "ERROR_ON_SAVING")
//             })


//     }
// }