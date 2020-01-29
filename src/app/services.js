import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials, addService, getServices } from "../store/action/action";
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
import ServiceCard from '../components/ServiceCard';


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

        this.props.getServices((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');
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
        console.log(this.props.services, 'thispropsservices')
        const { services } = this.props;
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
                <ServiceCard services={services} setModal2Visible={this.setModal2Visible} />

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
        uid: state.root.userProfile._id,
        services: state.root.services

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        addService: (service) => {
            dispatch(addService(service));
        },
        getServices: (uid) => {
            dispatch(getServices(uid));
        },


    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Services);
