import React, { Component, } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
import { Input } from "antd";
import stylelist from '../app/stylelist';


const { Search } = Input;

class StylistCard extends Component {

    render() {
        const { that, stylists } = this.props

        return (


            <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
                {/* card start */}
                {
                    (stylists.length > 0) ? (
                        stylists.map((stylist, index) => {
                            return (
                                < div key={index} className="cardshadowWithButton" style={{
                                    display: "flex", height: "25vw", width: "16vw", minWidth: 220, minHeight: 400, margin: "3%",
                                    backgroundColor: "white", flexDirection: "column"
                                }}>
                                    <div style={{ padding: 10 }}>
                                        <div style={{
                                            display: "flex", flex: 2, height: 100, padding: 5, color: "black", fontWeight: "bold", flexDirection: "column", justifyContent: "center", alignItems: "center",
                                            // background: "red"
                                        }}>
                                            <div>
                                                <img src={require('../../src/assets/noPhoto.jpg')} className="profileImage" style={{ width: 70, height: 70 }} />
                                            </div>
                                            <div>{stylist.fullname}</div>
                                        </div>


                                        <div style={{
                                            display: "flex", flex: 3, padding: 5, color: "#535353", fontWeight: "normal", fontSize: 10, flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "left",
                                            // background: "green"
                                        }}>
                                            {stylist.description}
                                        </div>

                                        <div style={{
                                            display: "flex", flex: 1, flexDirection: "row", padding: 5, color: "black", fontWeight: "bold", fontSize: 12,
                                            // background: "red"
                                        }}>
                                            Services
                                     </div>

                                        <div style={{
                                            display: "flex", flex: 5, flexDirection: "column", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center",
                                            // background: "orange"
                                        }}>
                                            {
                                                stylist.serviceProvided.map((stylistService, serIndex) => {
                                                    return (
                                                        <div key={serIndex} style={{
                                                            display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                                            // background: "red"
                                                        }}>
                                                            <div>
                                                                {stylistService}
                                                            </div>
                                                            <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                                                <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>
                                    </div>

                                    <div className="cardButtonBorder" style={{
                                        display: "flex", flex: 1, width: "100%", padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center",
                                        background: "#F7F8F8"
                                    }}>
                                        <div className="cardButtonBorderRight" style={{
                                            display: "flex", flex: 1, height: "100%", justifyContent: "center", alignItems: "center", textAlign: "left", fontSize: 10,
                                            background: "#F7F8F8"
                                        }}
                                        // onClick={() => this.setModal2Visible(true)}
                                        >
                                            Working Calendar
                                   </div>
                                        <div style={{
                                            display: "flex", flex: 1, height: "100%", justifyContent: "center", alignItems: "center", textAlign: "left", fontSize: 10,
                                            background: "#F7F8F8"
                                        }}

                                        >
                                            Gallery
                                     </div>
                                    </div>

                                </div>
                            )
                        })

                    ) : null
                }


                {/* card End */}

                {/* add button */}
                <div className="cardshadow" style={{
                    display: "flex", height: "25vw", width: "16vw", minWidth: 220, minHeight: 400, margin: "3%",
                    backgroundColor: "white", flexDirection: "column"
                }}>
                    <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                        <div onClick={() => that.setModal2Visible(true)} class="btn btn-light" style={{ display: "flex", width: "35%", height: "19%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                            <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default StylistCard;