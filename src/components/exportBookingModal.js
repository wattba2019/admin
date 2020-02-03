import React, { Component, } from 'react';
import '../custom.css'
import { Modal } from "antd";
import { Menu, Dropdown, Button, Icon, message } from 'antd';

import "antd/dist/antd.css";
import { IoMdCheckmark } from 'react-icons/io';

class ExportBooking extends Component {

    modalExport(modalExport) {
        this.props.modalExport(modalExport)
    }

    handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    }

    handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    }

    render() {
        const { modalExport, } = this.props.modalState;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    Last Month
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="user" />
                    2 Month
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="user" />
                    3 Month
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Modal
                    footer={null}
                    centered
                    visible={modalExport}
                    onOk={() => { this.props.modalExport(false) }}
                    onCancel={() => this.modalExport(false)}
                    bodyStyle={{ padding: 0, }}
                    width={"35%"}
                    minWidth={"35%"}
                >
                    <div style={{
                        display: "flex", flex: 1, flexDirection: "column",
                        // background: "red"
                    }}>
                        <div style={{
                            display: "flex", flex: 8, flexWrap: "wrap", minWidth: 140, flexDirection: "column", padding: "4%",
                            // background: "green"
                        }}>
                            <h4>
                                Export Booking Information
                            </h4>

                            <div style={{ display: "flex", flexDirection: "row", width: "100%", marginTop: 10, justifyContent: "space-between" }} id="components-dropdown-demo-dropdown-button">
                                <div style={{ display: "flex", flexDirection: "column", width: "68%", }}>
                                    Duration
                                    <Dropdown overlay={menu}>
                                        <Button style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                                            <span>
                                                Duration
                                        </span>
                                            <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", width: "29%", }}>
                                    Format
                                    <Dropdown overlay={menu}>
                                        <Button style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                                            <span>
                                                PDF
                                        </span>
                                            <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>

                            <button className="buttonAdd" style={{ minWidth: 140, width: "35%", marginTop: 10 }} onClick={this.signin} >
                                <span className="buttonmatter" style={{ fontSize: 15, }}>Export</span>
                            </button>
                        </div>




                    </div>
                </Modal>
            </div >

        )
    }
}

export default ExportBooking;
