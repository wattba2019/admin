import React, { Component, } from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import { MdEmail } from 'react-icons/md';
import axios from 'axios';
import Loader from 'react-loader-spinner'

class SendVerificationCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            email: 'abddullahshah@gmail.com',
        }
        this.sendCode = this.sendCode.bind(this);
    }

    sendCode() {
        let { email, } = this.state;
        this.setState({
            loader: !this.state.loader
        })
        let cloneData = {
            email,
            createdAt: new Date().getTime()
        }
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/resetpasswordAdmin/sendcode/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: cloneData
        };
        axios(options)
            .then((data) => {
                console.log(data.data, "SEND_EMAIL_SUCCESSFULLY")
                this.setState({
                    loader: !this.state.loader
                })
            }).catch((err) => {
                console.log(err.response.data.message, "ERROR_ON_SEND_EMAIL_")
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

    render() {
        const { email, err, showerror, loader } = this.state;
        return (
            <div>
                <div style={{ display: "flex", flexBasis: "100%", backgroundColor: "#F7F8F8" }}>
                    <div style={{ display: "flex", flexBasis: "50%", }}>
                        <div style={{ flexBasis: "100%", marginTop: "30%" }}>
                            <center>
                                <div style={{ width: "50%", }} className="center">
                                    <h2 className="input-group mb-6 inputCenter" >Sign in</h2>

                                    {/* Email */}
                                    <div className="input-group mb-3" style={{ marginTop: 20 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdEmail style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="text" className="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>
                                    {
                                        (loader) ?
                                            (<div>
                                                <Loader type="ThreeDots" color="#EC5F59" height={40} width={40} />
                                            </div>)
                                            : <button className="button" style={{ marginTop: 10, }} onClick={this.sendCode} >
                                                <span className="buttonmatter">Reset Password</span>
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

export default connect(mapStateToProp, mapDispatchToProp)(SendVerificationCode);
