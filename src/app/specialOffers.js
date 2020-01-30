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
import { Button, DatePicker, version, Modal, Upload, Icon, message } from "antd";
import SpecialOfferModal from '../components/SpecialOfferModal';
import { addSpecialOffer } from "../store/action/action";


import "antd/dist/antd.css";

class SpecialOffers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            email: "",
            modal2Visible: false,
            offerName: '',
            price: '',
            offerDescription: '',
            imageFile: {}

        }
        this.addSpecialOffer = this.addSpecialOffer.bind(this);
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    addSpecialOffer() {
        let specialOffer = {
            offerName: this.state.offerName,
            price: this.state.price,
            offerDescription: this.state.offerDescription,
            imageFile: this.state.imageFile,
            userId: (this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254',

        }
        this.props.addSpecialOffer(specialOffer);
        this.setState({
            offerName: '',
            price: '',
            offerDescription:'',
            imageFile: {},
            modal2Visible: false
        })
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
                    // backgroundColor: "#49BE5s"
                }}>
                    <div style={{ minWidth: 150 }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Special Offers</span>
                    </div>
                    <button style={{ minWidth: 120, width: "20%" }} className="buttonAdd" onClick={() => this.setModal2Visible(true)} >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Add Special Offers</span>
                    </button>

                </div>

                <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
                    {/* card start */}
                    <div className="cardshadow" style={{
                        display: "flex", height: "14vw", width: "16vw", minWidth: 230, minHeight: 240, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>

                        <div style={{ display: "flex", flex: 0.5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                            <div>
                                Special Offer 1
                            </div>
                            <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <IoMdCheckmark style={{ color: "white", }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "-moz-initial", fontSize: 24 }}>
                            $25
                        </div>

                        <div style={{ display: "flex", flex: 0.5, color: "#535353", marginTop: 5, textAlign: "left", marginTop: 10 }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text industry's
                        </div>

                        <div style={{ flex: 1.5, }}>
                            <button type="button" class="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>
                        </div>
                    </div>
                    {/* card End */}

                    {/* add button */}
                    <div className="cardshadow" style={{
                        display: "flex", height: "14vw", width: "16vw", minWidth: 230, minHeight: 240, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>
                        <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }} onClick={() => this.setModal2Visible(true)} >
                            <div class="btn btn-light" style={{ display: "flex", width: "35%", height: "35%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <SpecialOfferModal modalState={this.state} setModal2Visible={this.setModal2Visible} that={this} />
                </div>
            </div >
        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        uid: state.root.userProfile._id,

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        addSpecialOffer: (specialOffer) => {
            dispatch(addSpecialOffer(specialOffer));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(SpecialOffers);
