import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials } from "../store/action/action";
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import { MdEmail, MdLock } from 'react-icons/md';
import axios from 'axios';
import Loader from 'react-loader-spinner'
import swal from 'sweetalert2';
import history from '../History';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            email: 'abddullahshah@gmail.com',
            password: '123456',
            // email: '',
            // password: '',
        }
        this.signin = this.signin.bind(this);
    }

    signin() {
        let { email, password, } = this.state;
        this.setState({
            loader: !this.state.loader
        })
        let cloneSigninData = {
            email,
            password
        }
        var options = {
            method: 'POST',
            url: `${this.props.bseUrl}/signin/signinAdmin/`,
            headers:
            {
                'cache-control': 'no-cache',
                "Allow-Cross-Origin": '*',
            },
            data: cloneSigninData
        };
        axios(options)
            .then((data) => {
                console.log(data.data, "USER_LOGIN_SUCCESSFULLY")
                this.setState({
                    loader: !this.state.loader
                })
                swal.fire(
                    'Success!',
                    'USER LOGIN SUCCESSFULLY',
                    'success'
                )
                this.props.setUserCredentials(data.data)
                history.push('Home')
            }).catch((err) => {
                console.log(err.response.data.message, "ERROR_ON_SIGN_IN")
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
        const { email, password, err, showerror, loader } = this.state;
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

                                    {/* Password */}
                                    <div className="input-group mb-3" style={{ marginTop: 10 }}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: "#EC5F59" }}><MdLock style={{ color: "white", }} /></span>
                                        </div>
                                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    </div>
                                    {
                                        (loader) ?
                                            (<div>
                                                <Loader type="ThreeDots" color="#EC5F59" height={40} width={40} />
                                            </div>)
                                            : <button className="button" style={{ marginTop: 10, }} onClick={this.signin} >
                                                <span className="buttonmatter">Sign in</span>
                                            </button>
                                    }
                                    {
                                        (showerror) ? (
                                            <div style={{ color: "red", marginTop: 12 }}>{err}</div>
                                        ) : null
                                    }
                                    <br /><br />
                                    <center>
                                        <div className="textLink"> <Link to='/Sendverificationmail'>Forgot your password</Link></div>
                                    </center>
                                    <center>
                                        <div className="textLink"> <Link to='/Signup'>Don't have an account yet? <span style={{ color: "#EC5F59" }}>Sign up</span></Link>
                                        </div>
                                    </center>
                                </div>
                            </center>
                        </div>
                    </div >

                    <div style={{ display: "flex", flexBasis: "50%", }}>
                        <img alt="BackGroundImage" src={require('../assets/signinBackground.png')}
                            width="100%"
                            // height="100%"
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
        setUserCredentials: (user) => {
            dispatch(setUserCredentials(user));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);
