import React, { Component, } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { Form, Modal } from "antd";

class ServiceModal extends Component {

    handleSubmit = e => {
        const { that } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // that.addSpecialOffer()
                this.props.saveService()
            }
        });
    };

    render() {
        // console.log(this.props, '****')
        const { serviceName, price, extraService, extraServiceqtyArr, modal2Visible, modal2VisibleEdit } = this.props.modalState;
        const { that } = this.props;
        const { getFieldDecorator } = this.props.form;

        console.log(that.state, 'that.state')
        return (
            <Modal
                footer={null}
                // title="Vertically centered modal dialog"
                centered
                visible={modal2Visible || modal2VisibleEdit}
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
                    <div style={{ fontSize: 18 }}>
                        {
                            (modal2VisibleEdit) ? (<span>Edit Service</span>) : (<span>New Service</span>)
                        }
                    </div>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Form.Item>
                                {getFieldDecorator('ServiceName', {
                                    rules: [
                                        { required: false, message: 'Please type service name!' },
                                        { max: 26, message: 'Service Name must be maximum 26 characters.' }
                                    ],
                                })(
                                    <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                        <div style={{ width: "82%", }}>
                                            <input required type="text" className="form-control" placeholder="Service Name" aria-label="Service Name" aria-describedby="basic-addon1" value={serviceName} onChange={(e) => { that.setState({ serviceName: e.target.value }) }} />
                                        </div>
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item>
                                {getFieldDecorator('price', {
                                    rules: [
                                        { required: false, message: 'Please type price!' },
                                        { max: 7, message: 'Price must be max 7 characters.' }
                                    ],
                                })(
                                    <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                        <div style={{ width: "65%", }}>
                                            <input required type="Number" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={price} onChange={(e) => { that.setState({ price: e.target.value }) }} />
                                        </div>
                                    </div>
                                )}
                            </Form.Item>

                            <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                            </div>
                        </div>

                        <div style={{ marginTop: 10, fontSize: 18 }}>
                            Extra Service
                        </div>

                        {
                            extraServiceqtyArr.map((key, index) => {
                                // console.log(index, 'indexindex', extraService)
                                return (
                                    <div key={index} style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                                        <Form.Item>
                                            {getFieldDecorator('serviceName' + index, {
                                                rules: [
                                                    { required: false, message: 'Please type service name!' },
                                                    { max: 26, message: 'Service Name must be maximum 26 characters.' }
                                                ],
                                            })(
                                                <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                                    <div style={{
                                                        width: "100%",
                                                    }}>
                                                        <input required type="text" className="form-control" placeholder=" Service Name" aria-label=" Service Name" aria-describedby="basic-addon1" value={(extraService && extraService[index] && extraService[index].serviceName) ? extraService[index].serviceName : ''} onChange={(e) => { this.props.addExtraService(e.target.value, "serviceName", index) }} />
                                                    </div>
                                                </div>
                                            )}
                                        </Form.Item>

                                        <Form.Item>
                                            {getFieldDecorator('price' + index, {
                                                rules: [
                                                    { required: false, message: 'Please type price!' },
                                                    { max: 7, message: 'Price must be max 7 characters.' }
                                                ],

                                            })(
                                                <div style={{ display: "flex", flex: 1, margin: "1.5%", marginLeft: 40, }} >
                                                    <div style={{ width: "80%", }}>
                                                        <input required type="Number" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={(extraService && extraService[index] && extraService[index].price) ? extraService[index].price : ''} onChange={(e) => { this.props.addExtraService(e.target.value, "price", index) }} />
                                                    </div>
                                                </div>
                                            )}
                                        </Form.Item>

                                        {/* <Form.Item> */}
                                            <span className="buttonAdd buttonmatter" style={{ minWidth: '40px', width: "20%", justifyContent: "center", alignItems: "center", marginRight: 10, position: 'relative', top: '-12px' }}
                                                onClick={() => this.props.delExtraService(index)}
                                            >
                                                <MdDeleteForever className="buttonmatter" style={{ color: "white", fontSize: 20, marginTop: 7 }} />
                                            </span>
                                        {/* </Form.Item> */}
                                    </div>
                                )
                            })
                        }



                        <div onClick={this.props.addExtraServiceField} style={{ marginTop: 10, display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div className="btn btn-light" style={{ display: "flex", backgroundColor: "#EC5F59", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <AiOutlinePlus style={{ color: "#ffffff", fontSize: 25 }} />
                            </div>
                            <div style={{ marginLeft: "2%", fontSize: 14 }}>
                                Add Extra Service
                        </div>
                        </div>

                        <div style={{ marginTop: 10, display: "flex", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", alignItems: "center", }}>

                            <button htmlType="submit" className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }}
                            // onClick={this.props.saveService}
                            >
                                <span className="buttonmatter" style={{ fontSize: 15, }}> {(modal2VisibleEdit) ? (<span>Update</span>) : (<span>Add</span>)}</span>
                            </button>

                            <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => { this.props.setModal2Visible(false); this.props.setModal2VisibleEdit(false); }}>Cancel</button>

                        </div>
                    </Form>
                </div>
            </Modal>


        );
    }
}

const WrappedServiceModal = Form.create({ name: 'normal_login' })(ServiceModal);

export default WrappedServiceModal;