import React, { Component, } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
import { Input } from "antd";


const { Search } = Input;

class StylistCard extends Component {

    render() {
        const { that } = this.props

        return (
            <div>
                <div style={{
                    display: "flex", flex: 1, width: "90%", justifyContent: "space-between",
                    // backgroundColor: "#49BE56"
                }}>
                    <div style={{
                        minWidth: 350, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
                        // background: "green"
                    }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Stylists Profiles</span>
                        <div style={{ marginLeft: 10 }}>
                            <Search
                                placeholder="search stylist"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>

                    <button style={{ minWidth: 120, width: "20%" }} className="buttonAdd" onClick={() => that.setModal2Visible(true)}  >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Add StyList</span>
                    </button>
                </div>

                <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
                    {/* card start */}
                    <div className="cardshadowWithButton" style={{
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
                                <div>John Doe</div>
                            </div>


                            <div style={{
                                display: "flex", flex: 3, padding: 5, color: "#535353", fontWeight: "normal", fontSize: 10, flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "left",
                                // background: "green"
                            }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text industry's
                    </div>

                            <div style={{
                                display: "flex", flex: 1, flexDirection: "row", padding: 5, color: "black", fontWeight: "bold", fontSize: 12,
                                // background: "red"
                            }}>
                                Service 1
                    </div>

                            <div style={{
                                display: "flex", flex: 5, flexDirection: "column", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center",
                                // background: "orange"
                            }}>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                            </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                            </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                            </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12,
                                    // background: "red"
                                }}>
                                    <div>
                                        Service 1
                            </div>
                                    <div style={{ display: "flex", height: 20, width: 20, backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5, fontSize: 12, }}>
                                        <IoMdCheckmark style={{ color: "white", fontSize: 12, }} />
                                    </div>
                                </div>
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
                                onClick={() => this.setModal2Visible(true)}
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
                </div>
            </div>
        )
    }
}

export default StylistCard;
