import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { signupAction } from '../store/action/action';
import {
    Link
} from 'react-router-dom';
import Modal from 'react-responsive-modal';
import '../custom.css'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdDescription, MdLocalPhone, MdLock } from 'react-icons/md';
import { TiBusinessCard } from 'react-icons/ti';
import { GiWorld } from 'react-icons/gi';
import SimpleMap from '../components/googlemap';
import history from '../History';
import swal from 'sweetalert2';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            open: false,
            // email: 'abddullahshah123@gmail.com',
            // password: '123456',
            // about: 'Best developer in karachi',
            // businessName: 'Dot n Dot Graphics',
            // telephone: '+923452153709',
            // websiteUrl: 'nothing',
            // addressline1: 'R592-sector 8',
            // addressline2: '',
            email: '',
            password: '',
            about: '',
            businessName: '',
            telephone: '',
            websiteUrl: '',
            addressline1: '',
            addressline2: '',

        }
        this.signup = this.signup.bind(this);
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    signup() {
        const { email, password, about, businessName, telephone, websiteUrl, addressline1, addressline2 } = this.state;
        if (email !== '' && password !== '' && about !== '' && businessName !== '' && telephone !== '' && addressline1 !== '') {
            this.setState({
                loader: !this.state.loader
            })
            let user = {
                email: email,
                password: password,
                about: about,
                businessName: businessName,
                telePhone: telephone,
                websiteUrl: websiteUrl,
                addressLine1: addressline1,
                addressLine2: addressline2,
                // latitude: "24.5",
                // longitude: "63.4",

                location: {
                    type: "Point",
                    coordinates: [24.8825, 67.0694] //bahadrabad lat long
                    // coordinates: [24.8960, 67.0814] //national statium lat long
                    // coordinates: [24.9814 67.0543] //national statium lat long

                },

                createdAt: new Date().getTime()

            }
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
                    console.log(data.data, "USER_SIGN_UP_SUCCESSFULLY")
                    this.setState({
                        loader: !this.state.loader
                    })
                    swal.fire(
                        'Success!',
                        data.data.message,
                        'success'
                    )
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

    render() {
        const {
            open, email, password,
            about, businessName,
            telephone, websiteUrl,
            addressline1, addressline2,
            err, showerror, loader
        } = this.state;
        return (
            <div>
                <div style={{ display: "flex", flexBasis: "100%", backgroundColor: "#F7F8F8" }}>
                    <div style={{ display: "flex", flexBasis: "50%", }}>
                        <div style={{ flexBasis: "100%", marginTop: "10%" }}>
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

                                    {/* addressLine2 */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><FaMapMarkerAlt style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Address Line2" aria-label="Address Line2" aria-describedby="basic-addon1" value={addressline2} onChange={(e) => { this.setState({ addressline2: e.target.value }) }} />
                                    </div>

                                    <center>
                                        <div className="textLink" onClick={this.onOpenModal}>Shop Location
                                        </div>
                                    </center>

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
                            // height="90%"
                            height={window.innerHeight}
                        />
                    </div>

                    {/* modal */}
                    <div >
                        <Modal open={open} onClose={this.onCloseModal}>
                            <div style={{ marginTop: 20, }}>
                                Please Select your shop location
                                <span style={{ color: "white" }} >aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                                <SimpleMap />
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
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);
