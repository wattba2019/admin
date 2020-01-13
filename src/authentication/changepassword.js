import React, { Component, } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import { MdLock } from 'react-icons/md';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import history from '../History';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            password: '',
            rePassword: '',
        }
        this.changePassword = this.changePassword.bind(this);
    }

    changePassword() {
        let { password, rePassword } = this.state;
        if (password === rePassword) {
            this.setState({
                loader: !this.state.loader
            })
            let cloneData = {
                email: this.props.location.state,
                newPassword: password,
            }
            var options = {
                method: 'POST',
                url: `${this.props.bseUrl}/resetpasswordAdmin/changepassword/`,
                headers:
                {
                    'cache-control': 'no-cache',
                    "Allow-Cross-Origin": '*',
                },
                data: cloneData
            };
            axios(options)
                .then((data) => {
                    console.log(data.data, "VERIFICATION_SUCCESSFULLY")
                    this.setState({
                        loader: !this.state.loader
                    })
                    history.push("Signin")
                }).catch((err) => {
                    console.log(err.response.data.message, "ERROR_ON_VERIFICATION")
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
                err: "Password does not match",
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
        const { password, rePassword, err, showerror, loader } = this.state;
        return (
            <div>
                <div style={{ display: "flex", flexBasis: "100%", backgroundColor: "#F7F8F8" }}>
                    <div style={{ display: "flex", flexBasis: "50%", }}>
                        <div style={{ flexBasis: "100%", marginTop: "30%" }}>
                            <center>
                                <div style={{ width: "50%", }} className="center">
                                    <h2>Change password</h2>
                                    <p style={{ color: "grey" }}>Type new password</p>

                                    {/* Password */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdLock style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    </div>
                                    {/* re Password */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdLock style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Re type password" aria-label="Re type password" aria-describedby="basic-addon1" value={rePassword} onChange={(e) => { this.setState({ rePassword: e.target.value }) }} />
                                    </div>
                                    {
                                        (loader) ?
                                            (<div>
                                                <Loader type="ThreeDots" color="#EC5F59" height={40} width={40} />
                                            </div>)
                                            : <button className="button" style={{ marginTop: 10, }} onClick={this.changePassword} >
                                                <span className="buttonmatter">Change Password</span>
                                            </button>
                                    }
                                    {
                                        (showerror) ? (
                                            <div style={{ color: "red", marginTop: 12 }}>{err}</div>
                                        ) : null
                                    }
                                    <br /><br />
                                    <center>
                                        <div className="textLink"> <Link to='/Signin'>Back to login</Link></div>
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

export default connect(mapStateToProp, mapDispatchToProp)(ChangePassword);
