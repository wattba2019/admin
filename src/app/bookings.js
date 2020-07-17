import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials, getBookings, cancledAndApproveBooking, getStylists, getWorkingHours } from "../store/action/action";
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import BookingRaw from '../components/BookingRaw';
import BookingDetailsModal from '../components/bookingDetailsModal';
import ExportBooking from '../components/exportBookingModal';
import "antd/dist/antd.css";
import { DatePicker } from 'antd';
import ReactSwipe from 'react-swipe';
import moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            dateInMiliSeconds: new Date(),
            filteredUnsortBookings: [],
            bookingData: [],
            bookingDetails: [],
            modal2Visible: false,
            modalExport: false,
            slider: [1,],
            bookedService: [],
            bookedPackage: [],
            workingHours: null,
        }
        this.setModal2Visible = this.setModal2Visible.bind(this);
        this.modalExport = this.modalExport.bind(this);
        let bookingDate = new Date();
        this.props.getBookings((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254', bookingDate);
        this.props.getStylists((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');
        this.props.getWorkingHours((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');

    }


    UNSAFE_componentWillMount() {
        this.setState({
            bookedService: this.props.bookedService,
            bookedPackage: this.props.bookedPackage,
        })
    }


    componentDidMount() {
        // alert("WORK")
        let { dateInMiliSeconds, workingHours } = this.state
        if (workingHours) {
            let weekday = new Array(7);
            weekday[0] = "sunday";
            weekday[1] = "monday";
            weekday[2] = "tuesday";
            weekday[3] = "wednesday";
            weekday[4] = "thursday";
            weekday[5] = "friday";
            weekday[6] = "saturday";
            let day = weekday[dateInMiliSeconds.getDay()];

            // let currentDayShopOpen = workingHours[day].open;
            let currentDayShopOpen = workingHours[day] ? workingHours[day].open : null;
            let start = workingHours[day] ? workingHours[day].openTimings : null;
            let end = workingHours[day] ? workingHours[day].closingTime : null;

            console.log(start, end, "hours")

            // let currentDate1 = moment(new Date().getTime()).format('YYYY-MM-DD');
            // console.log(currentDate1, "currentDate1")

            // if (currentDate1 === currentDate) {
            // let start = workingHours[day] ? workingHours[day].openTimings : null;
            // let end = workingHours[day] ? workingHours[day].closingTime : null;


            // let start = workingHours[day] ? workingHours[day].openTimings : null;
            // let end = workingHours[day] ? workingHours[day].closingTime : null;

            if (start && end) {
                let returnValue = this.getTimeStops(start, end,);
                console.log(start, end, "currentDayShopOpen")
                this.setState({
                    slots: returnValue,
                    day: day,
                })
            }


            // }

        }

    }

    getTimeStops(start, end,) {
        // console.log(start, end, ampmCurrent, "ampmCurrent")
        var startTime = moment(start, 'h:mm a');
        var endTime = moment(end, 'h:mm a');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];
        while (startTime <= endTime) {
            // console.log(startTime, currentTime, "currentTime", startTime > currentTime)
            timeStops.push(new moment(startTime).format('h:mm a'));
            startTime.add(60, 'minutes');
        }
        return timeStops;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.workingHours, "workingHours")
        if (nextProps.bookings) {
            this.setState({
                bookingData: nextProps.bookings.bookingSort,
                filteredUnsortBookings: nextProps.bookings.filteredBookings,
                bookedService: nextProps.bookedService,
                bookedPackage: nextProps.bookedPackage,
                workingHours: nextProps.workingHours,
            }
                , () => {
                    this.componentDidMount()
                }
            )
        }
    }

    datePicker = (date, dateString) => {
        if (dateString != "") {
            this.setState({
                currentDate: dateString,
                dateInMiliSeconds: new Date(dateString)
            }, () => {
                this.componentDidMount()
            })
            this.props.getBookings((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254', dateString);
        }
        else {
            this.setState({
                currentDate: new Date(),
            }, () => {
                this.componentDidMount()
            })
            let bookingDate = new Date();
            this.props.getBookings((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254', bookingDate);
        }
    }

    setModal2Visible(modal2Visible, data) {
        this.setState({
            modal2Visible,
            bookingDetails: data
        });
    }

    cancledAndApproveBooking = (bookingStatus, _id, modalBolean) => {
        let { bookingDetails } = this.state
        let cloneBookingDetails = bookingDetails
        cloneBookingDetails.bookingStatus = bookingStatus
        this.props.cancledAndApproveBooking(bookingStatus, _id)
        this.setState({
            modal2Visible: modalBolean
        })
    }

    modalExport(modalExport) {
        this.setState({ modalExport });
    }

    refreshPage(bolean) {
        // window.location.reload(bolean);
        this.props.getBookings((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254', this.state.currentDate);
    }

    nextDate(reactSwipeEl) {
        reactSwipeEl.next()
        const { currentDate, } = this.state
        var date = new Date(currentDate)
        date.setDate(date.getDate() + 1);
        this.setState({
            currentDate: date,
            dateInMiliSeconds: new Date(date)
        }, () => {
            this.componentDidMount()
        })
        this.props.getBookings((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254', date);
    }

    previousDate(reactSwipeEl) {
        reactSwipeEl.prev()
        const { currentDate } = this.state
        var date = new Date(currentDate)
        date.setDate(date.getDate() - 1);
        this.setState({
            currentDate: date,
            dateInMiliSeconds: new Date(date)
        }, () => {
            this.componentDidMount()
        })
        this.props.getBookings((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254', date);
    }

    prepareCSVData() {
        console.log(this.state.bookedService, "bookedService");
        if (this.state.filteredUnsortBookings && this.state.filteredUnsortBookings.length > 0 && this.state.bookedService.length != 0) {
            let unPrepCSVData = this.state.filteredUnsortBookings;
            let preparedCSVData = [];
            unPrepCSVData.map((booking, index) => {
                let bookingObj = {
                    ["Hours"]: booking.bookingHour,
                    ["Booker Name"]: booking.bookerId.fullName,
                    ["Booker Email"]: booking.bookerId.email,
                    ["Booker Phone"]: booking.bookerId.phoneNumber,

                    //pack1
                    ["Required Services_1"]: this.state.bookedService[0] ? this.state.bookedService[0].serviceName : "N/A",
                    ["Required Services_1 Price"]: this.state.bookedService[0] ? this.state.bookedService[0].price : "N/A",

                    ["Extra Service_1 A"]: this.state.bookedService[0] && this.state.bookedService[0].extraServices[0] ? this.state.bookedService[0].extraServices[0].serviceName : "N/A",
                    ["Extra Service_1 A Price"]: this.state.bookedService[0] && this.state.bookedService[0].extraServices[0] ? this.state.bookedService[0].extraServices[0].price : "N/A",

                    ["Extra Service_1 B"]: this.state.bookedService[0] && this.state.bookedService[0].extraServices[1] ? this.state.bookedService[0].extraServices[1].serviceName : "N/A",
                    ["Extra Service_1 B Price"]: this.state.bookedService[0] && this.state.bookedService[0].extraServices[1] ? this.state.bookedService[0].extraServices[1].price : "N/A",

                    ["Extra Service_1 C"]: this.state.bookedService[0] && this.state.bookedService[0].extraServices[2] ? this.state.bookedService[0].extraServices[2].serviceName : "N/A",
                    ["Extra Service_1 C Price"]: this.state.bookedService[0] && this.state.bookedService[0].extraServices[2] ? this.state.bookedService[0].extraServices[2].price : "N/A",

                    //pack2
                    ["Required Services_2"]: this.state.bookedService[1] ? this.state.bookedService[1].serviceName : "N/A",
                    ["Required Services_2 Price"]: this.state.bookedService[1] ? this.state.bookedService[1].price : "N/A",

                    ["Extra Service_2 A"]: this.state.bookedService[1] && this.state.bookedService[1].extraServices[0] ? this.state.bookedService[1].extraServices[0].serviceName : "N/A",
                    ["Extra Service_2 A Price"]: this.state.bookedService[1] && this.state.bookedService[1].extraServices[0] ? this.state.bookedService[1].extraServices[0].price : "N/A",

                    ["Extra Service_2 B"]: this.state.bookedService[1] && this.state.bookedService[1].extraServices[1] ? this.state.bookedService[1].extraServices[1].serviceName : "N/A",
                    ["Extra Service_2 B Price"]: this.state.bookedService[1] && this.state.bookedService[1].extraServices[1] ? this.state.bookedService[1].extraServices[1].price : "N/A",

                    ["Extra Service_2 C"]: this.state.bookedService[1] && this.state.bookedService[1].extraServices[2] ? this.state.bookedService[1].extraServices[2].serviceName : "N/A",
                    ["Extra Service_2 C Price"]: this.state.bookedService[1] && this.state.bookedService[1].extraServices[2] ? this.state.bookedService[1].extraServices[2].price : "N/A",

                    //pack3
                    ["Required Services_3"]: this.state.bookedService[2] ? this.state.bookedService[2].serviceName : "N/A",
                    ["Required Services_3 Price"]: this.state.bookedService[2] ? this.state.bookedService[2].price : "N/A",

                    ["Extra Service_3 A"]: this.state.bookedService[2] && this.state.bookedService[2].extraServices[0] ? this.state.bookedService[2].extraServices[0].serviceName : "N/A",
                    ["Extra Service_3 A Price"]: this.state.bookedService[2] && this.state.bookedService[2].extraServices[0] ? this.state.bookedService[2].extraServices[0].price : "N/A",

                    ["Extra Service_3 B"]: this.state.bookedService[2] && this.state.bookedService[2].extraServices[1] ? this.state.bookedService[2].extraServices[1].serviceName : "N/A",
                    ["Extra Service_3 B Price"]: this.state.bookedService[2] && this.state.bookedService[2].extraServices[1] ? this.state.bookedService[2].extraServices[1].price : "N/A",

                    ["Extra Service_3 C"]: this.state.bookedService[2] && this.state.bookedService[2].extraServices[2] ? this.state.bookedService[2].extraServices[2].serviceName : "N/A",
                    ["Extra Service_3 C Price"]: this.state.bookedService[2] && this.state.bookedService[2].extraServices[2] ? this.state.bookedService[2].extraServices[2].price : "N/A",

                    // ["Stylist Name"]: booking.stylistId.fullname
                }
                preparedCSVData.push(bookingObj);
            });
            return preparedCSVData;
        }
        else {
            let preparedCSVData = [];
            return preparedCSVData;
        }

    }

    render() {
        const { slider, bookingData, currentDate, filteredUnsortBookings, bookedService, bookedPackage, workingHours, slots } = this.state
        let reactSwipeEl;

        if (slots) {
            console.log('slots', slots)
        }

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
                    <div
                        style={{
                            flex: 6, minWidth: 200, alignItems: "center", display: "flex"
                            // background: "blue",
                        }}>
                        <p style={{ margin: "2%", textAlign: "left", fontSize: 18, fontWeight: "bold", }}>Booking Calender</p>
                    </div>
                    <div style={{ flex: 4, justifyContent: "flex-end", display: "flex", flexDirection: "row", }}>
                        <button className="btn btn-light" style={{ minWidth: 140, width: "60%", margin: "2%" }} className="buttonAdd"
                            onClick={() => this.refreshPage(false)}
                        >
                            <span className="buttonmatter" style={{ fontSize: 12, }}>Refresh</span>
                        </button>
                        {
                            (filteredUnsortBookings.length > 0) ? (
                                <CSVLink
                                    className="btn btn-light"
                                    style={{ width: "60%", margin: "2%", borderWidth: 0.5, borderColor: "grey", height: 40 }}
                                    filename={new Date().toLocaleDateString() + '.csv'}
                                    data={this.prepareCSVData()}
                                // data={"null"}
                                >
                                    Export Bookings
                                </CSVLink>
                            ) : null
                        }

                        {/* <button type="button" className="btn btn-light" style={{ width: "60%", margin: "2%", borderWidth: 0.5, borderColor: "grey", height: 40 }}
                            onClick={() => this.modalExport(true)}
                        >
                            Export Bookings
                            </button> */}
                    </div>
                </div>

                {/* Body */}

                {/* Date picker */}

                <div style={{
                    display: "flex", flex: 1, width: "90%", justifyContent: "space-between",
                    padding: 5,
                }}>
                    <div style={{ flex: 6, minWidth: 200, alignItems: "center", display: "flex" }}>
                        <DatePicker style={{ margin: "2%", }} onChange={(data, data1) => this.datePicker(data, data1)} />
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
                        <a
                            onClick={() => this.previousDate(reactSwipeEl)}
                            style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                            <FaAngleLeft style={{ fontSize: 14, color: "#F45671" }} />
                            Previous Day</a>
                        <a
                            onClick={() => this.nextDate(reactSwipeEl)}
                            style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                            Next Day
                            <FaAngleRight style={{ fontSize: 14, color: "#F45671" }} />
                        </a>
                    </div>

                    <ReactSwipe
                        className="carousel"
                        swipeOptions={{ continuous: false }}
                        ref={el => (reactSwipeEl = el)}
                    >

                        {
                            slider.map((key, index) => {
                                console.log(key, "DATA")
                                return (
                                    <div key={index} style={{
                                        display: "flex", flex: 1, marginTop: 15, marginBottom: 25,
                                        // background: "red"
                                    }}>
                                        <div style={{
                                            flex: 8, justifyContent: "flex-start", alignItems: "flex-start", display: "flex", padding: 15, flexDirection: "column",
                                            // background: "red",
                                        }}>

                                            <div style={{ fontWeight: "bold" }}>
                                                {moment(currentDate).format("dddd, MMMM Do YYYY")}
                                            </div>

                                            <div style={{ fontSize: 11 }}>
                                                Bookings
                                            </div>

                                            <div style={{
                                                marginTop: 15,
                                                width: "100%",
                                                // background: "yellow"
                                            }}>
                                                <table className="table table-striped table table-sm">
                                                    <tbody
                                                    // style={{ background: "orange", }}
                                                    >
                                                        {
                                                            slots && slots.map((key, index) => {
                                                                return (
                                                                    <BookingRaw key={index}
                                                                        modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                        time={key}
                                                                        lock={bookingData[moment(key, ["h:mm A"]).format("HH")] ? "#49BE56" : "grey"}
                                                                        data={bookingData[moment(key, ["h:mm A"]).format("HH")]}
                                                                    />
                                                                )
                                                            })
                                                        }

                                                        {/* {
                                                            (bookingData["7"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="7:00 am" lock="#49BE56"
                                                                    data={bookingData["7"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="7:00 am" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["8"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="8:00 am" lock="#49BE56"
                                                                    data={bookingData["8"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="8:00 am" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["9"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="9:00 am" lock="#49BE56"
                                                                    data={bookingData["9"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="9:00 am" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["10"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="10:00 am" lock="#49BE56"
                                                                    data={bookingData["10"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="10:00 am" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["11"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="11:00 am" lock="#49BE56"
                                                                    data={bookingData["11"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="11:00 am" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["12"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="12:00 pm" lock="#F45671"
                                                                    data={bookingData["12"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="12:00 pm" lock="#F45671"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["13"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="1:00 pm" lock="#F45671"
                                                                    data={bookingData["13"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="1:00 pm" lock="#F45671"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["14"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="2:00 pm" lock="#F45671"
                                                                    data={bookingData["14"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="2:00 pm" lock="#F45671"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["15"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="3:00 pm" lock="#F45671"
                                                                    data={bookingData["15"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="3:00 pm" lock="#F45671"
                                                                />
                                                        }
                                                        {
                                                            (bookingData["16"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="4:00 pm" lock="#F45671"
                                                                    data={bookingData["16"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="4:00 pm" lock="#F45671"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["17"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="5:00 pm" lock="#49BE56"
                                                                    data={bookingData["17"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="5:00 pm" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["18"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="6:00 pm" lock="#49BE56"
                                                                    data={bookingData["18"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="6:00 pm" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["19"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="7:00 pm" lock="#49BE56"
                                                                    data={bookingData["19"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="7:00 pm" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["20"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="8:00 pm" lock="#49BE56"
                                                                    data={bookingData["20"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="8:00 pm" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["21"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="9:00 pm" lock="#49BE56"
                                                                    data={bookingData["21"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="9:00 pm" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["22"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="10:00 pm" lock="#49BE56"
                                                                    data={bookingData["22"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="10:00 pm" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["23"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="11:00 pm" lock="#49BE56"
                                                                    data={bookingData["23"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="11:00 pm" lock="#49BE56"
                                                                />
                                                        }

                                                        {
                                                            (bookingData["24"]) ? (
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="12:00 am" lock="#49BE56"
                                                                    data={bookingData["24"]}
                                                                />
                                                            ) :
                                                                <BookingRaw
                                                                    modalOpen={(data) => this.setModal2Visible(true, data)}
                                                                    time="12:00 am" lock="#49BE56"
                                                                />
                                                        } */}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* Booking Table */}
                    </ReactSwipe>

                </div>

                <ExportBooking modalState={this.state} modalExport={this.modalExport} that={this} />
                <BookingDetailsModal modalState={this.state} setModal2Visible={this.setModal2Visible} bookingDetails={this.state.bookingDetails} that={this} bookedService={bookedService} bookedPackage={bookedPackage} bookingStatus={this.cancledAndApproveBooking} />
            </div >


        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        userProfile: state.root.userProfile,
        uid: state.root.userProfile && state.root.userProfile._id,
        bookings: state.root.bookings,
        bookedService: state.root.bookedService,
        bookedPackage: state.root.bookedPackage,
        workingHours: state.root.workingHours,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        getBookings: (shopId, bookingDate) => {
            dispatch(getBookings(shopId, bookingDate));
        },
        cancledAndApproveBooking: (bookingStatus, _id) => {
            dispatch(cancledAndApproveBooking(bookingStatus, _id));
        },
        getStylists: (userId) => {
            dispatch(getStylists(userId));
        },
        getWorkingHours: (userId) => {
            dispatch(getWorkingHours(userId));
        },
    })

}

export default connect(mapStateToProp, mapDispatchToProp)(Bookings);
