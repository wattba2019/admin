import React, { Component, } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
class WorkingHoursCard extends Component {
    render() {
        return (
            <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
              
                {/* card start */}
                <div className="cardshadow" style={{
                    display: "flex", height: "12vw", width: "16vw", minWidth: 220, minHeight: 120, margin: "3%",
                    backgroundColor: "white", flexDirection: "column"
                }}>
                    <div style={{ display: "flex", flex: 0.5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                        <div>
                            Monday
                        </div>
                        <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                            <IoMdCheckmark style={{ color: "white", }} />
                        </div>
                    </div>
                </div>
                {/* card End */}
               
            </div>
        )
    }
}

export default WorkingHoursCard;