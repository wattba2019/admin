import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword, updateProfile, uploadGallery, updateGallery, getGallery } from "../store/action/action";
import '../custom.css'
import { Modal, Upload, Icon, message, Form, } from "antd";
import "antd/dist/antd.css";
// icons
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdDescription, MdLocalPhone } from 'react-icons/md';
import { TiBusinessCard } from 'react-icons/ti';
import { GiWorld } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';
import SimpleMap from '../components/googlemap';
import history from '../History';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
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
            businessType: '',
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
            gArr: [],
            // fileList: [],
            // fileList: [
            //     {
            //         uid: 1,
            //         name: 'image.png',
            //         status: 'done',
            //         url: "https://fathomless-citadel-43321.herokuapp.com/servicesandgallery/1605290929626_IMG-20200903-WA0004.jpg"
            //     },
            //     {
            //         uid: 2,
            //         name: 'image.png',
            //         status: 'done',
            //         url: "https://fathomless-citadel-43321.herokuapp.com/servicesandgallery/1605290929626_IMG-20200903-WA0004.jpg"
            //     },
            //     {
            //         uid: 3,
            //         name: 'image.png',
            //         status: 'done',
            //         url: "https://fathomless-citadel-43321.herokuapp.com/servicesandgallery/1605290929626_IMG-20200903-WA0004.jpg"
            //     },
            //     {
            //         uid: 4,
            //         name: 'image.png',
            //         status: 'done',
            //         url: "https://fathomless-citadel-43321.herokuapp.com/servicesandgallery/1605290929626_IMG-20200903-WA0004.jpg"
            //     },
            // ],
            errUploadImgLimit: false,
            previewImage: '',
            flag: false

        }
        this.props.getGallery(this.props.uid);
    }

    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
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
                businessType: userData.businessType,
                telephone: userData.telePhone,
                websiteUrl: userData.websiteUrl,
                addressline1: userData.addressLine1,
                addressline2: userData.addressLine2,
                markers: markers
            })
        }
        // this.props.getGallery(this.props.uid);
    }


    beforeUploadEvent(file, fileList) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Image must smaller than 10MB!');
        }
        return false;
    }

    uploadGallery = () => {
        const { gArr } = this.state
        let fileList = this.state.fileList
        if (gArr.length === 0) {
            this.props.uploadGallery(fileList, this.props.userProfile._id)
        }
        else {
            this.props.updateGallery(fileList, this.props.userProfile._id)
        }
        this.setState({
            fileList: [],
            gArr: [],
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.gallery.length != 0) {
            let arr = []
            for (var i = 0; i < nextProps.gallery.length; i++) {
                const element = nextProps.gallery[i];
                const obj = {
                    uid: i,
                    name: 'image.png',
                    status: 'done',
                    url: element,
                }
                arr.push(obj)
                console.log(element, "nextProps_gallery")
            }
            this.setState({
                fileList: arr,
                gArr: arr,
                flag: !this.state.flag
            })

            console.log(nextProps.gallery, "nextProps_gallery")
        }

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
                businessType: nextProps.userProfile.businessType,
                telephone: nextProps.userProfile.telePhone,
                websiteUrl: nextProps.userProfile.websiteUrl,
                addressline1: nextProps.userProfile.addressLine1,
                addressline2: nextProps.userProfile.addressLine2,
                markers: markers,
            })
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.userProfile) {
    //         let markers = [{
    //             name: "Current position",
    //             position: {
    //                 lat: nextProps.userProfile.location.coordinates[0],
    //                 lng: nextProps.userProfile.location.coordinates[1],
    //             }
    //         }]
    //         this.setState({
    //             email: nextProps.userProfile.email,
    //             about: nextProps.userProfile.about,
    //             businessName: nextProps.userProfile.businessName,
    //             businessType: nextProps.userProfile.businessType,
    //             telephone: nextProps.userProfile.telePhone,
    //             websiteUrl: nextProps.userProfile.websiteUrl,
    //             addressline1: nextProps.userProfile.addressLine1,
    //             addressline2: nextProps.userProfile.addressLine2,
    //             markers: markers,
    //         })
    //     }
    // }

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
                this.changePassword()
            }
        });
    };

    updateProfileData = () => {
        const { email, about, businessName, businessType, telephone, websiteUrl, addressline1, addressline2, markers } = this.state
        if (email !== '' && about !== '' && businessName !== '' && businessType != '' && telephone !== '' && addressline1 !== '' && addressline2 !== "") {
            let cloneUpdatedUser = {
                email: email,
                about: about,
                businessName: businessName,
                businessType: businessType,
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
        const { email, password, confirmPassword, about, businessName, businessType, telephone, websiteUrl, addressline1, addressline2, showerror, err, showerrorpassword, markers, fileList, errUploadImgLimit, } = this.state;
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type="plus" />
            </div>
        );
        console.log(fileList, this.state.flag, "fileList_")
        return (
            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", background: "#F7F8F8", }}>
                <div style={{ display: "flex", width: "55%", minWidth: 500, height: window.innerHeight, justifyContent: "center", background: "#F7F8F8" }}>
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
                        {/* Business type */}
                        <div style={{ marginTop: 10, display: "flex", flexDirection: "row", background: "white", border: '1px solid #CED4DA', }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><TiBusinessCard style={{ color: "white" }} /></span>
                            </div>
                            <div className="dropdown"
                                style={{ display: "flex", flexDirection: "row", marginLeft: "2.5%", width: "85%", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ fontSize: 15 }}>
                                    {businessType}
                                </div>
                                <div style={{ height: 38, display: "flex", color: "black", justifyContent: "center", alignItems: "center" }}>
                                    <FiChevronDown />
                                </div>
                                <div style={{ width: "100%", marginTop: "100%", zIndex: 10 }} className="dropdown-content">
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
                        {/* google map */}
                        <div className="input-group mb-3" style={{ marginTop: 10 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}>
                                    <img
                                        alt="googleMap"
                                        src={require('../assets/googlemapicon.png')}
                                        width={20}
                                        height={20}
                                    />
                                </span>
                            </div>
                            <div className="form-control" >
                                <div className="textLink" style={{ textAlign: "left", color: "grey" }} onClick={() => this.setModalVisible(true)}>
                                    Shop Location
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

                <div className="cardshadowcenter" style={{ display: "flex", width: "45%", minWidth: 400, flexDirection: "column", background: "white", justifyContent: "flex-end", alignItems: "flex-end", height: window.innerHeight, }}>
                    <img
                        alt="BackGroundImage"
                        src={require('../assets/logo.png')}
                        style={{ marginRight: "4%", marginTop: "0.5%" }}
                        width="140"
                        height="7%" />

                    <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", }}>
                        <div style={{ display: "flex", flex: 1, width: "100%", }}>
                            <center>
                                <div style={{ width: "100%", marginLeft: "15%", marginTop: 20, justifyContent: "center", alignItems: "flex-start" }} className="center">
                                    <h6 className="input-group mb-6 inputCenter" >Change Password</h6>
                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                        <Form.Item>
                                            {getFieldDecorator('Password', {
                                                // rules: [{ required: true, message: 'Please type password!' }],
                                                // rules: [{ min: 6, message: 'Password must be minimum 6 characters.' },],
                                            })(
                                                <div style={{ display: "flex", flex: 1, marginTop: 20, width: 250 }} >
                                                    <input type="password" className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                </div>
                                            )}
                                        </Form.Item>

                                        <Form.Item>
                                            {getFieldDecorator('ConfirmPassword', {
                                                // rules: [{ required: true, message: 'Please type password!' }],
                                                // rules: [{ min: 6, message: 'Password must be minimum 6 characters.' },],
                                            })(
                                                <div style={{ display: "flex", flex: 1, marginTop: 10, width: 250 }} >
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

                        <div style={{ display: "flex", flex: 1.6, width: "100%", }}>
                            {/* 3rd card */}
                            <div style={{ display: "flex", flexDirection: "column", flex: 3, padding: "2.5%", }}>
                                <div style={{ display: "flex", flex: 10, flexDirection: "column", }}>
                                    <div style={{ fontSize: 18, marginRight: 20 }}>
                                        Gallery
                                    </div>
                                    {
                                        (errUploadImgLimit != false) ? (
                                            <div style={{ fontSize: 10, marginRight: 20, color: "red" }}>
                                                You can not upload more then 12 picture.
                                            </div>
                                        ) : <div style={{ fontSize: 10, marginRight: 20, color: "grey" }}>
                                                You can add 12 picture in Gallery.
                                        </div>
                                    }

                                    {
                                        (fileList) ? (
                                            <div className="clearfix" style={{ marginTop: 10, }}>
                                                <Upload
                                                    showUploadList={{ showPreviewIcon: false }}
                                                    defaultFileList={fileList}
                                                    action=""
                                                    listType={'picture-card'}
                                                    multiple={false}
                                                    onChange={(info) => {
                                                        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png' || (info.file.url);
                                                        if (!isJpgOrPng) {
                                                            this.setState({ fileList: [] })
                                                        } else {
                                                            if (info.fileList.length <= 12 && fileList.length <= 12) {
                                                                this.setState({
                                                                    fileList: info.fileList,
                                                                    errUploadImgLimit: false
                                                                })
                                                            }
                                                            else {
                                                                this.setState({
                                                                    fileList: [],
                                                                    errUploadImgLimit: true
                                                                })
                                                            }
                                                        }
                                                    }}
                                                    beforeUpload={this.beforeUploadEvent.bind(this)}
                                                >
                                                    {fileList.length >= 12 ? null : uploadButton}
                                                </Upload>

                                            </div>
                                        ) : <div style={{ fontSize: 10, marginRight: 20, color: "red" }}>Loading</div>
                                    }

                                </div>
                                <div style={{ display: "flex", flex: 1, flexDirection: "column", marginLeft: "3%", }}>
                                    {/* <button className="buttonAdd" style={{ minWidth: 140, width: "32%", height: 35, margin: "1%", }}
                                        onClick={() => this.uploadGallery()}>
                                        <span className="buttonmatter" style={{ fontSize: 15, }}>{'Save Gallery'}</span>
                                    </button> */}

                                    <div style={{ display: "flex", flex: 1, marginTop: 15 }} >
                                        <button
                                            className="button"
                                            onClick={() => this.uploadGallery()}
                                            style={{ marginTop: 10, width: "100%" }} >
                                            <span className="buttonmatter">Save Gallery</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Modal
                            footer={null}
                            visible={this.state.modalVisible}
                            onOk={() => { this.setModalVisible(false) }}
                            onCancel={() => this.setModalVisible(false)}
                            bodyStyle={{ padding: 0 }}
                            width={"60%"}
                            minWidth={"60%"}>
                            <div>
                                <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}>
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
                                    zoom={7}>
                                    {this.state.markers.map((marker, index) => (
                                        <Marker key={index}
                                            position={marker.position}
                                            draggable={true}
                                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                                            name={marker.name} />
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
        uid: state.root.userProfile._id,
        gallery: state.root.gallery,
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
        uploadGallery: (data, id) => {
            dispatch(uploadGallery(data, id));
        },
        updateGallery: (data, id) => {
            dispatch(updateGallery(data, id));
        },
        getGallery: (userId) => {
            dispatch(getGallery(userId));
        },
    })
}

const WrappedShopProfile = Form.create({ name: 'profile' })(ShopProfile);
export default GoogleApiWrapper({
    apiKey: ("AIzaSyBQHKZTwhPJX_9IevM5jKC8kmz0NzqAaBk")
})(connect(mapStateToProp, mapDispatchToProp)(WrappedShopProfile))