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
import { MdDeleteForever } from 'react-icons/md';
// import Modal from 'react-responsive-modal';
import { Button, DatePicker, version, Modal } from "antd";
import "antd/dist/antd.css";
// import "./index.css";
class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            email: "",
            serviceName: "",
            price: "",
            extraService: [
                // {
                //     serviceName: "Abcd",
                //     Price: 500
                // },
                // {
                //     serviceName: "123",
                //     Price: 500
                // },
                // {
                //     serviceName: "test",
                //     Price: 500
                // }
            ],
            extraServiceqty: [1],
            modal2Visible: false,
        }
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    // addExtraService = (input, type, index) => {
    //     console.log(input, type, index, "DATA")
    //     // alert("work")

    //     // this.setState({ extraServiceqty: input });

    //     let data = {

    //     }


    //     if (type === "serviceName") {
    //         data.serviceName = input
    //     }
    //     else {
    //         data.price = input
    //     }

    // }


    addExtraService = (input, type, index) => {
        console.log(input, type, index, "DATA")
    }


    addExtraServiceField = () => {
        let data = this.state.extraServiceqty
        data.push(1)
        this.setState({ extraServiceqty: data });
    }

    delExtraService = (index) => {
        let data = this.state.extraServiceqty
        data.splice(index, 1)
        this.setState({ extraServiceqty: data });
    }

    render() {
        const { email, serviceName, price, extraService, extraServiceqty } = this.state;
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
                    <button style={{ minWidth: 80 }} className="buttonAdd" onClick={this.signin} >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Add Service</span>
                    </button>
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
                            <button type="button" className="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>
                        </div>
                    </div>
                    {/* card End */}

                    {/* add button */}
                    <div className="cardshadow" style={{
                        display: "flex", height: "20vw", width: "16vw", minWidth: 220, minHeight: 300, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>
                        <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                            <div className="btn btn-light" style={{ display: "flex", width: "35%", height: "24%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
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
                    >
                        <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", fontSize: "1.1vw", fontWeight: "bold", }}>
                            <div style={{ fontSize: 18 }}>
                                New Service
                           </div>

                            <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>

                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                    <div style={{ width: "100%", }}>
                                        <input type="text" className="form-control" placeholder=" Service Name" aria-label=" Service Name" aria-describedby="basic-addon1" value={serviceName} onChange={(e) => { this.setState({ serviceName: e.target.value }) }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                    <div style={{ width: "100%", }}>
                                        <input type="text" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={price} onChange={(e) => { this.setState({ price: e.target.value }) }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >

                                </div>
                            </div>

                            <div style={{ marginTop: 10, fontSize: 18 }}>
                                Extra Service
                           </div>

                            {
                                extraServiceqty.map((key, index) => {
                                    return (
                                        <div key={index} style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                                            <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                                <div style={{ width: "100%", }}>
                                                    <input type="text" className="form-control" placeholder=" Service Name" aria-label=" Service Name" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.addExtraService(e.target.value, "serviceName", index) }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                                <div style={{ width: "100%", }}>
                                                    <input type="text" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.addExtraService(e.target.value, "price", index) }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                                <button className="buttonAdd buttonmatter" style={{ minWidth: 80, width: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => this.delExtraService(index)} >
                                                    {/* <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span> */}
                                                    <MdDeleteForever className="buttonmatter" style={{ color: "white", fontSize: 20, marginTop: 5 }} />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }



                            <div onClick={this.addExtraServiceField} style={{ marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div className="btn btn-light" style={{ display: "flex", backgroundColor: "#EC5F59", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                    <AiOutlinePlus style={{ color: "#ffffff", fontSize: 25 }} />
                                </div>
                                <div style={{ marginLeft: "2%", fontSize: 14 }}>
                                    Add Extra Service
                                </div>
                            </div>

                            <div style={{ marginTop: 10, display: "flex", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", alignItems: "center", }}>

                                <button className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }} onClick={this.signin} >
                                    <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span>
                                </button>

                                <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>

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

export default connect(mapStateToProp, mapDispatchToProp)(Services);
