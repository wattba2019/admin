import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { getWorkingHours } from '../store/action/action'
import { TimePicker } from 'antd';
import moment from 'moment';
import { IoMdCheckmark } from 'react-icons/io';

class WorkingHoursCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monday: { day: 'Monday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
            tuesday: { day: 'Tuesday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
            wednesday: { day: 'Wednesday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
            thursday: { day: 'Thursday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
            friday: { day: 'Friday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
            saturday: { day: 'Saturday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
            sunday: { day: 'Sunday', open: true, openTimings: "9:00 am", closingTime: "9:00 pm" },
        }
        this.props.getWorkingHours(this.props.uid);
    }

    handleShopOpenStatus(dayName) {
        let updatedDay = this.state[dayName];
        updatedDay.open = !updatedDay.open;
        this.setState({ [dayName]: updatedDay })
        this.props.func(this.state)
    }

    onChangeTime(event, timeStr) {
        if (event && timeStr) {
            let dayKey = event.keyName;
            let changeKeyName = event.changeKeyName
            let updatedDay = this.state[dayKey];
            updatedDay[changeKeyName] = timeStr;
            this.setState({ [dayKey]: updatedDay })
        }
        this.props.func(this.state)
    }

    UNSAFE_componentWillMount() {
        this.props.func(this.state)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            monday: nextProps.workingHours.monday,
            tuesday: nextProps.workingHours.tuesday,
            wednesday: nextProps.workingHours.wednesday,
            thursday: nextProps.workingHours.thursday,
            friday: nextProps.workingHours.friday,
            saturday: nextProps.workingHours.saturday,
            sunday: nextProps.workingHours.sunday,
        })
    }

    render() {
        return (
            <div style={{ display: "flex", flex: 8, flexDirection: "row", flexWrap: "wrap", marginTop: "3%", justifyContent: "center", alignItems: "center", }}>
                <div style={{ display: "flex", width: "85%", flexDirection: "row", flexWrap: "wrap", alignItems: "center", }}>
                    {/* card start */}
                    {
                        Object.keys(this.state).map((dayKey, index) => {
                            let day = this.state[dayKey];
                            return (
                                (day && day.day) ? (
                                    <div
                                        key={index}
                                        className="cardshadow"
                                        style={{ display: "flex", height: "13vw", width: "16.5vw", minWidth: 220, minHeight: 200, margin: "1%", backgroundColor: "white", flexDirection: "column", }}>

                                        <div style={{ display: "flex", marginTop: 10, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                            <div>
                                                {day.day}
                                            </div>
                                            <div onClick={this.handleShopOpenStatus.bind(this, dayKey)} style={(day.open === true) ? { display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 } : { display: "flex", backgroundColor: "#d3d3d3", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                <IoMdCheckmark style={{ color: "white", }} />
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", marginTop: 10, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, textAlign: "left", color: "#888888"
                                            }}>
                                                Opening Hour:
                                        </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40,
                                            }}>
                                                <TimePicker
                                                    value={moment(day.openTimings, 'h:mm a')}
                                                    style={{ width: 100, margin: "1%" }}
                                                    use12Hours format="h:mm a"
                                                    onChange={(e, f) => {
                                                        if (e) {
                                                            e.keyName = dayKey;
                                                            e.changeKeyName = 'openTimings'
                                                        }
                                                        this.onChangeTime(e, f);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>

                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, textAlign: "left", color: "#888888" }}>
                                                Closing Hour:
                                            </div>

                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, }}>
                                                <TimePicker
                                                    value={moment(day.closingTime, 'h:mm a')}
                                                    style={{ width: 100, margin: "1%" }}
                                                    use12Hours format="h:mm a"
                                                    onChange={(e, f) => {
                                                        if (e) {
                                                            e.keyName = dayKey;
                                                            e.changeKeyName = 'closingTime'
                                                        }
                                                        this.onChangeTime(e, f);
                                                    }} />
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            )
                        })
                    }
                </div>
                {/* card End */}
            </div >
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
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(WorkingHoursCard);
