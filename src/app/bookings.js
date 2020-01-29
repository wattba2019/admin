import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials } from "../store/action/action";
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import swal from 'sweetalert2';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaLock, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import BookingRaw from '../components/BookingRaw';
import "antd/dist/antd.css";
import { DatePicker } from 'antd';
import { Table } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            open: false,
            email: ""
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    datePicker = (date, dateString) => {
        console.log(date, dateString);
    }

    render() {
        const { open, email } = this.state;
        return (
            <div style={{
                display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                // background: "yellow",
                flexDirection: "column",
            }}>
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
                        <button type="button" class="btn btn-light" style={{ width: "60%", margin: "2%", borderWidth: 0.5, borderColor: "grey", height: 40 }} onClick={() => this.setModal2Visible(true)}>Export Bookings</button>
                    </div>
                </div>



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
                    <div style={{
                        display: "flex", justifyContent: "space-between", width: "15%",minWidth:150, color: "#4A4A4A", paddingBottom:5,fontSize:11
                    }}>
                        <a style={{alignItems: "center",display:"flex",justifyContent:"center"}}>
                            <FaAngleLeft style={{ fontSize: 14, color:"#F45671"}} />
                            Previous Day</a>
                        <a style={{alignItems: "center",display:"flex",justifyContent:"center"}}>
                            Next Day
                        <FaAngleRight style={{ fontSize: 14,color:"#F45671" }} />
                        </a>
                    </div>
                    <div style={{
                        display: "flex", flex: 1, width: "100%",
                    }}>
                        <div className="boxShadow" style={{ flex: 8, background: "#fff", justifyContent: "flex-start", alignItems: "flex-start", display: "flex", padding: 15, flexDirection: "column" }}>

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
                                            time="8:00 am" lock="#F45671" nameColor1="#49BE56" name1="David ukwa"
                                            name2="David ukwa" nameColor2="#49BE56"
                                            name3="Simon ejilogo" nameColor3="#F45671"
                                            name4="Simon ejilogo" nameColor4="#F45671"
                                        />
                                        <BookingRaw
                                            time="9:00 am" lock="#49BE56" nameColor1="#49BE56" name1="David ukwa"
                                            name2="David ukwa" nameColor2="#D9B70B"
                                        // name3="Simon ejilogo" nameColor3="#49BE56"
                                        // name4="Simon ejilogo" nameColor4="#F45671"
                                        />
                                        <BookingRaw
                                            time="10:00 am" lock="#49BE56"
                                        />
                                        <BookingRaw
                                            time="11:00 am" lock="#49BE56"
                                            name1="Simon ejilogo" nameColor1="#F45671"
                                        />
                                        <BookingRaw
                                            time="12:00 am" lock="#49BE56"
                                            name1="Simon ejilogo" nameColor1="#F45671"
                                        />
                                        <BookingRaw
                                            time="1:00 pm" lock="#F45671"
                                        />
                                        <BookingRaw
                                            time="2:00 pm" lock="#F45671"
                                        />
                                        <BookingRaw
                                            time="3:00 pm" lock="#49BE56"
                                        />
                                        <BookingRaw
                                            time="4:00 pm" lock="#49BE56" nameColor1="#F45671" name1="David ukwa"
                                            name2="David ukwa" nameColor2="#F45671"
                                            name3="Simon ejilogo" nameColor3="#F45671"
                                        />
                                        <BookingRaw
                                            time="5:00 pm" lock="#49BE56" nameColor1="#F45671" name1="David ukwa"

                                        />
                                        <BookingRaw
                                            time="6:00 pm" lock="#49BE56" nameColor1="#F45671" name1="David ukwa"
                                        />
                                        <BookingRaw
                                            time="7:00 pm" lock="#49BE56"
                                        />
                                        <BookingRaw
                                            time="8:00 pm" lock="#F45671" nameColor1="#F45671" name1="David ukwa"
                                            nameColor2="#F45671" name2="David ukwa"
                                        />
                                        <BookingRaw
                                            time="9:00 pm" lock="#F45671"
                                        />
                                        <BookingRaw
                                            time="10:00 pm" lock="#F45671"
                                        />
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div style={{ flex: 2, minWidth: 200, justifyContent: "flex-end", display: "flex", flexDirection: "row", }}>

                        </div>
                    </div>

                </div>



            </div>
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
        // setUserCredentials: (user) => {
        //     dispatch(setUserCredentials(user));
        // },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Bookings);
