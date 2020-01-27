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
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
import Modal from 'react-responsive-modal';

class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            open: false,
            email: ""
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    render() {
        const { open, email } = this.state;
        return (
            <div style={{
                display: "flex", flexDirection: "column", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                // background: "yellow",
            }}>
                <div style={{
                    display: "flex", flex: 1, width: "90%", justifyContent: "space-between",
                    // backgroundColor: "#49BE56"
                }}>
                    <div style={{ minWidth: 150 }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Services Provided</span>
                    </div>
                    <div style={{ background: "red", justifyContent: "space-between", display: "flex",padding:250 }}>
                        <button style={{ minWidth: 160,margin:"1%" }} className="buttonAdd" onClick={this.signin} >
                            <span className="buttonmatter" style={{  }}>Refresh</span>
                        </button>
                        <button type="button" class="btn btn-light" style={{ margin:"1%",minWidth: 160, height: 40, borderWidth: 0.5, borderColor: "grey" }} onClick={this.onOpenModal}>
                            Export Bookings
                            </button>
                    </div>
                </div>

                <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
                    {/* card start */}
                    <div className="cardshadow" style={{
                        display: "flex", height: "20vw", width: "16vw", minWidth: 220, minHeight: 300, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>

                        <div style={{ display: "flex", flex: 0.5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                            <div>
                                Shaving
                            </div>
                            <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <IoMdCheckmark style={{ color: "white", }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "-moz-initial", fontSize: 24 }}>
                            $50
                        </div>

                        <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "bold", marginTop: 5, }}>
                            Extra Services
                        </div>

                        <div style={{ display: "flex", flex: 5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                            <div style={{ display: "flex", width: "100%", margin: 10, justifyContent: "space-between", alignItems: "center", fontWeight: "normal", color: "#535353" }}>
                                <div>
                                    Extra Services 1
                                </div>
                                <div style={{ marginLeft: "10%", color: "#535353" }}>
                                    $20
                                </div>
                                <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                    <IoMdCheckmark style={{ color: "white", }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", width: "100%", margin: 10, justifyContent: "space-between", alignItems: "center", fontWeight: "normal", color: "#535353" }}>
                                <div>
                                    Extra Services 2
                                </div>
                                <div style={{ marginLeft: "10%", color: "#535353" }}>
                                    $20
                                </div>
                                <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                    <IoMdCheckmark style={{ color: "white", }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", width: "100%", margin: 10, justifyContent: "space-between", alignItems: "center", fontWeight: "normal", color: "#535353" }}>
                                <div>
                                    Extra Services 3
                                </div>
                                <div style={{ marginLeft: "10%", color: "#535353" }}>
                                    $20
                                </div>
                                <div style={{ display: "flex", backgroundColor: "#B5B6B7", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                    <IoMdCheckmark style={{ color: "white", }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ flex: 1.5, }}>
                            <button type="button" class="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={this.onOpenModal}>Edit Service</button>
                        </div>
                    </div>
                    {/* card End */}

                    {/* add button */}
                    <div className="cardshadow" style={{
                        display: "flex", height: "20vw", width: "16vw", minWidth: 220, minHeight: 300, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>
                        <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                            <div class="btn btn-light" style={{ display: "flex", width: "35%", height: "24%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                            </div>
                        </div>
                    </div>


                </div>

                {/* modal */}

                <div>
                    <Modal style={{}} open={open} onClose={this.onCloseModal}>
                        <div style={{ display: "flex", flex: 1, flexDirection: "column", background: "red", marginTop: 20, width: "100%", }}>
                            New Service

                            <div style={{ display: "flex", flex: 1, width: "100%", background: "green", marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                                <div className="input-group mb-3" style={{ width: "50%", margin: "3%" }}>
                                    <input type="text" className="form-control" placeholder="Service Name" aria-label="Service Name" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                </div>
                                <div className="input-group mb-3" style={{ width: "30%", margin: "3%" }}>
                                    <input type="text" className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                </div>
                            </div>

                        </div>
                    </Modal>
                </div>
            </div>
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
        // setUserCredentials: (user) => {
        //     dispatch(setUserCredentials(user));
        // },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Bookings);
