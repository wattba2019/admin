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
import { Button, DatePicker, version, Modal, Input, TimePicker } from "antd";
import TextareaAutosize from 'react-textarea-autosize';
import StylistModal from '../components/StylistModal';
import StylistCard from '../components/StylistCard';

import "antd/dist/antd.css";


import { Upload, Icon, } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const { Search } = Input;

// import "./index.css";
class StyleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            stylistFullName: '',
            stylistDescription: '',
            modal2Visible: false,
            workingDaysNTime: [
                {
                    day: 'Monday', brStart: '', brEnd: '', working: true,
                },
                {
                    day: 'Tuesday', brStart: '', brEnd: '', working: true,
                },
                {
                    day: 'Wednesday', brStart: '', brEnd: '', working: true,
                },
                {
                    day: 'Thursday', brStart: '', brEnd: '', working: true,
                },
                {
                    day: 'Friday', brStart: '', brEnd: '', working: true,
                },
                {
                    day: 'Saturday', brStart: '', brEnd: '', working: true,
                },
                {
                    day: 'Sunday', brStart: '', brEnd: '', working: true,
                },
            ],
            // weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            serviceNameFieldQty: [1],
            previewVisible: false,
            previewImage: '',
            fileList: [],
            services: [],
            serviceqty: 1,
        }
        this.state.serviceqtyArr = Array.apply(null, { length: this.state.serviceqty });
    }


    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });


    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    addService(serviceName, dataType, index) {
        console.log(serviceName, dataType, index, "DATA");
        let services = this.state.services;
        services[index] = serviceName;
        // extraService[index][type] = input;
        console.log(services, 'extraservice add');
        this.setState({ services });
    }

    onChange = (time, timeString) => {
        console.log(time, 'time', timeString, 'timeString');
        let daysBrTime = this.state.workingDaysNTime;
        if (time.brType == 'start') {
            daysBrTime[time.index].brStart = timeString
        }
        else {
            daysBrTime[time.index].brEnd = timeString
        }
        this.setState({ daysBrTime }, () => {
            console.log(this.state.daysBrTime)
        })
    }


    addServiceField = (input, type, index) => {
        let serviceqty = this.state.serviceqty
        serviceqty = ++serviceqty;
        let serviceqtyArr = Array.apply(null, { length: serviceqty });
        this.setState({ serviceqty, serviceqtyArr });
    }


    addExtraServiceField = () => {
        let data = this.state.serviceNameFieldQty

        // data.length >= 12 ? null : uploadButton


        if (data.length <= 7) {
            data.push(1)
        }
        this.setState({ serviceNameFieldQty: data });
    }

    delserviceField = (index) => {
        let services = this.state.services
        services.splice(index, 1)
        let serviceqty = this.state.serviceqty
        serviceqty = --serviceqty;
        let serviceqtyArr = Array.apply(null, { length: serviceqty });
        this.setState({ serviceqty, serviceqtyArr, services }, () => { console.log(this.state) });
    }


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const { open, email, weekDays, serviceNameFieldQty } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div style={{
                display: "flex", flexDirection: "column", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                // background: "yellow",
            }}>
                <StylistCard that={this} />

                <div>
                    <StylistModal that={this} />
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
