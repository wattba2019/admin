import React, { Component, } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail, MdDescription, MdLocalPhone, MdLock } from 'react-icons/md';
import { TiBusinessCard } from 'react-icons/ti';
import { GiWorld } from 'react-icons/gi';
import SimpleMap from '../components/googlemap';

class ShopProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            about: '',
            businessName: '',
            telephone: '',
            websiteUrl: '',
            addressline1: '',
            addressline2: '',
        }
    }

    render() {
        const { email, password, confirmPassword, about, businessName, telephone, websiteUrl, addressline1, addressline2 } = this.state;

        return (
            <div style={{
                display: "flex", width: "100%", justifyContent: "center", alignItems: "center",
                background: "#F7F8F8",
            }}>
                <div style={{
                    display: "flex", width: "55%", minWidth: 500, height: window.innerHeight, justifyContent: "center",
                    background: "#F7F8F8"
                }}>


                    <div style={{ width: "50%", marginTop: "10%" }} className="center">
                        <h5 className="input-group mb-6 inputCenter"  >Wattba Shop Profile</h5>

                        {/* Email */}
                        <div className="input-group mb-3" style={{ marginTop: 20 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdEmail style={{ color: "white", }} /></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
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

                        {/* addressLine2 */}
                        <div style={{ display: "flex", flex: 1, marginTop: 15 }} >
                            <button className="button" style={{ marginTop: 10, width: "100%" }} onClick={this.signup} >
                                <span className="buttonmatter">Update Profile</span>
                            </button>
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

                                <div style={{ display: "flex", flex: 1, marginTop: 20, width: 250 }} >
                                    <input type="password" className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                </div>

                                <div style={{ display: "flex", flex: 1, marginTop: 15, width: 250 }} >
                                    <input type="password" className="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" value={confirmPassword} onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                                </div>

                                <div style={{ display: "flex", flex: 1, marginTop: 15 }} >
                                    <button className="button" style={{ marginTop: 10, width: "70%" }} onClick={this.signup} >
                                        <span className="buttonmatter">Change Password</span>
                                    </button>
                                </div>
                            </div>

                        </center>
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

export default connect(mapStateToProp, mapDispatchToProp)(ShopProfile);
