import React, { Component, } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { Form, Modal, Menu, Dropdown, message, } from "antd";

const { SubMenu } = Menu;
class ServiceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownTitle: "Select Category",
            serviceNameCheck: undefined,
        }
    }

    handleSubmit = () => {
        this.props.saveService()
        // const { that } = this.props;
        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         // console.log('Received values of form: ', values);
        //         // that.addSpecialOffer()
        //         this.props.saveService()
        //     }
        // });
    };

    handleMenuClick(e) {
        const { that } = this.props;
        message.info(e.item.props.children);
        this.setState({
            serviceNameCheck: e.item.props.children,
            dropdownTitle: e.item.props.children
        })
        if (e.item.props.children != "Others") {
            that.setState({
                categoryName: e.item.props.children,
            })
        }
        if (e.item.props.children === "Others") {
            that.setState({
                categoryName: "",
            })
        }
    }

    clearState() {
        this.setState({ serviceNameCheck: undefined })
        this.setState({ dropdownTitle: "Select Category" })
    }

    render() {
        const { categoryName, serviceName, price, extraService, extraServiceqtyArr, modal2Visible, modal2VisibleEdit } = this.props.modalState;
        const { that } = this.props;
        const { dropdownTitle, serviceNameCheck } = this.state;
        // const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                footer={null}
                centered
                visible={modal2Visible || modal2VisibleEdit}
                onOk={() => {
                    this.props.setModal2Visible(false,);
                    this.props.setModal2VisibleEdit(false);
                    this.setState({
                        dropdownTitle: "Select Category",
                        serviceNameCheck: undefined
                    })
                    this.clearState();
                }}
                onCancel={() => {
                    this.props.setModal2Visible(false);
                    this.props.setModal2VisibleEdit(false);
                    this.clearState();
                }}
            >
                <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", fontSize: "1.1vw", fontWeight: "bold", }}>
                    <div style={{ fontSize: 18 }}>
                        {
                            (modal2VisibleEdit) ? (<span>Edit Service</span>) : (<span>New Service</span>)
                        }
                    </div>
                    {
                        (serviceNameCheck === "Others") ? (
                            <div style={{
                                display: "flex", flex: 1,
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div style={{ display: "flex", flex: 2.2, marginLeft: 10 }}>
                                    <div style={{ width: "100%", }}>
                                        <input required type="text" className="form-control" placeholder="Category Name" aria-label="Category Name" aria-describedby="basic-addon1" value={categoryName} onChange={(e) => { that.setState({ categoryName: e.target.value }) }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flex: 2, marginLeft: 10 }}>
                                    <div style={{ width: "100%", }}>
                                        <input required type="text" className="form-control" placeholder="Service Name" aria-label="Service Name" aria-describedby="basic-addon1" value={serviceName} onChange={(e) => { that.setState({ serviceName: e.target.value }) }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flex: 1.5, justifyContent: "center", alignItems: "center", marginLeft: 10 }}>
                                    <div style={{ width: "100%", }}>
                                        <input required type="Number" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={price} onChange={(e) => { that.setState({ price: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>
                        ) :
                            <div style={{ display: "flex", flex: 1, flexDirection: "column", width: "100%", }}>
                                <div style={{ display: "flex", flex: 1.5, }} >
                                    <div style={{ width: "82%", }}>
                                        <Dropdown.Button
                                            overlay={
                                                <Menu style={{ width: 250, }} onClick={(e) => { this.handleMenuClick(e) }}>
                                                    <SubMenu title="Barbers">
                                                        <Menu.Item key="1" >Haircut</Menu.Item>
                                                        <Menu.Item key="2" >Style</Menu.Item>
                                                        <Menu.Item key="3" >Hair Color</Menu.Item>
                                                        <Menu.Item key="4" >Shave</Menu.Item>
                                                        <Menu.Item key="5" >Children Haircut</Menu.Item>
                                                        <Menu.Item key="6" >Wax</Menu.Item>
                                                        <Menu.Item key="7" >Others</Menu.Item>
                                                    </SubMenu>
                                                    <SubMenu title="Saloon">
                                                        <Menu.Item key="8" >Ladies Haircuts</Menu.Item>
                                                        <Menu.Item key="9" >Blow Dry</Menu.Item>
                                                        <Menu.Item key="10" >Hair Coloring</Menu.Item>
                                                        <Menu.Item key="11" >Men's Haircuts</Menu.Item>
                                                        <Menu.Item key="12" >Styling</Menu.Item>
                                                        <Menu.Item key="13" >Children's HairCuts</Menu.Item>
                                                        <Menu.Item key="14" >Treatments</Menu.Item>
                                                        <Menu.Item key="15" >Bridal & Weding</Menu.Item>
                                                        <Menu.Item key="16" >Others</Menu.Item>
                                                    </SubMenu>
                                                    <SubMenu title="Beauty saloon spy & others">
                                                        <Menu.Item key="17" >Nails</Menu.Item>
                                                        <Menu.Item key="18" >Brows & Lashes</Menu.Item>
                                                        <Menu.Item key="19" >Waxing</Menu.Item>
                                                        <Menu.Item key="20" >Body Treatment</Menu.Item>
                                                        <Menu.Item key="21" >Hair Treatments</Menu.Item>
                                                        <Menu.Item key="22" >Tanning</Menu.Item>
                                                        <Menu.Item key="23" >Men’s Grooming</Menu.Item>
                                                        <Menu.Item key="24" >Others</Menu.Item>
                                                    </SubMenu>
                                                </Menu>
                                            }
                                            placement="bottomCenter">
                                            {dropdownTitle}	&nbsp;
                                            </Dropdown.Button>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flex: 1, }}>
                                    <div style={{ width: "35%", marginTop: "2%" }}>
                                        <input required type="text" className="form-control" placeholder="Service Name" aria-label="Service Name" aria-describedby="basic-addon1" value={serviceName} onChange={(e) => { that.setState({ serviceName: e.target.value }) }} />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flex: 1, marginTop: "2%" }}>
                                    <div style={{ width: "35%", }}>
                                        <input required type="Number" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={price} onChange={(e) => { that.setState({ price: e.target.value }) }} />
                                    </div>
                                </div>
                            </div>
                    }

                    <div style={{ marginTop: 10, fontSize: 18 }}>
                        Extra Service
                    </div>

                    {
                        extraServiceqtyArr.map((key, index) => {
                            return (
                                <div key={index} style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                                    <div style={{ display: "flex", flex: 1.5, margin: "1.5%", }} >
                                        <div style={{ width: "100%", }}>
                                            <input required type="text" className="form-control" placeholder=" Service Name" aria-label=" Service Name" aria-describedby="basic-addon1" value={(extraService && extraService[index] && extraService[index].serviceName) ? extraService[index].serviceName : ''} onChange={(e) => { this.props.addExtraService(e.target.value, "serviceName", index) }} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flex: 1, margin: "1.5%", marginLeft: 40, }} >
                                        <div style={{ width: "80%", }}>
                                            <input required type="Number" className="form-control" placeholder="Price $" aria-label="Price $" aria-describedby="basic-addon1" value={(extraService && extraService[index] && extraService[index].price) ? extraService[index].price : ''} onChange={(e) => { this.props.addExtraService(e.target.value, "price", index) }} />
                                        </div>
                                    </div>
                                    <span
                                        className="buttonAdd buttonmatter"
                                        style={{ minWidth: '40px', width: "20%", marginRight: 10, }}
                                        onClick={() => this.props.delExtraService(index)}>
                                        <MdDeleteForever className="buttonmatter" style={{ color: "white", fontSize: 20, marginTop: 7, marginLeft: "35%" }} />
                                    </span>
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
                        <button onClick={() => this.handleSubmit()} className="buttonAdd" style={{ minWidth: 80, width: "35%", margin: "1%" }}>
                            <span className="buttonmatter" style={{ fontSize: 15, }}> {(modal2VisibleEdit) ? (<span>Update</span>) : (<span>Add</span>)}</span>
                        </button>
                        <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 80, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => { this.props.setModal2Visible(false); this.props.setModal2VisibleEdit(false); }}>Cancel</button>
                    </div>
                </div>
            </Modal >
        );
    }
}

const WrappedServiceModal = Form.create({ name: 'normal_login' })(ServiceModal);
export default WrappedServiceModal;