import React, { Component, } from 'react';

import { Button, DatePicker, version, Modal, Upload, Icon, message } from "antd";
import TextareaAutosize from 'react-textarea-autosize';


const fileList = [];
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


class SpecialOfferModal extends Component {
    render() {
        const { email } = this.props.modalState;
        const { that } = this.props;


        return (
            <Modal
                footer={null}
                // title="Vertically centered modal dialog"
                centered
                multiple={false}
                visible={that.state.modal2Visible}
                onOk={() => that.setModal2Visible(false)}
                onCancel={() => that.setModal2Visible(false)}
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
                                <input type="text" className="form-control" placeholder=" Special Offer Name" aria-label=" Special Offer Name" aria-describedby="basic-addon1" value={that.state.offerName} onChange={(e) => { that.setState({ offerName: e.target.value }) }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                            <div style={{ width: "100%", }}>
                                <input type="text" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={that.state.price} onChange={(e) => { that.setState({ price: e.target.value }) }} />
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

                            <TextareaAutosize style={{ width: "100%" }} maxRows={8} minRows={4} value={that.state.offerDescription} onChange={(e) => { that.setState({ offerDescription: e.target.value }) }} />

                        </div>
                    </div>



                    <div style={{ marginTop: 10, display: "flex", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", alignItems: "center", }}>

                        <button className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }} onClick={this.signin} >
                            <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span>
                        </button>

                        <button type="button" class="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => that.setModal2Visible(true)}>Edit Service</button>

                    </div>
                </div>
            </Modal>
        )
    }
}

export default SpecialOfferModal;