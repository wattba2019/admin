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
// import Modal from 'react-responsive-modal';
import { Button, DatePicker, version, Modal, Input, TimePicker } from "antd";
import TextareaAutosize from 'react-textarea-autosize';

import "antd/dist/antd.css";

const { Search } = Input;

// import "./index.css";
class StyleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            email: "",
            modal2Visible: true,
        }
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    onChange = (time, timeString) => {
        console.log(time, timeString);
    }

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
                    <div style={{
                        minWidth: 350, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                        // background: "green"
                    }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Stylists Profiles</span>
                        <div style={{ marginLeft: 10 }}>
                            <Search
                                placeholder="search stylist"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <button style={{ minWidth: 120, width: "20%" }} className="buttonAdd" onClick={this.signin} >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Add StyList</span>
                    </button>
                </div>

                <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
                    {/* card start */}
                    <div className="cardshadowWithButton" style={{
                        display: "flex", height: "25vw", width: "16vw", minWidth: 220, minHeight: 400, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>
                        <div style={{ padding: 10 }}>
                            <div style={{
                                display: "flex", flex: 2, height: 100, padding: 5, color: "black", fontWeight: "bold", flexDirection: "column", justifyContent: "center", alignItems: "center",
                                // background: "red"
                            }}>
                                <div>
                                    <img src={require('../../src/assets/noPhoto.jpg')} className="profileImage" style={{ width: 70, height: 70 }} />
                                </div>
                                <div>John Doe</div>
                            </div>


                            <div style={{
                                display: "flex", flex: 3, padding: 5, color: "#535353", fontWeight: "normal", fontSize: 10, flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "left",
                                // background: "green"
                            }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text industry's
                        </div>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row", padding: 5, color: "black", fontWeight: "bold", fontSize: 12,
                                // background: "red"
                            }}>
                                Service 1
                        </div>

                            <div style={{
                                display: "flex", flex: 5, flexDirection: "column", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center",
                                // background: "orange"
                            }}>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                                </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                                </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                                </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                                </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cardButtonBorder" style={{
                            display: "flex", flex: 1, width: "100%", padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center",
                            background: "#F7F8F8"
                        }}>
                            <div className="cardButtonBorderRight" style={{
                                display: "flex", flex: 1, height: "100%", justifyContent: "center", alignItems: "center", textAlign: "left", fontSize: 10,
                                background: "#F7F8F8"
                            }}
                                onClick={() => this.setModal2Visible(true)}
                            >
                                Working Calendar
                            </div>
                            <div style={{
                                display: "flex", flex: 1, height: "100%", justifyContent: "center", alignItems: "center", textAlign: "left", fontSize: 10,
                                background: "#F7F8F8"
                            }}
                                onClick={() => this.setModal2Visible(true)}
                            >
                                Gallery
                            </div>
                        </div>

                    </div>
                    {/* card End */}

                    {/* add button */}
                    <div className="cardshadow" style={{
                        display: "flex", height: "25vw", width: "16vw", minWidth: 220, minHeight: 400, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>
                        <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                            <div class="btn btn-light" style={{ display: "flex", width: "35%", height: "19%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Modal
                        footer={null}
                        // title="Vertically centered modal dialog"
                        centered
                        visible={this.state.modal2Visible}
                        onOk={() => this.setModal2Visible(false)}
                        onCancel={() => this.setModal2Visible(false)}
                        bodyStyle={{ height: 600 }}
                        width={"60%"}
                        bodyStyle={{ padding: 0, }}
                    >
                        <div style={{ display: "flex", flex: 1, width: "100%", flexDirection: "column", fontSize: "1.1vw", fontWeight: "bold", background: "red" }}>

                            {/* Body */}
                            <div style={{ display: "flex", flex: 8, minWidth: 140, background: "yellow" }}>
                                {/* 1st card */}

                                <div style={{ display: "flex", flexDirection: "column", flex: 2, background: "#F7F8F8", padding: "2.5%" }}>
                                    <div style={{ fontSize: 18 }}>
                                        New Stylist
                                     </div>
                                    {/* Full Name */}
                                    <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                                        <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                            <div style={{ width: "70%", }}>
                                                <input type="text" className="form-control" placeholder=" Full Name" aria-label=" Full Name" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* description */}
                                    <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", fontSize: "1.1vw", fontWeight: "bold", }}>
                                        <div style={{ marginTop: 10, fontSize: 18 }}>
                                            Desciption
                                        </div>

                                        <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>

                                            <div style={{ display: "flex", flex: 1, margin: "1.5%", borderRadius: 25 }} >
                                                <TextareaAutosize style={{ width: "100%" }} maxRows={8} minRows={4} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* working days */}
                                    <div style={{
                                        display: "flex", flex: 1, flexDirection: "row",
                                        // background: "red"
                                    }}>

                                        <div style={{
                                            display: "flex", flexDirection: "column", flex: 1.5,
                                            // background: "green"
                                        }}>
                                            <p style={{ fontSize: 14 }}>Working Days</p>

                                            <div style={{ display: "flex", margin: "2%", flex: 0.5, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div style={{ fontSize: 14, fontWeight: "normal" }}>
                                                    Monday
                                                </div>
                                                <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", margin: "2%", flex: 0.5, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div style={{ fontSize: 14, fontWeight: "normal" }}>
                                                    Tuesday
                                                </div>
                                                <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", margin: "2%", flex: 0.5, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div style={{ fontSize: 14, fontWeight: "normal" }}>
                                                    Wednesday
                                                </div>
                                                <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", margin: "2%", flex: 0.5, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div style={{ fontSize: 14, fontWeight: "normal" }}>
                                                    Thursday
                                                </div>
                                                <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", margin: "2%", flex: 0.5, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div style={{ fontSize: 14, fontWeight: "normal" }}>
                                                    Friday
                                                </div>
                                                <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", margin: "2%", flex: 0.5, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div style={{ fontSize: 14, fontWeight: "normal" }}>
                                                    Saturday
                                                </div>
                                                <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", margin: "2%", flex: 0.5, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div style={{ fontSize: 14, fontWeight: "normal" }}>
                                                    Sunday
                                                </div>
                                                <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                        </div>

                                        <div style={{
                                            display: "flex", flex: 2, flexDirection: "column", marginLeft: "3.5%",
                                            background: "grey"
                                        }}>
                                            <p style={{ fontSize: 14 }}>Break</p>
                                            <div>
                                                <div style>
                                                    <TimePicker use12Hours format="h:mm a" onChange={this.onChange} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                {/* 2nd card */}

                                <div style={{ display: "flex", flex: 1.7, background: "#FFFFFF" }}>
                                    123
                                </div>
                                {/* 3rd card */}

                                <div style={{ display: "flex", flex: 2, background: "#F7F8F8" }}>
                                    123
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="cardshadowWithButton" style={{
                                display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 2, zIndex: 1,
                                background: "#F7F8F8",
                            }}>

                                <button className="buttonAdd" style={{ minWidth: 140, width: "25%", margin: "1%" }} onClick={this.signin} >
                                    <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span>
                                </button>

                                <button type="button" class="btn btn-light" style={{ width: "25%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>


                            </div>
                        </div>
                    </Modal>
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
        // setUserCredentials: (user) => {
        //     dispatch(setUserCredentials(user));
        // },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(StyleList);
