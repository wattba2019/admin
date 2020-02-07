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
import { changePassword, updateProfile,  } from "../store/action/action";
import { Form, Input, Checkbox } from 'antd';

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
        }
    }

    componentDidMount() {
        let userData = this.props.userProfile
        // console.log(userData, "USER_DATA_IN_PROFILE")
        if (userData != undefined) {
            this.setState({
                email: userData.email,
                about: userData.about,
                businessName: userData.businessName,
                telephone: userData.telePhone,
                websiteUrl: userData.websiteUrl,
                addressline1: userData.addressLine1,
                addressline2: userData.addressLine2,
            })
        }
        else {
            history.push('Signin')
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
        const { email, about, businessName, telephone, websiteUrl, addressline1, addressline2 } = this.state
        if (email !== '' && about !== '' && businessName !== '' && telephone !== '' && addressline1 !== '') {
            let cloneUpdatedUser = {
                email: email,
                about: about,
                businessName: businessName,
                telePhone: telephone,
                websiteUrl: websiteUrl,
                addressLine1: addressline1,
                addressLine2: addressline2,
                _id: this.props.userProfile._id
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

    render() {
        const { email, password, confirmPassword, about, businessName, telephone, websiteUrl, addressline1, addressline2, showerror, err, showerrorpassword } = this.state;
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

                        {/* update */}
                        <div style={{ display: "flex", flex: 1, marginTop: 15 }} >
                            <button className="button" style={{ marginTop: 10, width: "100%" }} onClick={this.updateProfileData} >
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
export default connect(mapStateToProp, mapDispatchToProp)(WrappedShopProfile);
// export default WrappedShopProfile