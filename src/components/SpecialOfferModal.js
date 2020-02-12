import React, { Component, } from 'react';

import { Button, Modal, Upload, Icon, message } from "antd";
import TextareaAutosize from 'react-textarea-autosize';
import { Form, Input, Checkbox } from 'antd';

class SpecialOfferModal extends Component {
    state = {
        // imageFile: {},
        imageError: false,
        offerDescription: ""
    }

    uploadProps = {
        listType: 'picture',
        multiple: false,
        // required: true
    };

    beforeUploadEvent(file) {
        // alert("Work")
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            message.error('Image must smaller than 10MB!');
        }
        console.log(file, 'filelll')
        this.setState({
            imageError: false
        })
        return false;
    }


    handleSubmit = e => {
        const { that } = this.props;
        if (Object.keys(that.state.imageFile).length === 0 && that.state.imageFile.constructor === Object) {
            this.setState({
                imageError: true
            })
        }
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                console.log('Received values of form: ', values);
                // that.addSpecialOffer()

                if (Object.keys(that.state.imageFile).length === 0 && that.state.imageFile.constructor === Object) {
                    // alert("Empty OBJECT")
                    this.setState({
                        imageError: true
                    })
                }

                else {
                    // alert("Not Empty OBJECT")
                    that.addSpecialOffer()
                    this.setState({
                        imageError: false
                    })
                }

            }
        });
    };

    render() {
        const { email } = this.props.modalState;
        const { that } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                footer={null}
                // title="Vertically centered modal dialog"
                centered
                multiple={false}
                visible={that.state.modal2Visible || that.state.modal2VisibleEdit}
                onOk={() => {
                    this.props.setModal2Visible(false);
                    this.props.setModal2VisibleEdit(false);
                }}
                onCancel={() => {
                    this.props.setModal2Visible(false);
                    this.props.setModal2VisibleEdit(false);
                }}
            >
                <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", fontSize: "1.1vw", fontWeight: "bold", }}>

                    <div style={{ fontSize: 18, marginTop: 10 }}>
                        {
                            (that.state.modal2VisibleEdit) ? (<span>Edit Offer</span>) : (<span>New Offer</span>)
                        }
                    </div>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div style={{ margin: "1%", marginTop: 10 }}>
                            <Upload {...this.uploadProps}
                                onChange={(info) => {
                                    const { status } = info.file;
                                    console.log(info, 'image');
                                    if (info.fileList.length > 0) {
                                        that.setState({ imageFile: info.file, })
                                    }
                                    else {
                                        that.setState({ imageFile: {}, })
                                    }
                                }}
                                beforeUpload={this.beforeUploadEvent.bind(this)}>
                                {
                                    Object.keys(that.state.imageFile).length > 0 ? null : (
                                        <Button>
                                            <Icon type="upload" /> Upload Image
                                        </Button>
                                    )
                                }
                            </Upload>
                        </div>

                        {
                            (this.state.imageError === true) ? (<span style={{ color: "#F6222D", fontSize: 14, margin: "0.5%", }}>Please attach offer image!</span>) : (null)
                        }

                        <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Form.Item>
                                {getFieldDecorator('SpecialOfferName', {
                                    rules: [
                                        { required: true, message: 'Please type your offer name!' },
                                        { max: 26, message: 'Offer must be max 26 characters.' },
                                    ],
                                    // rules: [{ max: 26, message: 'Offer must be max 26 characters.' },],
                                })(
                                    <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                        <div style={{ width: "100%", }}>
                                            <input type="text" className="form-control" placeholder=" Special Offer Name" aria-label=" Special Offer Name" aria-describedby="basic-addon1" value={that.state.offerName} onChange={(e) => { that.setState({ offerName: e.target.value }) }} />
                                        </div>
                                    </div>

                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('Price', {
                                    rules: [
                                        { required: true, message: 'Please type offer price!' },
                                        { max: 7, message: 'Price must be max 7 characters.' },
                                    ],
                                    // rules: [{ max: 7, message: 'Price must be max 7 characters.' },],
                                })(
                                    <div style={{ display: "flex", flex: 1, margin: "2.5%", marginLeft: 15 }} >
                                        <div style={{ width: "50%", }}>
                                            <input type="Number" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={that.state.price} onChange={(e) => { that.setState({ price: e.target.value }) }} />
                                        </div>
                                    </div>
                                )}
                            </Form.Item>

                            <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                            </div>
                        </div>

                        <div style={{ marginTop: 0, fontSize: 18 }}>
                            Desciption
                        </div>

                        <Form.Item>
                            {getFieldDecorator('Description', {
                                rules: [
                                    { required: true, message: 'Please type offer description!' },
                                    { max: 120, message: 'Description must be max 120 characters.' }
                                ]
                                // rules: [{ max: 120, message: 'Description must be max 120 characters.' },],
                            })(
                                <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                                    <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                        <TextareaAutosize style={{ width: "100%" }} maxRows={8} minRows={2} value={that.state.offerDescription}
                                            onChange={(e) => { that.setState({ offerDescription: e.target.value }) }}
                                        />
                                    </div>
                                </div>
                            )}
                        </Form.Item>

                        <div style={{ marginTop: 10, display: "flex", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", alignItems: "center", }}>
                            <button htmlType="submit" className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }}
                            // onClick={() => that.addSpecialOffer()}
                            >
                                <span className="buttonmatter" style={{ fontSize: 15, }}>{(that.state.modal2VisibleEdit) ? (<span>Update Special Offer</span>) : (<span>Add Special Offer</span>)}</span>
                            </button>

                            <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => { this.props.setModal2Visible(false); this.props.setModal2VisibleEdit(false); }}>Cancel</button>
                        </div>
                    </Form>



                    {/* <div style={{ margin: "1.5%" }}>
                        <Upload {...this.uploadProps}
                            onChange={(info) => {
                                const { status } = info.file;
                                console.log(info, 'image');
                                if (info.fileList.length > 0) {
                                    that.setState({ imageFile: info.file })
                                }
                                else {
                                    that.setState({ imageFile: {} })
                                }
                            }}
                            beforeUpload={this.beforeUploadEvent.bind(this)}>
                            {
                                Object.keys(that.state.imageFile).length > 0 ? null : (
                                    <Button>
                                        <Icon type="upload" /> Upload Image
                               </Button>
                                )
                            }
                        </Upload>

                    </div>

                    <div style={{ fontSize: 18, marginTop: 10 }}>
                        {
                            (that.state.modal2VisibleEdit) ? (<span>Edit Offer</span>) : (<span>New Offer</span>)
                        }
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

                        <button className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }} onClick={() => that.addSpecialOffer()} >
                            <span className="buttonmatter" style={{ fontSize: 15, }}>{(that.state.modal2VisibleEdit) ? (<span>Update Special Offer</span>) : (<span>Add Special Offer</span>)}</span>
                        </button>

                        <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => { this.props.setModal2Visible(false); this.props.setModal2VisibleEdit(false); }}>Cancel</button>

                    </div> */}
                </div>
            </Modal >
        )
    }
}

const WrappedSpecialOfferModal = Form.create({ name: 'normal_login' })(SpecialOfferModal);
// ReactDOM.render(<WrappedSpecialOfferModal />, mountNode);

export default WrappedSpecialOfferModal;