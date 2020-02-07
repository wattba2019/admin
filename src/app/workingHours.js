import React, { Component, } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import { getWorkingHours, updateWorkingHours } from '../store/action/action'
import WorkingHoursCard from '../components/WorkingHoursCard';
import moment from 'moment';

class Workinghours extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monday: (this.props.workingHours.monday) ? this.props.workingHours.monday : { day: 'Monday', open: false, openTimings: moment("9:00 AM", 'h:mm a'), closingTime: moment("9:00 PM", 'h:mm a') },
            tuesday: (this.props.workingHours.tuesday) ? this.props.workingHours.tuesday : { day: 'Tuesday', open: true, openTimings: moment("9:00 AM", 'h:mm a'), closingTime: moment("9:00 PM", 'h:mm a') },
            wednesday: (this.props.workingHours.wednesDay) ? this.props.workingHours.wednesDay : { day: 'Wednesday', open: true, openTimings: moment("9:00 AM", 'h:mm a'), closingTime: moment("9:00 PM", 'h:mm a') },
            thursday: (this.props.workingHours.thursday) ? this.props.workingHours.thursday : { day: 'Thursday', open: true, openTimings: moment("9:00 AM", 'h:mm a'), closingTime: moment("9:00 PM", 'h:mm a') },
            friday: (this.props.workingHours.friday) ? this.props.workingHours.friday : { day: 'Friday', open: true, openTimings: moment("9:00 AM", 'h:mm a'), closingTime: moment("9:00 PM", 'h:mm a') },
            saturday: (this.props.workingHours.saturday) ? this.props.workingHours.saturday : { day: 'Saturday', open: true, openTimings: moment("9:00 AM", 'h:mm a'), closingTime: moment("9:00 PM", 'h:mm a') },
            sunday: (this.props.workingHours.sunday) ? this.props.workingHours.sunday : { day: 'Sunday', open: true, openTimings: moment("9:00 AM", 'h:mm a'), closingTime: moment("9:00 PM", 'h:mm a') },


        }
        this.props.getWorkingHours((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');
    }

    handleShopOpenStatus(dayName) {
        let updatedDay = this.state[dayName];
        updatedDay.open = !updatedDay.open;
        this.setState({ [dayName]: updatedDay })
    }
    onChangeTime(event, timeStr) {
        if (event && timeStr) {
            console.log(event, timeStr,'timeStr');
            let dayKey = event.keyName;
            let changeKeyName = event.changeKeyName
            let updatedDay = this.state[dayKey];
            updatedDay[changeKeyName] = timeStr;
            this.setState({ [dayKey]: updatedDay })
        }
    }
    updateTimings() {
        let updateTimeObject = {};
        updateTimeObject.monday = this.state.monday;
        updateTimeObject.tuesday = this.state.tuesday;
        updateTimeObject.wednesday = this.state.wednesday;
        updateTimeObject.thursday = this.state.thursday;
        updateTimeObject.friday = this.state.friday;
        updateTimeObject.saturday = this.state.saturday;
        updateTimeObject.sunday = this.state.sunday;
        updateTimeObject.userID = (this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254';

        this.props.updateWorkingHours(updateTimeObject);

    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (Object.keys(prevProps.workingHours).length !== Object.keys(this.props.workingHours).length) {
            this.setState({
                monday: this.props.workingHours.monday,
                tuesday: this.props.workingHours.tuesday,
                wednesday: this.props.workingHours.wednesday,
                thursday: this.props.workingHours.thursday,
                friday: this.props.workingHours.friday,
                saturday: this.props.workingHours.saturday,
                sunday: this.props.workingHours.sunday,

            })
        }
    }
    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     console.log(prevProps, prevState, this.props, this.state, 'inside lifecyle');
    //     if (Object.keys(prevProps.workingHours).length !== Object.keys(this.props.workingHours).length) {
    //         return ({
    //             monday: this.props.workingHours.monday,
    //             tuesday: this.props.workingHours.tuesday,
    //             wednesday: this.props.workingHours.wednesday,
    //             thursday: this.props.workingHours.thursday,
    //             friday: this.props.workingHours.friday,
    //             saturday: this.props.workingHours.saturday,
    //             sunday: this.props.workingHours.sunday,
    //         })
    //         // this.setState({
    //         //     monday: this.props.workingHours.monday,
    //         //     tuesday: this.props.workingHours.tuesday,
    //         //     wednesday: this.props.workingHours.wednesday,
    //         //     thursday: this.props.workingHours.thursday,
    //         //     friday: this.props.workingHours.friday,
    //         //     saturday: this.props.workingHours.saturday,
    //         //     sunday: this.props.workingHours.sunday,

    //         // })
    //     }
    //     return null
    // }

    render() {
        console.log(this.props.workingHours, 'workingHoursworkingHoursworkingHours')
        return (

            <div style={{
                display: "flex", flexDirection: "column", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                // background: "yellow",
            }}>
                <div style={{
                    display: "flex", flex: 1, width: "90%", justifyContent: "space-between",
                    // backgroundColor: "#49BE56"
                }}>
                    <div style={{ minWidth: 150 }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Working Hours</span>
                    </div>
                    <button onClick={this.updateTimings.bind(this)} style={{ minWidth: 80 }} className="buttonAdd"
                    // onClick={() => this.setModal2Visible(true)}
                    >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Update Timing</span>
                    </button>
                </div>

                <div style={{
                    display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                    flexDirection: "column",
                    background: "#F7F8F8",
                }}>
                    <WorkingHoursCard workingHours={this.props.workingHours} that={this} />
                </div >

            </div>

        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        uid: state.root.userProfile._id,
        workingHours: state.root.workingHours,


    })
}
function mapDispatchToProp(dispatch) {
    return ({
        getWorkingHours: (userId) => {
            dispatch(getWorkingHours(userId));
        },
        updateWorkingHours: (workingHours) => {
            dispatch(updateWorkingHours(workingHours));
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Workinghours);
