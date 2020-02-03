import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials } from "../store/action/action";
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import BookingRaw from '../components/BookingRaw';
import BookingDetailsModal from '../components/bookingDetailsModal';
import "antd/dist/antd.css";
import { DatePicker } from 'antd';
import ReactSwipe from 'react-swipe';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingDataWithDate: [1, 1, ],
            modal2Visible: true,
        }
        this.setModal2Visible = this.setModal2Visible.bind(this);
    }

    datePicker = (date, dateString) => {
        console.log(date, dateString);
    }

    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    render() {
        const { bookingDataWithDate } = this.state
        let reactSwipeEl;

        return (
            <div style={{
                display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                flexDirection: "column",
                background: "#F7F8F8",
            }}>
                {/* Headers */}

                <div style={{
                    display: "flex", flex: 1, width: "90%", justifyContent: "space-between",
                    padding: 5,
                    //   backgroundColor: "green", 
                }}>
                    <div style={{
                        flex: 6, minWidth: 200, alignItems: "center", display: "flex"
                        // background: "blue",
                    }}>
                        <p style={{ margin: "2%", textAlign: "left", fontSize: 18, fontWeight: "bold", }}>Booking Calender</p>
                    </div>
                    <div style={{ flex: 4, justifyContent: "flex-end", display: "flex", flexDirection: "row", }}>
                        <button class="btn btn-light" style={{ minWidth: 140, width: "60%", margin: "2%" }} className="buttonAdd" onClick={this.signin} >
                            <span className="buttonmatter" style={{ fontSize: 12, }}>Refresh</span>
                        </button>
                        <button type="button" class="btn btn-light" style={{ width: "60%", margin: "2%", borderWidth: 0.5, borderColor: "grey", height: 40 }}>Export Bookings</button>
                    </div>
                </div>

                {/* Body */}

                {/* Date picker */}

                <div style={{
                    display: "flex", flex: 1, width: "90%", justifyContent: "space-between",
                    padding: 5,
                }}>
                    <div style={{ flex: 6, minWidth: 200, alignItems: "center", display: "flex" }}>
                        <DatePicker style={{ margin: "2%", }} onChange={() => this.datePicker()} />
                    </div>
                    <div style={{ flex: 4, minWidth: 200, justifyContent: "flex-end", display: "flex", flexDirection: "row", }}>
                    </div>
                </div>


                <div style={{
                    display: "flex", flex: 1, width: "90%",
                    paddingLeft: 15, flexDirection: "column"
                }}>

                    {/* Next and Previous Day */}

                    <div style={{
                        display: "flex", justifyContent: "space-between", width: "15%", minWidth: 150, color: "#4A4A4A", paddingBottom: 5, fontSize: 11
                    }}>
                        <a onClick={() => reactSwipeEl.prev()} style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                            <FaAngleLeft style={{ fontSize: 14, color: "#F45671" }} />
                            Previous Day</a>
                        <a onClick={() => reactSwipeEl.next()} style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                            Next Day
                            <FaAngleRight style={{ fontSize: 14, color: "#F45671" }} />
                        </a>
                    </div>


                    <ReactSwipe
                        className="carousel"
                        swipeOptions={{ continuous: false }}
                        ref={el => (reactSwipeEl = el)}
                    >
                        {/* Booking Table */}

                        {
                            bookingDataWithDate.map((key, index) => {
                                return (
                                    <div key={index} style={{
                                        display: "flex", flex: 1, marginTop: 15, marginBottom: 25
                                    }}>
                                        <div style={{ flex: 8, background: "#fff", justifyContent: "flex-start", alignItems: "flex-start", display: "flex", padding: 15, flexDirection: "column" }}>

                                            <div style={{ fontWeight: "bold" }}>
                                                Friday, Nov 1 , 2019
                                            </div>

                                            <div style={{ fontSize: 11 }}>
                                                Bookings
                                            </div>

                                            <div style={{ marginTop: 15, width: "100%" }}>
                                                <table class="table table-striped table table-sm">
                                                    <tbody>
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="8:00 am" lock="#F45671"
                                                            name1="David ukwa" nameColor1="#49BE56"
                                                            name2="David ukwa" nameColor2="#49BE56"
                                                            name3="Simon ejilogo" nameColor3="#F45671"
                                                            name4="Simon ejilogo" nameColor4="#F45671"
                                                        />

                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="9:00 am" lock="#49BE56" nameColor1="#49BE56" name1="David ukwa"
                                                            name2="David ukwa" nameColor2="#D9B70B"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="10:00 am" lock="#49BE56"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="11:00 am" lock="#49BE56"
                                                            name1="Simon ejilogo" nameColor1="#F45671"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="12:00 am" lock="#49BE56"
                                                            name1="Simon ejilogo" nameColor1="#F45671"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="1:00 pm" lock="#F45671"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="2:00 pm" lock="#F45671"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="3:00 pm" lock="#49BE56"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="4:00 pm" lock="#49BE56" nameColor1="#F45671" name1="David ukwa"
                                                            name2="David ukwa" nameColor2="#F45671"
                                                            name3="Simon ejilogo" nameColor3="#F45671"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="5:00 pm" lock="#49BE56" nameColor1="#F45671" name1="David ukwa"

                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="6:00 pm" lock="#49BE56" nameColor1="#F45671" name1="David ukwa"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="7:00 pm" lock="#49BE56"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="8:00 pm" lock="#F45671" nameColor1="#F45671" name1="David ukwa"
                                                            nameColor2="#F45671" name2="David ukwa"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="9:00 pm" lock="#F45671"
                                                        />
                                                        <BookingRaw
                                                            modalOpen={() => this.setModal2Visible(true)}
                                                            time="10:00 pm" lock="#F45671"
                                                        />
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </ReactSwipe>
                </div>

                <BookingDetailsModal modalState={this.state} setModal2Visible={this.setModal2Visible} that={this} />
            </div >


        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Bookings);
