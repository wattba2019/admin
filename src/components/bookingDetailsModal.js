import React, { Component, } from 'react';
import '../custom.css'
import { Modal } from "antd";
import "antd/dist/antd.css";
import { IoMdCheckmark } from 'react-icons/io';
import moment from 'moment';
import { assignStylist } from "../store/action/action";
import { connect } from 'react-redux';

class BookingDetailsModal extends Component {

    setModal2Visible(modal2Visible, bookingDetails) {
        this.props.setModal2Visible(modal2Visible, bookingDetails)
    }

    cancledAndApproveBooking(bookingStatus, _id, modalBolean) {
        this.props.bookingStatus(bookingStatus, _id, modalBolean)
    }

    assignStylist(key, index, bookerId, bookingDetails) {

        let updatedStylist = bookingDetails.stylistId = key
        console.log(updatedStylist, "SelectedBarber")
        this.props.assignStylist(key._id, bookerId)
        this.setModal2Visible(false, bookingDetails)
    }

    render() {
        const { modal2Visible, bookingDetails, bookedService, bookedPackage } = this.props.modalState;
        console.log(bookingDetails.stylistId, "INSIDEMODAL")

        let selectedbookedService = []
        let selectedbookedPackage = []

        if (bookedService.length && bookingDetails.requiredServiceId) {
            for (let index = 0; index < bookedService.length; index++) {
                const element = bookedService[index]._id;
                const selectedService = bookedService[index];
                // console.log(element, "ELEMENT")
                for (let k = 0; k < bookingDetails.requiredServiceId.length; k++) {
                    const element1 = bookingDetails.requiredServiceId[k];
                    if (element === element1) {
                        // console.log(element, element1, selectedService, "ELEMENT")
                        selectedbookedService.push(selectedService)
                    }
                }
            }
        }

        if (bookedPackage.length && bookingDetails.requiredServiceId) {
            for (let index = 0; index < bookedPackage.length; index++) {
                const element = bookedPackage[index]._id;
                const selectedPack = bookedPackage[index];
                // console.log(element, "ELEMENT")
                for (let k = 0; k < bookingDetails.requiredServiceId.length; k++) {
                    const element1 = bookingDetails.requiredServiceId[k];
                    if (element === element1) {
                        // console.log(element, element1, selectedService, "ELEMENT")
                        selectedbookedPackage.push(selectedPack)
                    }
                }
            }
        }

        let stylistDetails = bookingDetails.stylistId

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
                    // height={600}
                    minWidth={"35%"}
                >
                    <div style={{
                        display: "flex", flex: 1, flexDirection: "column",
                        // background: "red"
                    }}>
                        <div style={{
                            display: "flex", flex: 6, flexWrap: "wrap", minWidth: 140, flexDirection: "column", padding: "4%",
                            // background: "orange"
                        }}>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row",
                                justifyContent: "flex-start", alignItems: "center",
                                // background: "green"
                            }}>
                                <div style={{ display: "flex", flexDirection: "column", flex: 2, }}>
                                    {
                                        bookingDetails.bookerId && bookingDetails.bookerName ?
                                            <div style={{ fontWeight: "bold" }}>{bookingDetails.bookerId ? bookingDetails.bookerName : "N/a"}</div>
                                            :
                                            <div style={{ fontWeight: "bold" }}>{bookingDetails.bookerId ? bookingDetails.bookerId.fullName : "N/a"}</div>
                                    }
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", flex: 2, fontWeight: "bold" }}>
                                    <div style={{ fontWeight: "bold", }}>{bookingDetails.bookerId ? bookingDetails.userPhoneNumber : "N/a"}</div>
                                </div>
                            </div>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row",
                                justifyContent: "flex-start", alignItems: "center",
                                // background: "green"
                            }}>

                                <div style={{ display: "flex", flexDirection: "column", flex: 2, }}>
                                    <p>Booking Date</p>
                                    <p>Booking Status</p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", flex: 2, fontWeight: "bold" }}>
                                    <p> {moment(bookingDetails.bookingDateTime).format("dddd, MMMM Do YYYY")}</p>
                                    {
                                        (bookingDetails.bookingStatus === "Pending") ? (
                                            <p style={{ color: "orange" }}>{bookingDetails.bookingStatus}</p>
                                        ) :
                                            (bookingDetails.bookingStatus === "Cancled") ? (
                                                <p style={{ color: "red" }}>{bookingDetails.bookingStatus}</p>
                                            ) : <p style={{ color: "green" }}>{bookingDetails.bookingStatus}</p>
                                    }
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: "flex", flex: 2, flexDirection: "row", padding: "4%",
                            // background: "orange"
                        }}>
                            {/* <div style={{ fontWeight: "bold" }}>Service Type</div>
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
                            </div> */}

                            <div style={{ display: "flex", flex: 1, flexDirection: "column", }}>
                                <div style={{ fontWeight: "bold" }}>Service Type</div>
                                {
                                    (selectedbookedService.length != 0) ? (
                                        selectedbookedService.map((key, index) => {
                                            return (
                                                <div key={index} style={{
                                                    display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", padding: 5
                                                    // background: "grey"
                                                }}>
                                                    <div style={{ fontSize: 15 }}>{key.serviceName}</div>
                                                    {/* <div>{key.price}</div> */}
                                                </div>

                                            )
                                        })
                                    ) :
                                        // <div style={{ fontSize: 15 }}>There is no data</div>
                                        (selectedbookedPackage.length != 0) ? (
                                            selectedbookedPackage.map((key, index) => {
                                                return (
                                                    <div key={index} style={{
                                                        display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start", padding: 5
                                                        // background: "grey"
                                                    }}>
                                                        <div style={{ fontSize: 15, fontWeight: "bold" }}>{key.packageName}</div>
                                                        <div>{key.packageDescription}</div>
                                                    </div>
                                                )
                                            })
                                        ) : <div style={{ fontSize: 15 }}>There is no data</div>
                                }
                            </div>

                            {
                                (selectedbookedService.length != 0) ? (

                                    <div style={{ display: "flex", flex: 1, flexDirection: "column", }}>
                                        <div style={{ fontWeight: "bold" }}>Extra Service</div>
                                        {
                                            (bookingDetails.requiredExtraServices) ? (
                                                bookingDetails.requiredExtraServices.map((key, index) => {
                                                    return (
                                                        <div key={index} style={{
                                                            display: "flex", flex: 1, flexDirection: "column", justifyContent: "flex-start", padding: 5
                                                            // background: "green"
                                                        }}>
                                                            <div>{key.serviceName}</div>
                                                        </div>
                                                    )
                                                })
                                            ) : <div style={{ fontSize: 15 }}>There is no data</div>
                                        }

                                    </div>
                                ) : null
                            }
                        </div>

                        <div style={{
                            display: "flex", flex: 6, flexWrap: "wrap", minWidth: 140, flexDirection: "column", padding: "4%",
                            // background: "orange"
                        }}>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row",
                                justifyContent: "flex-start", alignItems: "center",
                                // background: "green"
                            }}>

                                {
                                    (stylistDetails != null) ? (
                                        <div style={{ display: "flex", flexDirection: "column", flex: 2, }}>
                                            <div style={{ fontWeight: "bold", marginTop: 10 }}>Worker Assigned</div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", margin: '2%', width: "95%",
                                                // background: "orange"
                                            }}>
                                                <div style={{
                                                    display: "flex", justifyContent: "center", alignItems: "center", width: 56, height: 56, borderRadius: 28,
                                                    background: "#EC5F59"
                                                }}>
                                                    <div style={{ display: "flex", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", }}>
                                                        {
                                                            (bookingDetails && bookingDetails.stylistId && bookingDetails.stylistId.coverImage) ? (
                                                                <img src={bookingDetails.stylistId.coverImage}
                                                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                                                />
                                                            ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                                                />
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{
                                                    display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5%", width: "70%", marginLeft: 10,
                                                    // background: "grey"
                                                }}>
                                                    <div>
                                                        {bookingDetails.stylistId ? bookingDetails.stylistId.fullname : "N/a"}
                                                    </div>
                                                    <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                        <IoMdCheckmark style={{ color: "white", }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }

                                <div style={{ display: "flex", flexDirection: "column", flex: 2, fontWeight: "bold" }}>
                                    <div style={{ fontWeight: "bold", marginTop: 10 }}>Special instructions</div>
                                    <div style={{
                                        display: "flex", alignItems: "center", height: 56,
                                    }}>
                                        <div style={{ fontWeight: "bold" }}>{bookingDetails.bookerId ? bookingDetails.instruction != "" ? bookingDetails.instruction : "N/a" : "N/a"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            (stylistDetails === null) ? (
                                <>
                                    <div style={{ fontWeight: "bold", marginTop: 10, marginLeft: "2%" }}>Worker Assigned</div>
                                    <div style={{
                                        display: "flex", flex: 1,
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        padding: "2%"
                                        // background: "green"
                                    }}>
                                        {
                                            this.props.stylists && this.props.stylists.map((key, index) => {
                                                return (
                                                    <div style={{ display: "flex", flexDirection: "column", width: "50%", }}>
                                                        <div style={{
                                                            display: "flex", flexDirection: "row", margin: '2%', width: "95%",
                                                            // background: "orange"
                                                        }}>
                                                            <div style={{
                                                                display: "flex", justifyContent: "center", alignItems: "center", width: 56, height: 56, borderRadius: 28,
                                                                background: "#EC5F59"
                                                            }}>
                                                                <div style={{ display: "flex", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", }}>
                                                                    {
                                                                        (key && key.coverImage && key.coverImage) ? (
                                                                            <img src={key.coverImage}
                                                                                style={{ width: 50, height: 50, borderRadius: 25 }}
                                                                            />
                                                                        ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                                            style={{ width: 50, height: 50, borderRadius: 25 }}
                                                                            />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div style={{
                                                                display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5%", width: "70%", marginLeft: 10,
                                                                // background: "grey"
                                                            }}>
                                                                <div>
                                                                    {key.fullname ? key.fullname : "N/a"}
                                                                </div>
                                                                <div
                                                                    onClick={() => this.assignStylist(key, index, bookingDetails._id, bookingDetails)}
                                                                    style={{ display: "flex", backgroundColor: "#d3d3d3", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, }}>
                                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            ) : null
                        }


                        {/* <div style={{
                            display: "flex", flex: 6, flexDirection: "column", padding: "4%",
                            background: "grey"
                        }}>
                            
                            <div style={{ fontWeight: "bold", marginTop: 10 }}>Worker Assigned</div>

                            <div style={{
                                display: "flex", flex: 1, flexWrap: "wrap", flexDirection: "row",
                                background: "red"
                            }}>
                                <div style={{
                                    display: "flex", flexDirection: "row", margin: '2%', width: "45%",
                                    background: "orange"
                                }}>
                                    <div style={{
                                        display: "flex", justifyContent: "center", alignItems: "center", width: 56, height: 56, borderRadius: 28,
                                        background: "#EC5F59"
                                    }}>
                                        <div style={{ display: "flex", width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", }}>
                                            {
                                                (bookingDetails && bookingDetails.stylistId && bookingDetails.stylistId.coverImage) ? (
                                                    <img src={bookingDetails.stylistId.coverImage}
                                                        style={{ width: 50, height: 50, borderRadius: 25 }}
                                                    />
                                                ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                    style={{ width: 50, height: 50, borderRadius: 25 }}
                                                    />
                                            }
                                        </div>
                                    </div>

                                    <div style={{
                                        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5%", width: "70%", marginLeft: 10,
                                        // background: "grey"
                                    }}>
                                        <div>
                                            {bookingDetails.stylistId ? bookingDetails.stylistId.fullname : "N/a"}
                                        </div>
                                        <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                            <IoMdCheckmark style={{ color: "white", }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Footer */}
                        <div className="cardshadowWithButton" style={{
                            display: "flex", flex: 2, flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", zIndex: 1, width: "100%", marginTop: 10, minWidth: 200,
                            background: "#F7F8F8",
                        }}>


                            {
                                (bookingDetails.bookingStatus != "Approved" && bookingDetails.bookingStatus != "Complete") ? (
                                    <button className="buttonAdd" style={{ minWidth: 140, width: "35%", margin: "1%" }}
                                        // onClick={() => this.setModal2Visible(false, bookingDetails)}
                                        onClick={() => this.cancledAndApproveBooking("Approved", bookingDetails._id, false)}
                                    >
                                        {/* <span className="buttonmatter" style={{ fontSize: 15, }}>Update Booking</span> */}
                                        <span className="buttonmatter" style={{ fontSize: 15, }}>Approve Booking</span>
                                    </button>
                                ) :
                                    (bookingDetails.bookingStatus != "Complete") ? (
                                        <button className="buttonAdd" style={{ minWidth: 140, width: "35%", margin: "1%" }}
                                            // onClick={() => this.setModal2Visible(false, bookingDetails)}
                                            onClick={() => this.cancledAndApproveBooking("Complete", bookingDetails._id, false)}
                                        >
                                            {/* <span className="buttonmatter" style={{ fontSize: 15, }}>Update Booking</span> */}
                                            <span className="buttonmatter" style={{ fontSize: 15, }}>Complete</span>
                                        </button>
                                    ) : null

                            }


                            {
                                (bookingDetails.bookingStatus != "Cancled" && bookingDetails.bookingStatus != "Complete") ? (
                                    <button type="button" className="btn btn-light" style={{ width: "35%", margin: "1%", minWidth: 140, borderWidth: 0.5, borderColor: "grey", height: 40 }}
                                        onClick={() => this.cancledAndApproveBooking("Cancled", bookingDetails._id, false)}
                                    >
                                        Cancle Booking
                                    </button>
                                ) : null
                            }

                        </div>
                    </div>
                </Modal>
            </div >

        )
    }
}

// export default BookingDetailsModal;

function mapStateToProp(state) {
    return ({
        // bseUrl: state.root.bseUrl,
        // uid: state.root.userProfile._id,
        stylists: state.root.stylists,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        assignStylist: (stylistId, bookerId) => {
            dispatch(assignStylist(stylistId, bookerId));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(BookingDetailsModal);
