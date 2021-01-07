import React, { Component } from 'react';
import { connect } from 'react-redux';
// router
import { Link } from 'react-router-dom';
import history from '../History';
import '../custom.css'
import axios from 'axios';
// antd design and sweet alert loader
import { message, Modal } from 'antd';
import "antd/dist/antd.css";
import Loader from 'react-loader-spinner'
import swal from 'sweetalert2';
// google api's
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
// icons
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdDescription, MdLocalPhone, MdLock } from 'react-icons/md';
import { TiBusinessCard } from 'react-icons/ti';
import { GiWorld } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';
import { updateWorkingHours } from '../store/action/action'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 7,
            address: '',
            loader: false,
            showerror: false,
            modalVisible: false,
            initialCenter: [54.992218402853496, -2.7072125843446315],
            markers: [
                {
                    name: "Current position",
                    position: {
                        //karachi
                        // lat: 24.9372,
                        // lng: 67.0423,
                        //UK
                        lat: 54.992218402853496,
                        lng: -2.7072125843446315
                    }
                }
            ],
            email: '',
            password: '',
            about: '',
            businessName: '',
            businessType: '',
            telephone: '',
            websiteUrl: '',
            addressline1: '',
            addressline2: '',

            // email: 'mynameisabdullah1@hotmail.com',
            // password: '123456',
            // about: 'test',
            // businessName: 'Saad cutz',
            // businessType: 'Saloon',
            // telephone: '03452153709',
            // websiteUrl: 'test.com',
            // addressline1: '786',
            // addressline2: '786',
        }
        this.signup = this.signup.bind(this);
    }

    setModalVisible = (modalVisible) => {
        this.setState({ modalVisible: modalVisible });
    }

    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        // console.log(lat, lng, latLng, "onMarkerDragEnd")
        this.setState(prevState => {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], position: { lat, lng } };
            return { markers };
        });
    };

    signup() {
        const { email, password, about, businessName, businessType, telephone, websiteUrl, addressline1, addressline2, markers } = this.state;
        if (email !== '' && password !== '' && about !== '' && businessName !== '' && businessType !== '' && telephone !== '' && addressline1 !== '' && addressline2 !== '') {
            if (password.length >= 6) {
                this.setState({
                    loader: !this.state.loader
                })
                let user = {
                    email: email,
                    password: password,
                    about: about,
                    businessName: businessName,
                    businessType: businessType,
                    telePhone: telephone,
                    websiteUrl: websiteUrl,
                    addressLine1: addressline1,
                    addressLine2: addressline2,
                    location: {
                        type: "Point",
                        coordinates: [markers[0].position.lat, markers[0].position.lng] //current location
                        // coordinates: [24.8825, 67.0694] //bahadrabad lat long
                        // coordinates: [24.8960, 67.0814] //national statium lat long
                        // coordinates: [24.9814 67.0543] //national statium lat long
                    },
                    createdAt: new Date().getTime()
                }
                console.log(user, "USER_")
                var options = {
                    method: 'POST',
                    url: `${this.props.bseUrl}/signupadmin/`,
                    headers:
                    {
                        'cache-control': 'no-cache',
                        "Allow-Cross-Origin": '*',
                    },
                    data: user
                };
                axios(options)
                    .then((data) => {
                        console.log(data.data.result._id, "USER_SIGN_UP_SUCCESSFULLY")
                        this.setState({
                            loader: !this.state.loader
                        })
                        swal.fire(
                            'Success!',
                            data.data.message,
                            'success'
                        )
                        let updateTimeObject = {
                            monday: { day: 'Monday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
                            tuesday: { day: 'Tuesday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
                            wednesday: { day: 'Wednesday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
                            thursday: { day: 'Thursday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
                            friday: { day: 'Friday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
                            saturday: { day: 'Saturday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
                            sunday: { day: 'Sunday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
                            userID: data.data.result._id,
                        };
                        this.props.updateWorkingHours(updateTimeObject, true);
                        history.push("Signin")
                    }).catch((err) => {
                        console.log(err.response.data.message, "ERROR_ON_SIGN_UP")
                        // alert(err.response.data.message)
                        this.setState({
                            loader: !this.state.loader,
                            err: err.response.data.message,
                            showerror: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    showerror: false
                                })
                            }, 10000)
                        })
                    })


            }
            else {
                this.setState({
                    err: "Password must be minimum 6 characters.",
                    showerror: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            showerror: false
                        })
                    }, 10000)
                })
            }
        }
        else {
            this.setState({
                err: "All fields are required",
                showerror: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        showerror: false
                    })
                }, 10000)
            })
        }
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                var points = [
                    { lat: latLng.lat, lng: latLng.lng },
                ]
                var bounds = new this.props.google.maps.LatLngBounds();
                for (var i = 0; i < points.length; i++) {
                    bounds.extend(points[i]);
                }
                let markers = [
                    {
                        name: "Current position",
                        position: {
                            lat: latLng.lat,
                            lng: latLng.lng
                        }
                    }
                ]
                this.setState({
                    address: address,
                    markers: markers,
                    initialCenter: [latLng.lat, latLng.lng],
                    bounds: bounds
                })
            })
            .catch(error => console.error('Error', error));
    };

    handleMenuClick(e) {
        message.info(e);
        this.setState({ businessType: e })
    }

    render() {
        const {
            email, password, about, businessName, businessType,
            telephone, websiteUrl, addressline1,
            addressline2, err, showerror, loader,
        } = this.state;
        return (
            <div>
                <div style={{ display: "flex", flexBasis: "100%", backgroundColor: "#F7F8F8" }}>
                    <div style={{ display: "flex", flexBasis: "50%", }}>
                        <div style={{ flexBasis: "100%", marginTop: "5%" }}>
                            <center>
                                <div style={{ width: "50%", }} className="center">
                                    <h2 className="input-group mb-6 inputCenter" >Signup</h2>


                                    {/* Email */}
                                    <div className="input-group mb-3" style={{ marginTop: 20 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdEmail style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>

                                    {/* Password */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdLock style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    </div>

                                    {/* About */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdDescription style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="About" aria-label="About" aria-describedby="basic-addon1" value={about} onChange={(e) => { this.setState({ about: e.target.value }) }} />
                                    </div>

                                    {/* BusinessName */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><TiBusinessCard style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Business Name" aria-label="Business Name" aria-describedby="basic-addon1" value={businessName} onChange={(e) => { this.setState({ businessName: e.target.value }) }} />
                                    </div>

                                    {/* Business type */}
                                    <div style={{ marginTop: 10, display: "flex", flexDirection: "row", background: "white", border: '1px solid #CED4DA', }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><TiBusinessCard style={{ color: "white" }} /></span>
                                        </div>
                                        <div class="dropdown"
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                marginLeft: "2.5%",
                                                width: "85%",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                            <div style={{ fontSize: 15 }}>
                                                {
                                                    businessType != '' ? businessType : "Business Type"
                                                }
                                            </div>
                                            <div
                                                style={{
                                                    height: 38,
                                                    display: "flex",
                                                    color: "black",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // background: "red"
                                                }}>

                                                <FiChevronDown />
                                            </div>

{/* - Salons
- Barbershop
- Beauty Salons, Spas & Other
- Salons + Beauty Salons, Spas & Other
- Barbershop + Salon
- Barbershop + Beauty Salons, Spas & Other
- Salons + Barbershop + Spa/Other */}


                                            <div style={{ width: "100%", marginTop: "100%", zIndex: 10 }} class="dropdown-content">
                                                <a style={{ display: "flex", }} onClick={() => { this.handleMenuClick("Salons") }} >Salons</a>
                                                <a style={{ display: "flex", }} onClick={() => { this.handleMenuClick("Barbershop") }}>Barbershop</a>
                                                <a style={{ display: "flex", }} onClick={() => { this.handleMenuClick("Beauty Salons, Spas & Other") }} >Beauty Salons, Spas & Other</a>
                                                <a style={{ display: "flex", }} onClick={() => { this.handleMenuClick("Salons + Beauty Salons, Spas & Other") }} >Salons + Beauty Salons, Spas & Other</a>
                                                <a style={{ display: "flex", }} onClick={() => { this.handleMenuClick("Barbershop + Salon") }}>Barbershop + Salon</a>
                                                <a style={{ display: "flex", }} onClick={() => { this.handleMenuClick("Barbershop + Beauty Salons, Spas & Other") }}>Barbershop + Beauty Salons, Spas & Other</a>
                                                <a style={{ display: "flex", }} onClick={() => { this.handleMenuClick("Salons + Barbershop + Spa/Other") }} >Salons + Barbershop + Spa/Other</a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* telePhone */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdLocalPhone style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="TelePhone" aria-label="TelePhone" aria-describedby="basic-addon1" value={telephone} onChange={(e) => { this.setState({ telephone: e.target.value }) }} />
                                    </div>

                                    {/* websiteUrl */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><GiWorld style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Website Url" aria-label="Website Url" aria-describedby="basic-addon1" value={websiteUrl} onChange={(e) => { this.setState({ websiteUrl: e.target.value }) }} />
                                    </div>

                                    {/* addressLine1 */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><FaMapMarkerAlt style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Address Line1" aria-label="Address Line1" aria-describedby="basic-addon1" value={addressline1} onChange={(e) => { this.setState({ addressline1: e.target.value }) }} />
                                    </div>

                                    {/* post code */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><FaMapMarkerAlt style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Post code" aria-label="Post code" aria-describedby="basic-addon1" value={addressline2} onChange={(e) => { this.setState({ addressline2: e.target.value }) }} />
                                    </div>

                                    {/* google map */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}>
                                                <img alt="googleMap" src={require('../assets/googlemapicon.png')}
                                                    width={20}
                                                    height={20}
                                                />
                                            </span>
                                        </div>
                                        <div className="form-control" >
                                            <div className="textLink" style={{ textAlign: "left", color: "grey" }} onClick={() => this.setModalVisible(true)}>Shop Location
                                        </div>
                                        </div>
                                    </div>

                                    {
                                        (loader) ?
                                            (<div>
                                                <Loader type="ThreeDots" color="#EC5F59" height={40} width={40} />
                                            </div>)
                                            : <button className="button" style={{ marginTop: 10, }} onClick={this.signup} >
                                                <span className="buttonmatter">Signup</span>
                                            </button>
                                    }

                                    {
                                        (showerror) ? (
                                            <div style={{ color: "red", marginTop: 12 }}>{err}</div>
                                        ) : null
                                    }

                                    <br /><br />
                                    <center>
                                        <div className="textLink"> <Link to='/signin'>Already have an account? <span style={{ color: "#EC5F59" }}>Sign in</span></Link>
                                        </div>
                                    </center>
                                </div>
                            </center>
                        </div>
                    </div >

                    <div style={{ display: "flex", flexBasis: "50%", }}>
                        <img alt="BackGroundImage" src={require('../assets/signinBackground.png')}
                            width="100%"
                            height={window.innerHeight}
                        />
                    </div>

                    {/* modal */}
                    <div>
                        <Modal
                            footer={null}
                            // centered
                            visible={this.state.modalVisible}
                            onOk={() => { this.setModalVisible(false) }}
                            onCancel={() => this.setModalVisible(false)}
                            bodyStyle={{ padding: 0, }}
                            width={"60%"}
                            minWidth={"60%"}
                        >
                            <div>
                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div style={{ padding: "1%", }}>
                                            Please Select your shop location
                                            <input style={{ marginLeft: "3%", width: "40%", borderWidth: 0.1 }}
                                                {...getInputProps({
                                                    placeholder: 'Search Places Please type location name...',
                                                    className: 'location-search-input',
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container" >
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div {...getSuggestionItemProps(suggestion, { className, style, })}>
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>

                                <Map
                                    initialCenter={{
                                        //karachi
                                        // lat: 24.9372,
                                        // lng: 67.0423,
                                        //uk
                                        // lat: 54.992218402853496,
                                        // lng: -2.7072125843446315,
                                        lat: this.state.initialCenter[0],
                                        lng: this.state.initialCenter[1]
                                    }}
                                    google={this.props.google}
                                    bounds={this.state.bounds}
                                    style={{ width: '100%', height: 500, position: 'relative', margin: "0px auto" }}
                                    zoom={this.state.zoom}
                                >
                                    {this.state.markers.map((marker, index) => (
                                        <Marker key={index}
                                            position={marker.position}
                                            draggable={true}
                                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                                            name={marker.name}
                                        />
                                    ))}
                                </Map>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        updateWorkingHours: (workingHours, autoAdd) => {
            dispatch(updateWorkingHours(workingHours, autoAdd));
        }
    })
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk")
})(connect(mapStateToProp, mapDispatchToProp)(Signup))