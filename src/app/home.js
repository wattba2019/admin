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
import { MdCameraEnhance } from 'react-icons/md';
import { FaRegCalendarCheck, FaRegCalendarAlt } from 'react-icons/fa';
import { GiScissors } from 'react-icons/gi';
import { AiOutlineUser, AiFillGift } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import Bookings from './bookings';
import Services from './services';
import SpecialOffers from './specialOffers';
import StyleList from './stylelist';
import Workinghours from './workingHours';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            route: "WorkingHours"
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


    routeChanger(routeName) {
        this.setState({
            route: routeName
        })
    }

    render() {
        const { } = this.state;
        return (
            <div>

                <div class="sidenav">
                    <div style={{ flexBasis: "100%", marginTop: "10%" }}>
                        <center>
                            <div style={{ width: "50%", }} className="center">
                                <div>
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
                            </div>
                            <div className="buttonsidebar" style={{ background: this.state.route === "Bookings" ? 'rgba(199, 174, 176, 0.2)' : null, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20, width: "95%", height: 50, }}>
                                <div style={{ display: "flex", width: "90%", }}>
                                    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <FaRegCalendarCheck style={{ color: "white", fontSize: 18, marginTop: 5 }} />
                                    </div>
                                    <div onClick={() => this.routeChanger("Bookings")} style={{ flex: 6, color: "white", fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "left", marginLeft: 10, }}>
                                        Bookings
                                     </div>
                                </div>
                            </div>
                            <div className="buttonsidebar" style={{ background: this.state.route === "Services" ? 'rgba(199, 174, 176, 0.2)' : null, display: "flex", alignItems: "center", justifyContent: "center", width: "95%", height: 50, }}>
                                <div style={{ display: "flex", width: "90%", }}>
                                    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <GiScissors style={{ color: "white", fontSize: 18, marginTop: 5 }} />
                                    </div>
                                    <div onClick={() => this.routeChanger("Services")} style={{ flex: 6, color: "white", fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "left", marginLeft: 10, }}>
                                        Services
                                        </div>
                                </div>
                            </div>
                            <div className="buttonsidebar" style={{ background: this.state.route === "Stylelists" ? 'rgba(199, 174, 176, 0.2)' : null, display: "flex", alignItems: "center", justifyContent: "center", width: "95%", height: 50, }}>
                                <div style={{ display: "flex", width: "90%", }}>
                                    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <AiOutlineUser style={{ color: "white", fontSize: 18, marginTop: 5 }} />
                                    </div>
                                    <div onClick={() => this.routeChanger("Stylelists")} style={{ flex: 6, color: "white", fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "left", marginLeft: 10, }}>
                                        Stylelists
                                        </div>
                                </div>
                            </div>
                            <div className="buttonsidebar" style={{ background: this.state.route === "WorkingHours" ? 'rgba(199, 174, 176, 0.2)' : null, display: "flex", alignItems: "center", justifyContent: "center", width: "95%", height: 50, }}>
                                <div style={{ display: "flex", width: "90%", }}>
                                    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <FiClock style={{ color: "white", fontSize: 18, marginTop: 5 }} />
                                    </div>
                                    <div onClick={() => this.routeChanger("WorkingHours")} style={{ flex: 6, color: "white", fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "left", marginLeft: 10, }}>
                                        Working Hours
                                    </div>
                                </div>
                            </div>
                            <div className="buttonsidebar" style={{ background: this.state.route === "WorkingCalendar" ? 'rgba(199, 174, 176, 0.2)' : null, display: "flex", alignItems: "center", justifyContent: "center", width: "95%", height: 50, }}>
                                <div style={{ display: "flex", width: "90%", }}>
                                    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <FaRegCalendarAlt style={{ color: "white", fontSize: 18, marginTop: 5 }} />
                                    </div>
                                    <div onClick={() => this.routeChanger("WorkingCalendar")} style={{ flex: 6, color: "white", fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "left", marginLeft: 10, }}>
                                        Working Calendar
                                        </div>
                                </div>
                            </div>
                            <div className="buttonsidebar" style={{ background: this.state.route === "SpecialOffers" ? 'rgba(199, 174, 176, 0.2)' : null, display: "flex", alignItems: "center", justifyContent: "center", width: "95%", height: 50, background: "white" }}>
                                <div style={{ display: "flex", width: "90%", }}>
                                    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <AiFillGift style={{ color: "#EC5F59", fontSize: 18, marginTop: 5 }} />
                                    </div>
                                    <div onClick={() => this.routeChanger("SpecialOffers")} style={{ flex: 6, fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "left", marginLeft: 10, }}>
                                        Special Offers
                                        </div>
                                </div>
                            </div>

                            <div className="buttonsidebar" style={{ display: "flex", marginTop: "100%", alignItems: "center", justifyContent: "center", width: "100%", height: 50, }}>
                                <div style={{ display: "flex", width: "90%", }}>
                                    <div style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <GoSignOut style={{ color: "white", fontSize: 18, marginTop: 5 }} />
                                    </div>
                                    <div style={{ flex: 6, color: "white", fontSize: 18, justifyContent: "center", alignItems: "center", alignSelf: "center", textAlign: "left", marginLeft: 10, }}>
                                        Sign out
                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>

                <div class="main">
                    <div
                        style={{
                            display: "flex", flexBasis: "85%",
                            height: window.innerHeight,
                            backgroundColor: "#F7F8F8"
                            // background: "red"
                        }}>
                        <div style={{ width: "100%", height: "8%", float: "right", textAlign: "right", }}>
                            <img alt="BackGroundImage" src={require('../assets/logo.png')} style={{ marginRight: "4%", marginTop: "0.5%" }}
                                width="140"
                                height="80%"
                            />

                            {
                                (this.state.route === "Bookings") ? (<Bookings />) : null
                            }
                            {
                                (this.state.route === "Services") ? (<Services />) : null
                            }
                            {
                                (this.state.route === "Stylelists") ? (<StyleList />) : null
                            }
                            {
                                (this.state.route === "WorkingHours") ? (<Workinghours />) : null
                            }
                            {
                                (this.state.route === "SpecialOffers") ? (<SpecialOffers />) : null
                            }

                        </div>
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
