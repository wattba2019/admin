import React, { Component, ReactDOM, mountNode } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdDescription, MdLocalPhone, MdLock } from 'react-icons/md';
import { TiBusinessCard } from 'react-icons/ti';
import { GiWorld } from 'react-icons/gi';
import SimpleMap from '../components/googlemap';
import history from '../History';
import { changePassword, updateProfile, } from "../store/action/action";
import { Form, Input, Checkbox, Modal } from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';

class ShopProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showerror: false,
            showerrorpassword: false,
            email: '',
            password: '',
            confirmPassword: '',
            about: '',
            businessName: '',
            telephone: '',
            websiteUrl: '',
            addressline1: '',
            addressline2: '',
            modalVisible: false,
            markers: [
                {
                    name: "Current position",
                    position: {
                        lat: null,
                        lng: null,
                    }
                }
            ],

        }
    }

    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        console.log(lat, lng, latLng, "onMarkerDragEnd")
        this.setState(prevState => {
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], position: { lat, lng } };
            return { markers };
        });
    };

    setModalVisible = (modalVisible) => {
        this.setState({ modalVisible: modalVisible });
    }

    componentDidMount() {
        let userData = this.props.userProfile
        console.log(userData, "USER_DATA_IN_PROFILE")
        if (userData != undefined) {
            let markers = [{
                name: "Current position",
                position: {
                    lat: userData.location.coordinates[0],
                    lng: userData.location.coordinates[1],
                }
            }]

            this.setState({
                email: userData.email,
                about: userData.about,
                businessName: userData.businessName,
                telephone: userData.telePhone,
                websiteUrl: userData.websiteUrl,
                addressline1: userData.addressLine1,
                addressline2: userData.addressLine2,
                markers: markers
            })
        }
        // else {
        //     history.push('Signin')
        // }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.userProfile, "USER_DATA_IN_PROFILE_NEXT_PROPS")
        if (nextProps.userProfile) {
            let markers = [{
                name: "Current position",
                position: {
                    lat: nextProps.userProfile.location.coordinates[0],
                    lng: nextProps.userProfile.location.coordinates[1],
                }
            }]
            this.setState({
                email: nextProps.userProfile.email,
                about: nextProps.userProfile.about,
                businessName: nextProps.userProfile.businessName,
                telephone: nextProps.userProfile.telePhone,
                websiteUrl: nextProps.userProfile.websiteUrl,
                addressline1: nextProps.userProfile.addressLine1,
                addressline2: nextProps.userProfile.addressLine2,
                markers: markers,
            })
        }
    }

    changePassword = () => {
        const { email, password, confirmPassword } = this.state
        if (email !== '' && password !== '' && confirmPassword) {
            this.props.changePassword(email, password, confirmPassword)
            this.setState({
                password: '',
                confirmPassword: '',
            })
        }
        else {
            this.setState({
                err: "Please type password",
                showerrorpassword: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        showerrorpassword: false
                    })
                }, 10000)
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', err, values);
                this.changePassword()
            }
        });
    };

    updateProfileData = () => {
        const { email, about, businessName, telephone, websiteUrl, addressline1, addressline2, markers } = this.state
        if (email !== '' && about !== '' && businessName !== '' && telephone !== '' && addressline1 !== '' && addressline2 !== "") {
            let cloneUpdatedUser = {
                email: email,
                about: about,
                businessName: businessName,
                telePhone: telephone,
                websiteUrl: websiteUrl,
                addressLine1: addressline1,
                addressLine2: addressline2,
                _id: this.props.userProfile._id,
                location: {
                    type: "Point",
                    coordinates: [markers[0].position.lat, markers[0].position.lng]
                },
            }
            this.props.updateProfile(cloneUpdatedUser)
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
            // .then(latLng => console.log('Success', latLng));
            .then(latLng => {
                var points = [
                    { lat: latLng.lat, lng: latLng.lng },
                ]
                var bounds = new this.props.google.maps.LatLngBounds();
                for (var i = 0; i < points.length; i++) {
                    bounds.extend(points[i]);
                }
                console.log(bounds, "bounds")
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
                    // initialCenter: [latLng.lat, latLng.lng],
                    bounds: bounds
                })
            })
            .catch(error => console.error('Error', error));
    };


    render() {
        const { email, password, confirmPassword, about, businessName, telephone, websiteUrl, addressline1, addressline2, showerror, err, showerrorpassword, markers } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{
                display: "flex", width: "100%", justifyContent: "center", alignItems: "center",
                background: "#F7F8F8",
            }}>
                <div style={{
                    display: "flex", width: "55%", minWidth: 500, height: window.innerHeight, justifyContent: "center",
                    background: "#F7F8F8"
                }}>
                    <div style={{ width: "50%", marginTop: "5%" }} className="center">
                        <h5 className="input-group mb-6 inputCenter"  >Wattba Shop Profile</h5>

                        {/* Email */}
                        <div className="input-group mb-3" style={{ marginTop: 20 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdEmail style={{ color: "white", }} /></span>
                            </div>
                            <input required type="text" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        </div>

                        {/* About */}
                        <div className="input-group mb-3" style={{ marginTop: 10 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdDescription style={{ color: "white", }} /></span>
                            </div>
                            <input required type="text" className="form-control" placeholder="About" aria-label="About" aria-describedby="basic-addon1" value={about} onChange={(e) => { this.setState({ about: e.target.value }) }} />
                        </div>

                        {/* BusinessName */}
                        <div className="input-group mb-3" style={{ marginTop: 10 }}>
                            <div className="input-group-prepend">
                                <span required className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><TiBusinessCard style={{ color: "white", }} /></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Business Name" aria-label="Business Name" aria-describedby="basic-addon1" value={businessName} onChange={(e) => { this.setState({ businessName: e.target.value }) }} />
                        </div>

                        {/* telePhone */}
                        <div className="input-group mb-3" style={{ marginTop: 10 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdLocalPhone style={{ color: "white", }} /></span>
                            </div>
                            <input required type="text" className="form-control" placeholder="TelePhone" aria-label="TelePhone" aria-describedby="basic-addon1" value={telephone} onChange={(e) => { this.setState({ telephone: e.target.value }) }} />
                        </div>

                        {/* websiteUrl */}
                        <div className="input-group mb-3" style={{ marginTop: 10 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><GiWorld style={{ color: "white", }} /></span>
                            </div>
                            <input required type="text" className="form-control" placeholder="Website Url" aria-label="Website Url" aria-describedby="basic-addon1" value={websiteUrl} onChange={(e) => { this.setState({ websiteUrl: e.target.value }) }} />
                        </div>

                        {/* addressLine1 */}
                        <div className="input-group mb-3" style={{ marginTop: 10 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><FaMapMarkerAlt style={{ color: "white", }} /></span>
                            </div>
                            <input required type="text" className="form-control" placeholder="Address Line1" aria-label="Address Line1" aria-describedby="basic-addon1" value={addressline1} onChange={(e) => { this.setState({ addressline1: e.target.value }) }} />
                        </div>

                        {/* Post code */}
                        <div className="input-group mb-3" style={{ marginTop: 10 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><FaMapMarkerAlt style={{ color: "white", }} /></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Post code" aria-label="Post code" aria-describedby="basic-addon1" value={addressline2} onChange={(e) => { this.setState({ addressline2: e.target.value }) }} />
                        </div>

                        {/*                         
                         <center>
                            <div className="textLink" onClick={() => this.setModalVisible(true)}>Shop Location
                            </div>
                        </center>
                         */}

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


                        {/* update */}
                        <div style={{ display: "flex", flex: 1, marginTop: 15 }} >
                            <button htmlType="submit" className="button" style={{ marginTop: 10, width: "100%" }}
                                onClick={this.updateProfileData} >
                                <span className="buttonmatter">Update Profile</span>
                            </button>
                        </div>

                        <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center", marginTop: 15 }} >
                            {
                                (showerror) ? (
                                    <div style={{ color: "red", marginTop: 12 }}>{err}</div>
                                ) : null
                            }
                        </div>

                    </div>
                </div>

                <div className="cardshadowcenter" style={{
                    display: "flex", width: "45%", minWidth: 400, flexDirection: "column", background: "white", justifyContent: "flex-end", alignItems: "flex-end",
                    height: window.innerHeight,
                }}>

                    <img alt="BackGroundImage" src={require('../assets/logo.png')} style={{ marginRight: "4%", marginTop: "0.5%" }}
                        width="140"
                        height="7%"
                    />
                    <div style={{
                        display: "flex", flex: 1,
                        width: "100%",
                        // background: "red"
                    }}>
                        <center>
                            <div style={{ width: "100%", marginLeft: "40%", marginTop: 20, justifyContent: "center", alignItems: "flex-start" }} className="center">
                                <h6 className="input-group mb-6 inputCenter" >Change Password</h6>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('Password', {
                                            rules: [{ required: true, message: 'Please type password!' }],
                                            rules: [{ max: 6, message: 'Password must be maximum 6 characters.' },],
                                        })(
                                            <div style={{ display: "flex", flex: 1, marginTop: 20, width: 250 }} >
                                                <input type="password" className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                            </div>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('ConfirmPassword', {
                                            rules: [{ required: true, message: 'Please type password!' }],
                                            rules: [{ max: 6, message: 'Password must be maximum 6 characters.' },],
                                        })(
                                            <div style={{ display: "flex", flex: 1, marginTop: 0, width: 250 }} >
                                                <input type="password" className="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" value={confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                                            </div>
                                        )}
                                    </Form.Item>

                                    <div style={{ display: "flex", flex: 1, marginTop: 15 }} >
                                        <button htmlType="submit" className="button" style={{ marginTop: 10, width: "70%" }} >
                                            <span className="buttonmatter">Change Password</span>
                                        </button>
                                    </div>

                                    <div style={{ display: "flex", flex: 1, marginTop: 0 }} >
                                        <span style={{ marginTop: 0, width: "70%" }} >
                                            {
                                                (showerrorpassword) ? (
                                                    <div style={{ color: "red", marginTop: 12 }}>{err}</div>
                                                ) : null
                                            }
                                        </span>
                                    </div>

                                </Form>
                            </div>
                        </center>
                    </div>


                    <div>
                        <Modal
                            footer={null}
                            // centered
                            visible={this.state.modalVisible}
                            onOk={() => { this.setModalVisible(false) }}
                            onCancel={() => this.setModalVisible(false)}
                            bodyStyle={{ padding: 0 }}
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

                                {/* Please Select your shop location */}
                                <Map
                                    initialCenter={{
                                        lat: markers[0].position.lat,
                                        lng: markers[0].position.lng,
                                    }}
                                    apiKey={("AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk")}
                                    google={this.props.google}
                                    bounds={this.state.bounds}
                                    style={{ width: '100%', height: 500, position: 'relative', margin: "0px auto" }}
                                    zoom={7}
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
            </div >
        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        userProfile: state.root.userProfile,
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        changePassword: (data1, data2, data3) => {
            dispatch(changePassword(data1, data2, data3));
        },
        updateProfile: (data1) => {
            dispatch(updateProfile(data1));
        },

    })
}


const WrappedShopProfile = Form.create({ name: 'profile' })(ShopProfile);
// ReactDOM.render(<WrappedShopProfile />, mountNode);
// export default connect(mapStateToProp, mapDispatchToProp)(WrappedShopProfile);
// export default WrappedShopProfile




export default GoogleApiWrapper({
    apiKey: ("AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk")
})(connect(mapStateToProp, mapDispatchToProp)(WrappedShopProfile))