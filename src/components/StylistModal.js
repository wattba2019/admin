import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
import { Modal, TimePicker, Upload, Icon, message } from "antd";
import moment from 'moment';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import { uploadGallery, updateGallery } from "../store/action/action";
import { Form, } from 'antd';

class StylistModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gArr: [],
            fileList: [],
            errUploadImgLimit: false
        }
    }

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
        let fileList = this.state.fileList
        if (fileList.length == 0) {
            this.props.uploadGallery(fileList, this.props.userProfile._id)
        }
        else {
            this.props.updateGallery(fileList, this.props.userProfile._id)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps.gallery, "RECEIVING_PROPS")
        let arr = []
        for (var i = 0; i < nextProps.gallery.length; i++) {
            const element = nextProps.gallery[i];
            // console.log(element, "ELEMENT")
            const obj = {
                uid: i,
                name: 'xxx.png',
                status: 'done',
                url: element,
            }
            arr.push(obj)
        }
        // console.log(arr, "ARR")
        this.setState({
            fileList: arr,
            gArr: arr
        })
    }

    // removeImg(data) {
    //     let cloneData = this.state.gArr
    //     let updatedData = cloneData.splice(data.uid, 1)
    //     this.setState({s
    //         fileList: cloneData,
    //     })
    // }

    render() {
        const { that } = this.props
        const { fileList, gArr, errUploadImgLimit } = this.state;
        console.log(fileList, "INSIDE_RENDER")
        const uploadButton = (
            <div>
                <Icon type="plus" />
                {/* <div style={{ fontSize: 12 }} className="ant-upload-text">Add Image</div> */}
            </div>
        );
        return (
            <Modal
                footer={null}
                // title="Vertically centered modal dialog"
                centered
                visible={that.state.modal2Visible || that.state.modal2VisibleEdit}
                onOk={() => that.setModal2Visible(false)}
                onCancel={() => { that.setModal2Visible(false); that.setModal2VisibleEdit(false) }}
                bodyStyle={{ height: 500 }}
                width={"80%"}
                minWidth={"60%"}
                bodyStyle={{ padding: 0, }}
            >
                <div style={{ display: "flex", flex: 1, width: "100%", flexDirection: "column", fontSize: "1.1vw", fontWeight: "bold", background: "red" }}>

                    {/* Body */}
                    <div style={{ display: "flex", flex: 8, flexWrap: "wrap", minWidth: 140, background: "yellow" }}>
                        {/* 1st card */}

                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column", flex: 3, background: "#F7F8F8", padding: "2.5%" }}>
                            <div style={{ fontSize: 18 }}>
                                New Stylist
                         </div>

                            {/* Full Name */}
                            <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10, }}>
                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                    <div style={{ width: "70%", minWidth: 200 }}>
                                        <input type="text" className="form-control" placeholder=" Full Name" aria-label=" Full Name" aria-describedby="basic-addon1" value={that.state.stylistFullName} onChange={(e) => { that.setState({ stylistFullName: e.target.value }) }} />
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
                                        <TextareaAutosize style={{ width: "100%" }} maxRows={8} minRows={4} value={that.state.stylistDescription} onChange={(e) => { that.setState({ stylistDescription: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>

                            {/* working days */}
                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row", height: 500,
                                // background: "red"
                            }}>

                                <div style={{
                                    display: "flex", flexDirection: "column", flex: 1.5, height: 300, marginTop: 10
                                    // background: "red"
                                }}>
                                    <div style={{
                                        display: "flex",
                                        // background: "yellow"
                                    }}>
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
                                            // console.log(dayBrTime,'dayBrTimedayBrTime')
                                            return (
                                                <div key={index} style={{
                                                    display: "flex", flex: 1, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 30,
                                                    // background: "green"
                                                }}>
                                                    {/* Day */}
                                                    <div style={{
                                                        display: "flex", flex: 1, fontSize: 14, fontWeight: "normal",
                                                        // background: "orange"
                                                    }}>
                                                        {dayBrTime.day}
                                                    </div>

                                                    {/* CheckBox */}

                                                    <div style={{ display: "flex", flex: 1, fontWeight: "normal", justifyContent: "center", alignItems: "center", }}>
                                                        <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                            <IoMdCheckmark style={{ color: "white", }} />
                                                        </div>
                                                    </div>

                                                    {/* Time Picker */}

                                                    <div style={{
                                                        display: "flex", flex: 3, flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40,
                                                        // background: "yellow"
                                                    }}>
                                                        <TimePicker
                                                            style={{ width: 95, margin: "1%" }}
                                                            use12Hours format="h:mm a"
                                                            // placeholder={"Time"}
                                                            // onChange={this.onChange}
                                                            defaultValue={moment(that.state.workingDaysNTime[index].brStart, 'h:mm a')}
                                                            onChange={(e, f) => {
                                                                console.log(e, f, index, dayBrTime, 'e, f, index, dayBrTime');
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
                                                            // placeholder={"Time"}
                                                            onChange={(e, f) => {
                                                                console.log(e, f, index, dayBrTime, 'e, f, index, dayBrTime');
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

                        <div className="cardshadowcenter" style={{
                            display: "flex", flexDirection: "column", flex: 2, padding: "2.5%", zIndex: 1,
                            background: "#FFFFFF"
                        }}>
                            <div style={{
                                display: "flex", flex: 10, flexDirection: "column",
                                // background: "red"
                            }}>
                                <div style={{ fontSize: 18 }}>
                                    Services provided
                                </div>

                                {
                                    that.state.serviceqtyArr.map((service, index) => {
                                        return (
                                            <div key={index} style={{
                                                display: "flex", width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10, minWidth: "80%",
                                                // background: "red"
                                            }}>
                                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                                    <div style={{ width: "95%", }}>
                                                        <input type="text" className="form-control" placeholder="Service Name" aria-label="Service Name" aria-describedby="basic-addon1" value={(that.state.services && that.state.services[index]) ? that.state.services[index] : ''} onChange={(e) => { that.addService(e.target.value, "serviceName", index) }} />
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", height: 28, width: 28, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                                <div onClick={() => that.delserviceField(index)} style={{ display: "flex", height: 28, width: 28, backgroundColor: "#EC5F59", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, marginLeft: "5%" }}>
                                                    <MdDeleteForever className="buttonmatter" style={{ color: "white", fontSize: 20, }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "column",
                                // background: "green"
                            }}>
                                <div style={{ marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <div onClick={that.addServiceField} className="btn btn-light" style={{ display: "flex", backgroundColor: "#EC5F59", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                        <AiOutlinePlus style={{ color: "#ffffff", fontSize: 25 }} />
                                    </div>
                                    <div style={{ marginLeft: "2%", fontSize: 14 }}>
                                        Add Extra Service
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* 3rd card */}

                        <div style={{
                            display: "flex", flexDirection: "column", flex: 3, padding: "2.5%",
                            background: "#F7F8F8"
                            // background: "red"
                        }}>
                            <div style={{
                                display: "flex", flex: 10, flexDirection: "column",
                                // background: "red"
                            }}>
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
                                    <Upload
                                        // fileList={fileList}
                                        // action={() => this.uploadGallery()}
                                        showUploadList={{
                                            showPreviewIcon: false,
                                            // showRemoveIcon: false
                                        }}
                                        defaultFileList={fileList}
                                        action=""
                                        listType={'picture-card'}
                                        multiple={true}
                                        onChange={(info) => {
                                            // console.log(info, 'On_change_Function');
                                            const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png' || (info.file.url);
                                            if (!isJpgOrPng) {
                                                // alert("NOT_JPEG")
                                                this.setState({ fileList: [] })
                                                that.setModal2Visible(false)
                                                that.setModal2VisibleEdit(false)

                                            } else {
                                                // alert("JPEG_and_url")
                                                if (info.fileList.length <= 12 && fileList.length <= 12) {
                                                    this.setState({
                                                        fileList: info.fileList,
                                                        errUploadImgLimit: false
                                                    })
                                                }
                                                else {
                                                    this.setState({ fileList: [], errUploadImgLimit: true })
                                                }
                                            }
                                        }}
                                        // onRemove={(data) => this.removeImg(data)}
                                        beforeUpload={this.beforeUploadEvent.bind(this)}
                                    >
                                        {fileList.length >= 12 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={that.state.previewImage} />
                                    </Modal>
                                </div>
                            </div>
                            <div style={{
                                display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center",
                                // background: "green"
                            }}>
                                <button className="buttonAdd" style={{ minWidth: 140, width: "30%", height: 35, margin: "1%", }}
                                    onClick={() => this.uploadGallery()}
                                >
                                    <span className="buttonmatter" style={{ fontSize: 15, }}>{'Upload Image'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="cardshadowWithButton" style={{
                        display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 2, zIndex: 1, width: "100%",
                        background: "#F7F8F8",
                    }}>

                        <button className="buttonAdd" style={{ minWidth: 140, width: "20%", margin: "1%" }} onClick={that.saveStylist.bind(that)} >
                            <span className="buttonmatter" style={{ fontSize: 15, }}>{(that.state.modal2Visible) ? 'Add Stylist' : 'Save Stylist'}</span>
                        </button>

                        <button type="button" className="btn btn-light" style={{ width: "20%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => { that.setModal2Visible(false); that.setModal2VisibleEdit(false) }}>Cancel</button>

                    </div>
                </div>
            </Modal >


        );
    }
}


function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        userProfile: state.root.userProfile,
        gallery: state.root.gallery,
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
// export default connect(mapStateToProp, mapDispatchToProp)(StylistModal);
// export default StylistModal;
const WrappedSpecialOfferModal = Form.create({ name: 'normal_login' })(connect(mapStateToProp, mapDispatchToProp)(StylistModal));
export default WrappedSpecialOfferModal;