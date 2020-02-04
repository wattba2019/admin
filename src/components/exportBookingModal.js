import React, { Component, } from 'react';
import '../custom.css'
import { Modal } from "antd";
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import "antd/dist/antd.css";

class ExportBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: "Duration",
            format: "Format",
        }
    }
    modalExport(modalExport) {
        this.props.modalExport(modalExport)
    }

    handleDurationmenu = (e) => {
        message.info(e.item.props.children[1]);
        console.log('click', e.item.props.children[1]);
        this.setState({
            duration: e.item.props.children[1]
        })
    }
    handleFormatMenu = (e) => {
        message.info(e.item.props.children[1]);
        console.log('click', e.item.props.children[1]);
        this.setState({
            format: e.item.props.children[1]
        })
    }

    render() {
        const { modalExport, } = this.props.modalState;
        const { format, duration } = this.state;

        const Durationmenu = (
            <Menu onClick={this.handleDurationmenu}>
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

        const FormatMenu = (
            <Menu onClick={this.handleFormatMenu}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    PDF
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="user" />
                    XLSX
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
                                    <Dropdown overlay={Durationmenu}>
                                        <Button style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                                            <span>
                                                {duration}
                                            </span>
                                            <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", width: "29%", }}>
                                    Format
                                    <Dropdown overlay={FormatMenu}>
                                        <Button style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
                                            <span>
                                                {format}
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
