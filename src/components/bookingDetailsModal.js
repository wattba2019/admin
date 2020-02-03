import React, { Component, } from 'react';
import '../custom.css'
import { Modal } from "antd";
import "antd/dist/antd.css";
import { IoMdCheckmark } from 'react-icons/io';

class BookingDetailsModal extends Component {

    setModal2Visible(modal2Visible) {
        this.props.setModal2Visible(modal2Visible)
    }

    render() {
        const { modal2Visible, } = this.props.modalState;
        return (
            <div>
                <Modal
                    footer={null}
                    centered
                    visible={modal2Visible}
                    onOk={() => { this.props.setModal2Visible(false) }}
                    onCancel={() => this.setModal2Visible(false)}
                    bodyStyle={{ padding: 0, }}
                // bodyStyle={{ height: 500 }}
                >
                    <div style={{
                        display: "flex", flex: 1, flexDirection: "column",
                        // background: "red"
                    }}>
                        <div style={{
                            display: "flex", flex: 8, flexWrap: "wrap", minWidth: 140, flexDirection: "column", padding: "4%"
                            // background: "green"
                        }}>
                            <div style={{ fontWeight: "bold" }}>David Ukwa</div>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center",
                                // background: "green"
                            }}>

                                <div style={{ display: "flex", flex: 1, }}>
                                    <p>Friday, Nov 1 2019</p>
                                </div>

                                <div style={{ display: "flex", flex: 1, fontWeight: "bold" }}>
                                    <p>Friday, Nov 1 2019</p>
                                </div>

                            </div>

                        </div>

                        <div style={{
                            display: "flex", flex: 2, flexDirection: "column", padding: "4%",
                            // background: "orange"
                        }}>
                            <div style={{ fontWeight: "bold" }}>Service Type</div>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start",
                                // background: "green"
                            }}>
                                <div>Service 1</div>
                            </div>
                            <div style={{
                                display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start",
                                // background: "green"
                            }}>
                                <div>Service 1</div>
                            </div>
                        </div>

                        <div style={{
                            display: "flex", flex: 6, flexDirection: "column", padding: "4%",
                            // background: "grey"
                        }}>
                            <div style={{ fontWeight: "bold", marginTop: 10 }}>Worker Assigned</div>

                            <div style={{
                                display: "flex", flex: 1, flexWrap: "wrap", flexDirection: "row",
                                background: "red"
                            }}>
                                <div style={{
                                    display: "flex", flex: 1, flexDirection: "row", margin: '2%', width: 50,
                                    background: "orange"
                                }}>
                                    <div style={{
                                        display: "flex", flex: 1, justifyContent: "center", alignItems: "center",
                                        background: "yellow"
                                    }}>
                                        <div style={{ width: 50, height: 50, borderRadius: 25, }}>
                                            <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{
                                        display: "flex", flex: 6, justifyContent: "space-between", alignItems: "center", padding: "5%",
                                        background: "grey"
                                    }}>
                                        <div>
                                            John Doe
                                        </div>
                                        <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                            <IoMdCheckmark style={{ color: "white", }} />
                                        </div>

                                    </div>
                                </div>





                            </div>
                        </div>

                        {/* Footer */}
                        <div className="cardshadowWithButton" style={{
                            display: "flex", flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center", zIndex: 1, width: "100%", marginTop: 10,
                            background: "#F7F8F8",
                        }}>

                            <button className="buttonAdd" style={{ minWidth: 140, width: "20%", margin: "1%" }} onClick={this.signin} >
                                <span className="buttonmatter" style={{ fontSize: 15, }}>Save</span>
                            </button>

                            <button type="button" class="btn btn-light" style={{ width: "20%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>

                        </div>
                    </div>
                </Modal>
            </div>

        )
    }
}

export default BookingDetailsModal;
