import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials, addService } from "../store/action/action";
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

import ServiceModal from '../components/ServiceModal';

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
            extraService: [],
            extraServiceqty: 1,
            modal2Visible: false,
        }
        this.state.extraServiceqtyArr = Array.apply(null, { length: this.state.extraServiceqty });

        this.setModal2Visible = this.setModal2Visible.bind(this);
        this.addExtraServiceField = this.addExtraServiceField.bind(this);
        this.delExtraService = this.delExtraService.bind(this);
        this.addExtraService = this.addExtraService.bind(this);
        this.saveService = this.saveService.bind(this);

    }


    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    addExtraService = (input, type, index) => {
        console.log(input, type, index, "DATA");
        let extraService = this.state.extraService;
        extraService[index] = (extraService[index]) ? extraService[index] : {};
        extraService[index][type] = input;
        console.log(extraService, 'extraservice add');
        this.setState({ extraService });
    }


    addExtraServiceField = () => {
        let extraServiceqty = this.state.extraServiceqty
        extraServiceqty = ++extraServiceqty;
        let extraServiceqtyArr = Array.apply(null, { length: extraServiceqty });
        this.setState({ extraServiceqty, extraServiceqtyArr });
    }

    delExtraService = (index) => {
        let extraService = this.state.extraService
        extraService.splice(index, 1)
        let extraServiceqty = this.state.extraServiceqty
        extraServiceqty = --extraServiceqty;
        let extraServiceqtyArr = Array.apply(null, { length: extraServiceqty });
        this.setState({ extraServiceqty, extraServiceqtyArr, extraService }, () => { console.log(this.state) });
    }

    saveService() {
        console.log('saved service called');
        let service = {
            serviceName: this.state.serviceName,
            price: this.state.price,
            userId: (this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254',
            extraServices: this.state.extraService
        }
        this.props.addService(service);
        this.state.extraServiceqtyArr = Array.apply(null, { length: this.state.extraServiceqty });

        let extraServiceqtyArr = Array.apply(null, { length: 1 });
        this.setState({
            serviceName: "",
            price: "",
            extraService: [],
            extraServiceqty: 1,
            modal2Visible: false,
            extraServiceqtyArr
        })
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
                    <button style={{ minWidth: 80 }} className="buttonAdd" onClick={() => this.setModal2Visible(true)} >
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
                            <button type="button" className="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={this.signin}>Edit Service</button>
                        </div>
                    </div>
                    {/* card End */}

                    {/* add button */}
                    <div className="cardshadow" style={{
                        display: "flex", height: "20vw", width: "16vw", minWidth: 220, minHeight: 300, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>
                        <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                            <div className="btn btn-light"  onClick={() => this.setModal2Visible(true)}  style={{ display: "flex", width: "35%", height: "24%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <ServiceModal modalState={this.state} setModal2Visible={this.setModal2Visible} addExtraServiceField={this.addExtraServiceField} delExtraService={this.delExtraService} addExtraService={this.addExtraService} saveService={this.saveService} that={this} />
                </div>
            </div >
        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        uid: state.root.userProfile._id
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        addService: (service) => {
            dispatch(addService(service));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Services);
