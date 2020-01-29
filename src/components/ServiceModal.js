import React, { Component, } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { Modal } from "antd";

class ServiceModal extends Component {
    render() {
        console.log(this.props, '****')
        const { email, serviceName, price, extraService, extraServiceqtyArr, modal2Visible } = this.props.modalState;
        const { that } = this.props;
        console.log(this.props, '****')
        return (
            <Modal
                footer={null}
                // title="Vertically centered modal dialog"
                centered
                visible={modal2Visible}
                onOk={() => this.props.setModal2Visible(false)}
                onCancel={() => this.props.setModal2Visible(false)}
            >
                <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", fontSize: "1.1vw", fontWeight: "bold", }}>
                    <div style={{ fontSize: 18 }}>
                        New Service
               </div>

                    <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>

                        <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                            <div style={{ width: "100%", }}>
                                <input type="text" className="form-control" placeholder=" Service Name" aria-label=" Service Name" aria-describedby="basic-addon1" value={serviceName} onChange={(e) => { that.setState({ serviceName: e.target.value }) }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                            <div style={{ width: "100%", }}>
                                <input type="text" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={price} onChange={(e) => { that.setState({ price: e.target.value }) }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >

                        </div>
                    </div>

                    <div style={{ marginTop: 10, fontSize: 18 }}>
                        Extra Service
                    </div>

                    {
                        extraServiceqtyArr.map((key, index) => {
                            console.log(index, 'indexindex', extraService)
                            return (
                                <div key={index} style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                                    <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                        <div style={{ width: "100%", }}>
                                            <input type="text" className="form-control" placeholder=" Service Name" aria-label=" Service Name" aria-describedby="basic-addon1" value={(extraService && extraService[index] && extraService[index].serviceName) ? extraService[index].serviceName : ''} onChange={(e) => { this.props.addExtraService(e.target.value, "serviceName", index) }} />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                        <div style={{ width: "100%", }}>
                                            <input type="text" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={(extraService && extraService[index] && extraService[index].price) ? extraService[index].price : ''} onChange={(e) => { this.props.addExtraService(e.target.value, "price", index) }} />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flex: 1, margin: "1.5%", }} >
                                        <button className="buttonAdd buttonmatter" style={{ minWidth: 80, width: "100%", justifyContent: "center", alignItems: "center" }} onClick={() => this.props.delExtraService(index)} >
                                            {/* <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span> */}
                                            <MdDeleteForever className="buttonmatter" style={{ color: "white", fontSize: 20, marginTop: 5 }} />
                                        </button>
                                    </div>
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

                        <button className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }} onClick={this.props.saveService} >
                            <span className="buttonmatter" style={{ fontSize: 15, }}>Add</span>
                        </button>

                        <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => this.props.setModal2Visible(false)}>Cancel</button>

                    </div>
                </div>
            </Modal>


        );
    }
}

export default ServiceModal;