import React, { Component, } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
import { Button, DatePicker, version, Modal, Input, TimePicker, Upload, Icon, } from "antd";

import TextareaAutosize from 'react-textarea-autosize';


class StylistModal extends Component {

    render() {
        const { that } = this.props
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Modal
                footer={null}
                // title="Vertically centered modal dialog"
                centered
                visible={that.state.modal2Visible}
                onOk={() => that.setModal2Visible(false)}
                onCancel={() => that.setModal2Visible(false)}
                bodyStyle={{ height: 500 }}
                width={"75%"}
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
                                            return (
                                                <div key={index} style={{
                                                    display: "flex", flex: 1, color: "black", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 30,
                                                    // background: "green"
                                                }}>
                                                    {/* Day */}
                                                    <div style={{
                                                        display: "flex", flex: 2, fontSize: 14, fontWeight: "normal",
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
                                                            placeholder={"Time"}
                                                            // onChange={this.onChange}
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
                                                            style={{ width: 95, margin: "1%" }}
                                                            use12Hours format="h:mm a"
                                                            placeholder={"Time"}
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

                                <div className="clearfix" style={{ marginTop: 10, }}>
                                    <Upload
                                        multiple={true}
                                        showUploadList={{ showDownloadIcon: false }}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={that.state.fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {that.state.fileList.length >= 12 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={that.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={that.state.previewImage} />
                                    </Modal>
                                </div>


                            </div>

                        </div>


                    </div>

                    {/* Footer */}
                    <div className="cardshadowWithButton" style={{
                        display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 2, zIndex: 1, width: "100%",
                        background: "#F7F8F8",
                    }}>

                        <button className="buttonAdd" style={{ minWidth: 140, width: "20%", margin: "1%" }} onClick={this.signin} >
                            <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span>
                        </button>

                        <button type="button" class="btn btn-light" style={{ width: "20%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>

                    </div>
                </div>
            </Modal>


        );
    }
}


export default StylistModal;