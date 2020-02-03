import React, { Component, } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { TimePicker } from 'antd';

class WorkingHoursCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        }
    }

    render() {
        const { weekDays } = this.state
        return (
            <div style={{
                display: "flex", flex: 8, flexDirection: "row", flexWrap: "wrap", marginTop: "3%",
                justifyContent: "center", alignItems: "center",
                // background: "red"
            }}>
                <div style={{
                    display: "flex", width: "85%", flexDirection: "row", flexWrap: "wrap",
                    alignItems: "center",
                    // background: "orange"
                }}>

                    {/* card start */}

                    {
                        weekDays.map((key, index) => {
                            return (

                                <div key={index} className="cardshadow" style={{
                                    display: "flex", height: "13vw", width: "16.5vw", minWidth: 220, minHeight: 200, margin: "1%",
                                    backgroundColor: "white", flexDirection: "column",
                                    // background: "green"
                                }}>
                                    <div style={{ display: "flex", marginTop: 10, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                        <div>
                                            {key}
                                        </div>
                                        <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                            <IoMdCheckmark style={{ color: "white", }} />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", marginTop: 10, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, textAlign: "left", color: "#888888"
                                            // background: "yellow"
                                        }}>
                                            Opening Hour:
                                    </div>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40,
                                            // background: "yellow"
                                        }}>
                                            <TimePicker
                                                style={{ width: 100, margin: "1%" }}
                                                use12Hours format="h:mm a"
                                                placeholder={"Time"}
                                                onChange={this.onChange} />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, textAlign: "left", color: "#888888"
                                            // background: "yellow"
                                        }}>
                                            Closing Hour:
                                    </div>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40,
                                            // background: "yellow"
                                        }}>
                                            <TimePicker
                                                style={{ width: 100, margin: "1%" }}
                                                use12Hours format="h:mm a"
                                                placeholder={"Time"}
                                                onChange={this.onChange} />
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }

                </div>
                {/* card End */}

            </div >
        )
    }
}

export default WorkingHoursCard;