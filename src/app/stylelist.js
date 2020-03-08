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
import { addStylist, getStylists, updateStylist, getGallery, getServices } from "../store/action/action";

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
            plainOptions: ['Loading',],
            checkedList: [],
            indeterminate: true,
            checkAll: false,

            errDesc: '',
            errFullName: '',
            loader: false,
            showerror: false,
            stylistFullName: '',
            designation: '',
            gender: 'Male',
            stylistDescription: '',
            modal2Visible: false,
            modal2VisibleEdit: false,
            search: [],

            workingDaysNTime: [
                {
                    day: 'Monday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Tuesday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Wednesday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Thursday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Friday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Saturday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Sunday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
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
        this.props.getGallery((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');
        this.props.getServices((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');

    }

    setModal2VisibleEdit(modal2VisibleEdit, editStylist, indexToEdit) {
        if (modal2VisibleEdit) {
            console.log(editStylist, 'editService');
            let stylistFullName = editStylist.fullname;
            let designation = editStylist.designation;
            let gender = editStylist.gender;
            let stylistDescription = editStylist.description;
            let services = editStylist.serviceProvided;
            let servicesSelected = editStylist.serviceProvided;
            let serviceqty = editStylist.serviceProvided.length;
            let serviceqtyArr = Array.apply(null, { length: serviceqty });
            let workingDaysNTime = editStylist.workingDays;
            this.setState({ modal2VisibleEdit, editStylist, stylistFullName, designation, gender, stylistDescription, checkedList: servicesSelected, services, serviceqty, serviceqtyArr, indexToEdit, workingDaysNTime });
        }
        else {
            let stylistFullName = '';
            let designation = '';
            let gender = 'Male';
            let stylistDescription = '';
            let services = [];
            let serviceqty = 1;
            let indexToEdit = undefined;
            let serviceqtyArr = Array.apply(null, { length: serviceqty });
            let workingDaysNTime = [
                {
                    day: 'Monday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Tuesday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Wednesday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Thursday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Friday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Saturday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
                {
                    day: 'Sunday', brStart: '10:00 AM', brEnd: '10:00 PM', working: true,
                },
            ];
            this.setState({ modal2VisibleEdit, editStylist, stylistFullName, designation, gender, stylistDescription, services, serviceqty, serviceqtyArr, indexToEdit, workingDaysNTime });
        }
    }



    onChangeCheckBox = (checkedList, index) => {
        const { services } = this.state
        var n = services.includes(checkedList);

        let cloneSelectedService = services
        console.log(checkedList, index, services, cloneSelectedService, n, "ONCHANGECHECKBOXZ")

        if (n === false) {
            cloneSelectedService.push(checkedList);

        }

        else {
            for (var i = 0; i < cloneSelectedService.length; i++) {
                if (cloneSelectedService[i] === checkedList) { cloneSelectedService.splice(i, 1); }
            }
            this.setState({
                services: cloneSelectedService
            })
        }
        console.log(cloneSelectedService, "AFTERPUSHDATA")
    };



    // onCheckAllChange = e => {
    //     const { plainOptions } = this.state
    //     this.setState({
    //         checkedList: e.target.checked ? plainOptions : [],
    //         indeterminate: false,
    //         checkAll: e.target.checked,
    //     }, () => {
    //         this.addService(this.state.checkedList)
    //     }
    //     );
    // };

    // onChangeCheckBox = checkedList => {
    //     const { plainOptions } = this.state
    //     this.setState({
    //         checkedList,
    //         indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
    //         checkAll: checkedList.length === plainOptions.length,
    //     }, () => {
    //         this.addService(this.state.checkedList)
    //     });

    // };

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
        // console.log(serviceName, dataType, index, "DATA");
        // let services = this.state.services;
        // services[index] = serviceName;
        // // extraService[index][type] = input;
        // console.log(services, 'extraservice add');
        // this.setState({ services });


        console.log(serviceName, "DATA");
        // let services = this.state.services;
        // services[index] = serviceName;
        console.log(serviceName, 'extraservice add');
        this.setState({ services: serviceName });
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
            gender: this.state.gender,
            designation: this.state.designation,
            description: this.state.stylistDescription,
            userId: (this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254',
            workingDays: this.state.workingDaysNTime,
            serviceProvided: this.state.services,
        }
        if (this.state.modal2Visible) {
            if (this.state.fullname === '') {
                this.setState({
                    errFullName: "Please Type Full Name"
                })
            }
            else if (this.state.stylistDescription === '') {
                this.setState({
                    errDesc: "Please Type Description"
                })
            }
            else {
                this.props.addStylist(stylist);
                this.setState({
                    errDesc: '',
                    errFullName: ''
                })
            }
        }
        else {
            stylist._id = this.state.editStylist._id;
            this.props.updateStylist(stylist, this.state.indexToEdit);
        }
        let serviceqtyArr = Array.apply(null, { length: 1 });

        this.setState({
            stylistFullName: "",
            gender: "Male",
            designation: "",
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

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps.services, "RECEIVING_PROPS_PARRENTCOMP")
        let cloneService = nextProps.services;
        let serviceOptionsArr = [];
        if (cloneService && cloneService.length != 0) {
            for (let index = 0; index < cloneService.length; index++) {
                const element = cloneService[index].serviceName;
                serviceOptionsArr.push(element)
                console.log(element, "ELEMENT")

            }
        }
        console.log(serviceOptionsArr, "CLONE")
        this.setState({
            plainOptions: serviceOptionsArr
        })

    }


    render() {

        console.log(this.state.services, "RENDER")
        //this.props.stylists

        let stylists = [];
        if (this.props.stylists.length > 0) {
            if (this.state.search.length) {
                const searchPattern = new RegExp(this.state.search.map(term => `(?=.*${term})`).join(''), 'i');
                console.log(searchPattern, 'searchPattern', this.state.search)

                stylists = this.props.stylists.filter(stylist => {
                    // console.log(stylist, 'stylist')
                    return stylist.fullname.match(searchPattern)
                });
            } else {
                stylists = this.props.stylists;
            }
        }
        // console.log(stylists, 'stylistsstylists')


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
                background: "#F7F8F8",
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
                                onChange={(e) => this.setState({ search: e.target.value.split(' ') })}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <button style={{ minWidth: 120, width: "20%" }} className="buttonAdd" onClick={() => this.setModal2Visible(true)}  >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Add StyList</span>
                    </button>
                </div>

                <StylistCard that={this} stylists={stylists} />

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
        stylists: state.root.stylists,
        services: state.root.services

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
        getGallery: (userId) => {
            dispatch(getGallery(userId));
        },
        updateStylist: (stylist, indexToEdit) => {
            dispatch(updateStylist(stylist, indexToEdit));
        },
        getServices: (uid) => {
            dispatch(getServices(uid));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(StyleList);
