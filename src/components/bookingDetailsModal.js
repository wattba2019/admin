import React, { Component, } from 'react';
import '../custom.css'
import { Modal } from "antd";
import "antd/dist/antd.css";
import { IoMdCheckmark } from 'react-icons/io';
import moment from 'moment';

class BookingDetailsModal extends Component {

    setModal2Visible(modal2Visible, bookingDetails) {
        this.props.setModal2Visible(modal2Visible, bookingDetails)
    }

    render() {
        const { modal2Visible, bookingDetails } = this.props.modalState;
        console.log(bookingDetails, "INSIDEMODAL")
        return (
            <div>
                <Modal
                    footer={null}
                    centered
                    visible={modal2Visible}
                    onOk={() => { this.props.setModal2Visible(false, bookingDetails) }}
                    onCancel={() => this.setModal2Visible(false, bookingDetails)}
                    bodyStyle={{ padding: 0, }}
                    width={"35%"}
                    minWidth={"35%"}
                >
                    <div style={{
                        display: "flex", flex: 1, flexDirection: "column",
                        // background: "red"
                    }}>
                        <div style={{
                            display: "flex", flex: 8, flexWrap: "wrap", minWidth: 140, flexDirection: "column", padding: "4%"
                            // background: "green"
                        }}>
                            <div style={{ fontWeight: "bold" }}>{bookingDetails.bookerDetails ? bookingDetails.bookerDetails.fullName : "N/a"}</div>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center",
                                // background: "green"
                            }}>

                                <div style={{ display: "flex", flex: 1, }}>
                                    {/* <p>Friday, Nov 1 2019</p> */}
                                    <p>Booking Date</p>
                                </div>

                                <div style={{ display: "flex", flex: 1, fontWeight: "bold" }}>
                                    {/* <p>{bookingDetails.bookingDateTime}</p> */}
                                    {/* <p>{new Date(bookingDetails.bookingDateTime).toDateString()}</p> */}
                                    <p> {moment(bookingDetails.bookingDateTime).format("dddd, MMMM Do YYYY")}</p>
                                </div>

                            </div>

                        </div>

                        <div style={{
                            display: "flex", flex: 2, flexDirection: "column", padding: "4%",
                            // background: "orange"
                        }}>
                            <div style={{ fontWeight: "bold" }}>Service Type</div>
                            {
                                (bookingDetails.requiredServices) ? (
                                    bookingDetails.requiredServices.map((key, index) => {
                                        return (
                                            <div key={index} style={{
                                                display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start",
                                                // background: "green"
                                            }}>
                                                <div>{key}</div>
                                            </div>

                                        )
                                    })
                                ) : null
                            }
                        </div>

                        <div style={{
                            display: "flex", flex: 6, flexDirection: "column", padding: "4%",
                            // background: "grey"
                        }}>
                            <div style={{ fontWeight: "bold", marginTop: 10 }}>Worker Assigned</div>

                            <div style={{
                                display: "flex", flex: 1, flexWrap: "wrap", flexDirection: "row",
                                // background: "red"
                            }}>
                                <div style={{
                                    display: "flex", flexDirection: "row", margin: '2%', width: 200,
                                    // background: "orange"
                                }}>
                                    <div style={{
                                        display: "flex", justifyContent: "center", alignItems: "center", width: 56, height: 56, borderRadius: 28,
                                        background: "#EC5F59"
                                    }}>
                                        <div style={{ display: "flex", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", }}>
                                            <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{
                                        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5%", width: "70%", marginLeft: 10,
                                        // background: "grey"
                                    }}>
                                        <div>
                                            {bookingDetails.stylistDetails ? bookingDetails.stylistDetails.fullname : "N/a"}
                                        </div>
                                        <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                            <IoMdCheckmark style={{ color: "white", }} />
                                        </div>
                                    </div>
                                </div>

                                {/* <div style={{
                                    display: "flex", flexDirection: "row", margin: '2%', width: 200,
                                    // background: "orange"
                                }}>
                                    <div style={{
                                        display: "flex", justifyContent: "center", alignItems: "center", width: 56, height: 56, borderRadius: 28,
                                        background: "#EC5F59"
                                    }}>
                                        <div style={{ display: "flex", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", }}>
                                            <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{
                                        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5%", width: "70%", marginLeft: 10,
                                        // background: "grey"
                                    }}>
                                        <div>
                                            John Doe
                                        </div>
                                        <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                            <IoMdCheckmark style={{ color: "white", }} />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="cardshadowWithButton" style={{
                            display: "flex", flex: 2, flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", zIndex: 1, width: "100%", marginTop: 10, minWidth: 200,
                            background: "#F7F8F8",
                        }}>

                            <button className="buttonAdd" style={{ minWidth: 140, width: "35%", margin: "1%" }} onClick={() => this.setModal2Visible(false, bookingDetails)} >
                                {/* <span className="buttonmatter" style={{ fontSize: 15, }}>Update Booking</span> */}
                                <span className="buttonmatter" style={{ fontSize: 15, }}>OK</span>
                            </button>

                            <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }}
                            // onClick={() => this.setModal2Visible(true)}
                            >
                                Cancle Booking
                            </button>

                        </div>
                    </div>
                </Modal>
            </div >

        )
    }
}

export default BookingDetailsModal;
