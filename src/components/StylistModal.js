import "../index.css";
import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { IoMdCheckmark } from 'react-icons/io';
import { Modal, TimePicker, Upload, Icon, message, Form, Radio } from "antd";
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';
import { uploadGallery, updateGallery } from "../store/action/action";

class StylistModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gArr: [],
            fileList: [],
            errUploadImgLimit: false,
            value: "Male",
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { that, stylists, editStylist } = props
        if (that.state.modal2VisibleEdit && editStylist != undefined) {
            let arr = []
            for (var i = 0; i < editStylist.galleryImages.length; i++) {
                const element = editStylist.galleryImages[i];
                const obj = {
                    uid: i,
                    name: 'xxx.png',
                    status: 'done',
                    url: element,
                }
                arr.push(obj)
            }
            this.setState({
                fileList: arr,
                gArr: arr,
            })
        }
    }

    onChangeRadio = e => {
        const { that } = this.props
        this.setState({
            value: e.target.value,
        });
        that.setState({
            gender: e.target.value
        })
    };

    beforeUploadEvent(file, fileList) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Image must smaller than 10MB!');
        }
        return false;
    }

    uploadGallery = () => {
        const { gArr } = this.state
        let fileList = this.state.fileList
        if (gArr.length === 0) {
            this.props.uploadGallery(fileList, this.props.userProfile._id)
        }
        else {
            this.props.updateGallery(fileList, this.props.userProfile._id)
        }
        this.setState({
            fileList: [],
            gArr: [],
        })
    }

    render() {
        const { that, stylists, editStylist } = this.props
        const { fileList, errUploadImgLimit, } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
            </div>
        );
        return (
            <Modal
                footer={null}
                centered
                visible={that.state.modal2Visible || that.state.modal2VisibleEdit}
                onOk={() => { that.setModal2Visible(false); this.setState({ fileList: [] }) }}
                onCancel={() => { that.setModal2Visible(false); that.setModal2VisibleEdit(false); this.setState({ fileList: [] }) }}
                bodyStyle={{ height: 500 }}
                width={"80%"}
                minWidth={"60%"}
                bodyStyle={{ padding: 0 }}
            >
                <div style={{ display: "flex", flex: 1, width: "100%", flexDirection: "column", fontSize: "1.1vw", fontWeight: "bold", background: "red" }}>

                    {/* Body */}
                    <div style={{ display: "flex", flex: 8, flexWrap: "wrap", minWidth: 140, }}>
                        {/* 1st card */}
                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column", flex: 3, background: "#F7F8F8", padding: "2.5%", }}>
                            <div style={{ fontSize: 18 }}>
                                New Stylist
                            </div>
                            {/* Full Name */}
                            <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10, }}>
                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                    <div style={{ width: "70%", minWidth: 200 }}>
                                        <input required type="text" className="form-control" placeholder="Full Name" aria-label="Full Name" aria-describedby="basic-addon1" value={that.state.stylistFullName} onChange={(e) => { that.setState({ stylistFullName: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>
                            {/* Designation */}
                            <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10, }}>
                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                    <div style={{ width: "70%", minWidth: 200 }}>
                                        <input required type="text" className="form-control" placeholder="Designation" aria-label="Designation" aria-describedby="basic-addon1" value={that.state.designation} onChange={(e) => { that.setState({ designation: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>
                            {/* Gender */}
                            <div style={{ display: "flex", flex: 1, width: "100%", marginTop: 10, marginLeft: 10 }}>
                                <Radio.Group onChange={this.onChangeRadio} value={that.state.gender}>
                                    <Radio value={"Male"}>Male</Radio>
                                    <Radio value={"Female"}>Female</Radio>
                                </Radio.Group>
                            </div>
                            {/* description */}
                            <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", fontSize: "1.1vw", fontWeight: "bold", }}>
                                <div style={{ marginTop: 10, fontSize: 18 }}>
                                    Desciption
                                </div>

                                <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                                    <div style={{ display: "flex", flex: 1, margin: "1.5%", borderRadius: 25 }} >
                                        <TextareaAutosize style={{ width: "100%" }} maxRows={8} minRows={4} value={that.state.stylistDescription} onChange={(e) => { that.setState({ stylistDescription: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>

                            {/* working days */}
                            <div style={{ display: "flex", flex: 1, flexDirection: "row", height: 500, }}>
                                <div style={{ display: "flex", flexDirection: "column", flex: 1.5, height: 300, marginTop: 10 }}>
                                    <div style={{ display: "flex", }}>
                                        <div style={{ display: "flex", flex: 2 }}>
                                            <p style={{ fontSize: 14 }}>Working Days</p>
                                        </div>
                                        <div style={{ display: "flex", flex: 1 }}>
                                        </div>
                                        <div style={{ display: "flex", flex: 3 }}>
                                            <p style={{ fontSize: 14 }}>Break</p>
                                        </div>
                                    </div>
                                    {
                                        that.state.workingDaysNTime.map((dayBrTime, index) => {
                                            return (
                                                <div key={index} style={{ display: "flex", flex: 1, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 30, }}>
                                                    {/* Day */}
                                                    <div style={{ display: "flex", flex: 1, fontSize: 14, fontWeight: "normal" }}>
                                                        {dayBrTime.day}
                                                    </div>
                                                    {/* CheckBox */}
                                                    <div style={{ display: "flex", flex: 1, fontWeight: "normal", justifyContent: "center", alignItems: "center", }}>
                                                        <div
                                                            onClick={that.handleShopOpenStatus.bind(that, dayBrTime)}
                                                            style={(dayBrTime.working) ? { display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 } : { display: "flex", height: 20, width: 20, backgroundColor: "#d3d3d3", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}
                                                        >
                                                            <IoMdCheckmark style={{ color: "white", }} />
                                                        </div>
                                                    </div>
                                                    {/* Time Picker */}
                                                    <div style={{ display: "flex", flex: 3, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, }}>
                                                        <TimePicker
                                                            style={{ width: 95, margin: "1%" }}
                                                            use12Hours format="h:mm a"
                                                            defaultValue={moment(that.state.workingDaysNTime[index].brStart, 'h:mm a')}
                                                            onChange={(e, f) => {
                                                                e.index = index;
                                                                e.brDaysTime = dayBrTime;
                                                                e.brType = 'start'
                                                                that.onChange(e, f);
                                                            }}
                                                        />
                                                        <span style={{ margin: "1%", fontWeight: "normal" }}>to</span>
                                                        <TimePicker
                                                            defaultValue={moment(that.state.workingDaysNTime[index].brEnd, 'h:mm a')}
                                                            style={{ width: 95, margin: "1%" }}
                                                            use12Hours format="h:mm a"
                                                            onChange={(e, f) => {
                                                                e.index = index;
                                                                e.brDaysTime = dayBrTime;
                                                                e.brType = 'end'
                                                                that.onChange(e, f);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        {/* 2nd card */}
                        <div className="cardshadowcenter" style={{ display: "flex", flexDirection: "column", flex: 2, padding: "2.5%", zIndex: 1, background: "#FFFFFF" }}>
                            <div style={{ display: "flex", flex: 10, flexDirection: "column" }}>
                                <div style={{ fontSize: 18 }}>
                                    Services provided
                                </div>
                                {
                                    that.state.plainOptions.map((service, index) => {
                                        return (
                                            <div key={index} style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10, minWidth: "80%", }}>
                                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                                    <div style={{ width: "95%", }}>
                                                        <input disabled type="text" className="form-control" placeholder="Service Name" aria-label="Service Name" aria-describedby="basic-addon1" value={service} />
                                                    </div>
                                                </div>
                                                <div style={{ cursor: "pointer", display: "flex", height: 28, width: 28, borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, backgroundColor: that.state.services.includes(service) ? "#49BE56" : "grey", }}
                                                    onClick={() => {
                                                        that.onChangeCheckBox(service, index)
                                                        this.setState({ flagRender: true })
                                                    }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* 3rd card */}
                        <div style={{ display: "flex", flexDirection: "column", flex: 3, padding: "2.5%", background: "#F7F8F8" }}>
                            <div style={{ display: "flex", flex: 10, flexDirection: "column" }}>
                                <div style={{ fontSize: 18 }}>
                                    Gallery
                                </div>
                                {
                                    (errUploadImgLimit != false) ? (
                                        <div style={{ fontSize: 10, color: "red" }}>
                                            You can not upload more then 12 picture.
                                        </div>
                                    ) : <div style={{ fontSize: 10, color: "grey" }}>
                                            You can add 12 picture in Gallery.
                                        </div>
                                }
                                <div className="clearfix" style={{ marginTop: 10, }}>
                                    {that.state.modal2Visible &&
                                        <Upload
                                            action=""
                                            showUploadList={{ showPreviewIcon: false }}
                                            defaultFileList={fileList}
                                            listType={'picture-card'}
                                            multiple={false}
                                            onChange={(info) => {
                                                const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png' || (info.file.url);
                                                if (!isJpgOrPng) {
                                                    this.setState({ fileList: [] })
                                                    that.setModal2Visible(false)
                                                    that.setModal2VisibleEdit(false)
                                                } else {
                                                    if (info.fileList.length <= 12 && fileList.length <= 12) {
                                                        this.setState({
                                                            fileList: info.fileList,
                                                            errUploadImgLimit: false
                                                        })
                                                    }
                                                    else {
                                                        this.setState({
                                                            fileList: [],
                                                            errUploadImgLimit: true
                                                        })
                                                    }
                                                }
                                            }}
                                            beforeUpload={this.beforeUploadEvent.bind(this)}>
                                            {fileList.length >= 12 ? null : uploadButton}
                                        </Upload>
                                    }
                                    {
                                        (fileList.length && !that.state.modal2Visible) ? (
                                            <Upload
                                                action=""
                                                showUploadList={{ showPreviewIcon: false }}
                                                defaultFileList={fileList}
                                                listType={'picture-card'}
                                                multiple={false}
                                                onChange={(info) => {
                                                    const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png' || (info.file.url);
                                                    if (!isJpgOrPng) {
                                                        this.setState({ fileList: [] })
                                                        that.setModal2Visible(false)
                                                        that.setModal2VisibleEdit(false)
                                                    } else {
                                                        if (info.fileList.length <= 12 && fileList.length <= 12) {
                                                            this.setState({
                                                                fileList: info.fileList,
                                                                errUploadImgLimit: false
                                                            })
                                                        }
                                                        else {
                                                            this.setState({
                                                                fileList: [],
                                                                errUploadImgLimit: true
                                                            })
                                                        }
                                                    }
                                                }}
                                                beforeUpload={this.beforeUploadEvent.bind(this)}>
                                                {fileList.length >= 12 ? null : uploadButton}
                                            </Upload>
                                        ) : null
                                    }

                                    {
                                        (fileList.length == 0 && !that.state.modal2Visible) ? (
                                            <Upload
                                                action=""
                                                showUploadList={{ showPreviewIcon: false }}
                                                defaultFileList={fileList}
                                                listType={'picture-card'}
                                                multiple={false}
                                                onChange={(info) => {
                                                    const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png' || (info.file.url);
                                                    if (!isJpgOrPng) {
                                                        this.setState({ fileList: [] })
                                                        that.setModal2Visible(false)
                                                        that.setModal2VisibleEdit(false)
                                                    } else {
                                                        if (info.fileList.length <= 12 && fileList.length <= 12) {
                                                            this.setState({
                                                                fileList: info.fileList,
                                                                errUploadImgLimit: false
                                                            })
                                                        }
                                                        else {
                                                            this.setState({
                                                                fileList: [],
                                                                errUploadImgLimit: true
                                                            })
                                                        }
                                                    }
                                                }}
                                                beforeUpload={this.beforeUploadEvent.bind(this)}>
                                                {fileList.length >= 12 ? null : uploadButton}
                                            </Upload>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="cardshadowWithButton" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 2, zIndex: 1, width: "100%", background: "#F7F8F8", }}>
                        <button className="buttonAdd" style={{ minWidth: 140, width: "20%", margin: "1%" }} onClick={that.saveStylist.bind(that, fileList)} >
                            <span className="buttonmatter" style={{ fontSize: 15, }}>{(that.state.modal2Visible) ? 'Add Stylist' : 'Save Stylist'}</span>
                        </button>
                        {/* <button type="button" className="btn btn-light" style={{ width: "20%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => { that.setModal2Visible(false); that.setModal2VisibleEdit(false) }}>Cancel</button> */}
                        {
                            that.state.modal2VisibleEdit &&
                            <button type="button" className="btn btn-light" style={{ width: "20%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => { that.deleteStylist(false, editStylist._id, stylists) }}>Discard</button>
                        }
                    </div>
                </div>
            </Modal>
        );
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        uid: state.root.userProfile._id,
        userProfile: state.root.userProfile,
        gallery: state.root.gallery,
        services: state.root.services,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        uploadGallery: (data, id) => {
            dispatch(uploadGallery(data, id));
        },
        updateGallery: (data, id) => {
            dispatch(updateGallery(data, id));
        },
    })
}
const WrappedSpecialOfferModal = Form.create({ name: 'normal_login' })(connect(mapStateToProp, mapDispatchToProp)(StylistModal));
export default WrappedSpecialOfferModal;