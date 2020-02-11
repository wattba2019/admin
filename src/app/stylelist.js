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
import { addStylist, getStylists, updateStylist } from "../store/action/action";

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
            modal2Visible: true,
            modal2VisibleEdit: false,

            workingDaysNTime: [
                {
                    day: 'Monday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Tuesday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Wednesday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Thursday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Friday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Saturday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Sunday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
            ],
            // weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            serviceNameFieldQty: [1],
            previewVisible: false,
            previewImage: '',
            fileList: [],
            services: [],
            serviceqty: 1,
            editStylist: {},
            indexToEdit: undefined
        }
        this.state.serviceqtyArr = Array.apply(null, { length: this.state.serviceqty });

        this.props.getStylists((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');

    }

    setModal2VisibleEdit(modal2VisibleEdit, editStylist, indexToEdit) {
        if (modal2VisibleEdit) {
            console.log(editStylist, 'editService');
            let stylistFullName = editStylist.fullname;
            let stylistDescription = editStylist.description;
            let services = editStylist.serviceProvided;
            let serviceqty = editStylist.serviceProvided.length;
            let serviceqtyArr = Array.apply(null, { length: serviceqty });
            let workingDaysNTime = editStylist.workingDays;
            this.setState({ modal2VisibleEdit, editStylist, stylistFullName, stylistDescription, services, serviceqty, serviceqtyArr, indexToEdit, workingDaysNTime });
        }
        else {
            let stylistFullName = '';
            let stylistDescription = '';
            let services = [];
            let serviceqty = 1;
            let indexToEdit = undefined;
            let serviceqtyArr = Array.apply(null, { length: serviceqty });
            let workingDaysNTime = [
                {
                    day: 'Monday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Tuesday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Wednesday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Thursday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Friday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Saturday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Sunday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
            ];
            this.setState({ modal2VisibleEdit, editStylist, stylistFullName, stylistDescription, services, serviceqty, serviceqtyArr, indexToEdit, workingDaysNTime });
        }
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

    saveStylist() {
        console.log('saved service called');
        let stylist = {
            fullname: this.state.stylistFullName,
            description: this.state.stylistDescription,
            userId: (this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254',
            workingDays: this.state.workingDaysNTime,
            serviceProvided: this.state.services,
        }
        if (this.state.modal2Visible) {
            this.props.addStylist(stylist);
        }
        else {
            stylist._id = this.state.editStylist._id;
            this.props.updateStylist(stylist, this.state.indexToEdit);
        }
        let serviceqtyArr = Array.apply(null, { length: 1 });

        this.setState({
            stylistFullName: "",
            stylistDescription: "",
            services: [],
            serviceqty: 1,
            modal2Visible: false,
            modal2VisibleEdit: false,
            serviceqtyArr,
            editStylist: {},
            indexToEdit: undefined,
            workingDaysNTime: [
                {
                    day: 'Monday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Tuesday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Wednesday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Thursday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Friday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Saturday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
                {
                    day: 'Sunday', brStart: '12:00 PM', brEnd: '01:00 PM', working: true,
                },
            ]
        })
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

                    <button style={{ minWidth: 120, width: "20%" }} className="buttonAdd" onClick={() => this.setModal2Visible(true)}  >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Add StyList</span>
                    </button>
                </div>

                <StylistCard that={this} stylists={this.props.stylists} />

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
        uid: state.root.userProfile._id,
        stylists: state.root.stylists

    })
}
function mapDispatchToProp(dispatch) {
    return ({
        addStylist: (stylist) => {
            dispatch(addStylist(stylist));
        },
        getStylists: (userId) => {
            dispatch(getStylists(userId));
        },
        updateStylist: (stylist, indexToEdit) => {
            dispatch(updateStylist(stylist, indexToEdit));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(StyleList);
