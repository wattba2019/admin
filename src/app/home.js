import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials } from "../store/action/action";
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import swal from 'sweetalert2';
// import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import { MdCameraEnhance } from 'react-icons/md';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
        }
    }

    imagePick(file) {
        console.log(file[0], "555")
        if (file) {
            console.log(file, "9999")
            this.setState({
                shopImage: file
            })
        }
    }

    render() {
        const { } = this.state;
        return (
            <div>
                <div style={{ display: "flex", flexBasis: "100%", backgroundColor: "#F7F8F8" }}>
                    <div style={{ display: "flex", flexBasis: "15%", }} className="sideBarBackGroud">
                        <div style={{ flexBasis: "100%", marginTop: "10%" }}>
                            <center>
                                <div style={{ width: "50%", }} className="center">
                                    <div  >
                                        <center>
                                            <div className="drawerBackgroundnested" >
                                                <img src={require('../../src/assets/noPhoto.jpg')} className="profileImage" />
                                                <label htmlFor="inputGroupFile01" className="profileImageupload" style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                                                    <MdCameraEnhance style={{ color: "grey", fontSize: 18 }} />
                                                </label>
                                            </div>
                                            <input
                                                onChange={(e) =>
                                                    this.imagePick(e.target.files[0])
                                                }
                                                type="file"
                                                id="inputGroupFile01"
                                                className="profileinputnone"
                                            />
                                        </center>
                                    </div>
                                </div >
                            </center>
                        </div>
                    </div >

                    <div style={{ display: "flex", flexBasis: "85%", }}>
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

export default connect(mapStateToProp, mapDispatchToProp)(Home);
