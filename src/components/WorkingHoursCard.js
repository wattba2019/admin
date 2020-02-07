import React, { Component, } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { TimePicker } from 'antd';
import moment from 'moment';

class WorkingHoursCard extends Component {
    constructor(props) {
        super(props);
    }
    handleShopOpenStatus(dayName) {
        let updatedDay = this.state[dayName];
        updatedDay.open = !updatedDay.open;
        this.setState({ [dayName]: updatedDay })
    }
    render() {
        const { that } = this.props
        return (
            <div style={{
                display: "flex", flex: 8, flexDirection: "row", flexWrap: "wrap", marginTop: "3%",
                justifyContent: "center", alignItems: "center",
            }}>
                <div style={{
                    display: "flex", width: "85%", flexDirection: "row", flexWrap: "wrap",
                    alignItems: "center",
                }}>

                    {/* card start */}
                    {
                        Object.keys(that.state).map((dayKey, index) => {
                            let day = that.state[dayKey];
                            console.log(day,'day', moment(day.openTimings, 'h:mm a'))
                            return (
                                (day.day) ? (
                                    <div key={index} className="cardshadow" style={{
                                        display: "flex", height: "13vw", width: "16.5vw", minWidth: 220, minHeight: 200, margin: "1%",
                                        backgroundColor: "white", flexDirection: "column",
                                    }}>
                                        <div style={{ display: "flex", marginTop: 10, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                            <div>
                                                {day.day}
                                            </div>
                                            <div onClick={that.handleShopOpenStatus.bind(that, dayKey)} style={(day.open) ? { display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 } : { display: "flex", backgroundColor: "#d3d3d3", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
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
                                                    defaultValue={moment(day.openTimings, 'h:mm a')}
                                                    style={{ width: 100, margin: "1%" }}
                                                    use12Hours format="h:mm a"
                                                    // placeholder={"Time"}
                                                    onChange={(e, f) => {
                                                        if (e) {
                                                            e.keyName = dayKey;
                                                            e.changeKeyName = 'openTimings'
                                                        }
                                                        that.onChangeTime(e, f);
                                                    }}

                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, textAlign: "left", color: "#888888"
                                            }}>
                                                Closing Hour:
                                    </div>
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40,
                                            }}>
                                                <TimePicker
                                                    defaultValue={moment(day.closingTime, 'h:mm a')}

                                                    style={{ width: 100, margin: "1%" }}
                                                    use12Hours format="h:mm a"
                                                    // placeholder={"Time"}
                                                    onChange={(e, f) => {
                                                        if (e) {
                                                            e.keyName = dayKey;
                                                            e.changeKeyName = 'closingTime'
                                                        }
                                                        that.onChangeTime(e, f);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                ) : null)
                        })
                    }
                </div>
                {/* card End */}

            </div >
        )
    }
}

export default WorkingHoursCard;