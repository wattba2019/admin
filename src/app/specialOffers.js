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

import "antd/dist/antd.css";
import TextareaAutosize from 'react-textarea-autosize';


const fileList = [
    // {
    //     uid: '-1',
    //     name: 'xxx.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //     uid: '-2',
    //     name: 'yyy.png',
    //     status: 'error',
    // },
];


const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    defaultFileList: [...fileList],

    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


class SpecialOffers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            email: "",
            modal2Visible: true,
        }
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
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
                    <button style={{ minWidth: 120, width: "20%" }} className="buttonAdd" onClick={this.signin} >
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
                        <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                            <div class="btn btn-light" style={{ display: "flex", width: "35%", height: "35%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Modal
                        footer={null}
                        // title="Vertically centered modal dialog"
                        centered
                        multiple={false}
                        visible={this.state.modal2Visible}
                        onOk={() => this.setModal2Visible(false)}
                        onCancel={() => this.setModal2Visible(false)}
                    >
                        <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", fontSize: "1.1vw", fontWeight: "bold", }}>

                            <div style={{ margin: "1.5%" }}>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> Upload Image
                                    </Button>
                                </Upload>

                            </div>

                            <div style={{ fontSize: 18, marginTop: 10 }}>
                                New Offer
                           </div>

                            <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>

                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                    <div style={{ width: "100%", }}>
                                        <input type="text" className="form-control" placeholder=" Special Offer Name" aria-label=" Special Offer Name" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                    <div style={{ width: "100%", }}>
                                        <input type="text" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >

                                </div>
                            </div>

                            <div style={{ marginTop: 10, fontSize: 18 }}>
                                Desciption
                           </div>

                            <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>

                                <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >

                                    <TextareaAutosize style={{ width: "100%" }} maxRows={8} minRows={4} />

                                </div>
                            </div>



                            <div style={{ marginTop: 10, display: "flex", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", alignItems: "center", }}>

                                <button className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }} onClick={this.signin} >
                                    <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span>
                                </button>

                                <button type="button" class="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>

                            </div>
                        </div>
                    </Modal>
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

export default connect(mapStateToProp, mapDispatchToProp)(SpecialOffers);
