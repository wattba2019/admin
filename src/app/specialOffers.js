import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { getSpecialPackages, addSpecialOffer } from "../store/action/action";
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
import SpecialOfferCard from '../components/SpecialOfferCard';


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

        this.props.getSpecialPackages((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');
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
            offerDescription: '',
            imageFile: {},
            modal2Visible: false
        })
    }

    render() {
        // const { open, email } = this.state;
        const { specialPackages } = this.props;
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

                <SpecialOfferCard specialPackages={specialPackages} />

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
        specialPackages: state.root.specialPackages
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        addSpecialOffer: (specialOffer) => {
            dispatch(addSpecialOffer(specialOffer));
        },
        getSpecialPackages: (userId) => {
            dispatch(getSpecialPackages(userId));
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(SpecialOffers);
