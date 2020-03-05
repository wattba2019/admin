import React, { Component, } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
import { Input } from "antd";
import stylelist from '../app/stylelist';
import { MdCameraEnhance } from 'react-icons/md';
import { updateStylistImg } from "../store/action/action";
import { connect } from 'react-redux';
import '../custom.css'
const { Search } = Input;

class StylistCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stylistImage: "",
        }
    }

    imagePick(file, _id) {
        const { userProfile } = this.props
        // console.log(userProfile._id, _id, "USERPROFILE")
        if (file) {
            this.props.updateStylistImg(file, _id, userProfile._id)
        }
    }

    render() {
        const { stylistImage } = this.state
        const { that, stylists, } = this.props
        return (
            <div style={{
                display: "flex", flex: 8, marginTop: "3%", flexWrap: "wrap", width: "80%",
                // backgroundColor: "white"
            }}>
                {/* card start */}
                {
                    (stylists.length > 0) ? (
                        stylists.map((stylist, index) => {
                            console.log(stylist._id, index, "INSIDE_MAP")
                            return (
                                <div key={index} className="cardshadowWithButton" style={{
                                    display: "flex", height: "25vw", width: "16vw", minWidth: 220, minHeight: 400, maxWidth: 230, margin: "3%",
                                    flexDirection: "column",
                                    backgroundColor: "white"
                                }}>
                                    <div style={{
                                        padding: 10,
                                        display: "flex", flex: 1, flexDirection: "column",
                                        // background: "orange"
                                    }}>
                                        <div style={{
                                            display: "flex", flex: 8, flexDirection: "column", width: "100%",
                                            // background: "green"
                                        }}>
                                            <div style={{
                                                display: "flex", flex: 2, justifyContent: "flex-end", color: "black", fontWeight: "bold", flexDirection: "row", position: "relative",
                                                // background: "red"
                                            }}>
                                                <div style={{
                                                    position: "absolute",
                                                    marginTop: 0,
                                                    marginBottom: 20,
                                                    width: "100%",
                                                    justifyContent: "center", alignItems: "center", textAlign: "center",
                                                    // background: "grey"
                                                }}>
                                                    <div>
                                                        {
                                                            stylist.coverImage ?
                                                                <img src={stylist.coverImage} className="profileImage" style={{ width: 70, height: 70 }} /> :
                                                                <img src={require('../../src/assets/noPhoto.jpg')} className="profileImage" style={{ width: 70, height: 70 }} />
                                                        }

                                                        <label htmlFor={"inputGroupFile02" + index} className="stylistImageupload" style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} >
                                                            <MdCameraEnhance style={{ color: "grey", fontSize: 10 }} />
                                                        </label>
                                                    </div>

                                                    <input
                                                        onChange={(e) =>
                                                            this.imagePick(e.target.files[0], stylist._id)
                                                        }
                                                        type="file"
                                                        id={"inputGroupFile02" + index}
                                                        className="profileinputnone"
                                                    />
                                                    <div style={{
                                                        // background: "yellow",
                                                        position: "relative",
                                                        top: -28
                                                    }} >{stylist.fullname}</div>
                                                </div>

                                                <div
                                                    onClick={() => that.setModal2VisibleEdit(true, stylist, index)}
                                                    style={{
                                                        position: "relative", cursor: "pointer",
                                                        zIndex: 1, justifyContent: "center", alignItems: "center", textAlign: "center",
                                                        // background: "red"
                                                    }}>
                                                    <img src={require('../../src/assets/3dotmenu.png')} style={{ width: 10, height: 20 }} />
                                                </div>
                                            </div>

                                            <div style={{
                                                display: "flex", flex: 3, padding: 5, marginTop: "25%", color: "#535353", fontWeight: "normal", fontSize: 10, flexDirection: "column", alignItems: "center", textAlign: "center",
                                                // background: "orange"
                                            }}>
                                                {stylist.description}
                                                {/* Crazy stylist that uses fire to bend the air Crazy stylist that uses fire to bend the air */}
                                            </div>

                                            <div style={{
                                                display: "flex", flex: 1, flexDirection: "row", padding: 5, color: "black", fontWeight: "bold", fontSize: 12,
                                                // background: "red"
                                            }}>
                                                Services
                                            </div>

                                            <div style={{
                                                display: "flex", flex: 5, flexDirection: "column", padding: 5, color: "#535353", fontWeight: "bold", alignItems: "center",
                                                // background: "orange"
                                            }}>
                                                {
                                                    stylist.serviceProvided.map((stylistService, serIndex) => {
                                                        if (serIndex < 3) {
                                                            return (
                                                                <div key={serIndex} style={{
                                                                    display: "flex", width: "100%", flexDirection: "row", padding: 5, color: "#535353", fontWeight: "bold", justifyContent: "space-between", alignItems: "center", fontSize: 12, marginTop: 5,
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
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>

                                        <div style={{
                                            display: "flex", flex: 1, flexDirection: "column", background: "#F7F8F8",
                                            background: "green"
                                        }}>
                                            <div className="cardButtonBorder" style={{
                                                display: "flex", flex: 1, width: "100%", padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center",
                                                background: "#F7F8F8"
                                                // background: "red"
                                            }}>
                                                <div className="cardButtonBorderRight" style={{
                                                    display: "flex", flex: 1, height: "100%", justifyContent: "center", alignItems: "center", textAlign: "left", fontSize: 10,
                                                    background: "#F7F8F8"
                                                }}
                                                // onClick={() => that.setModal2VisibleEdit(true, stylist, index)}
                                                >
                                                    Working Calendar
                                                </div>
                                                <div style={{
                                                    display: "flex", flex: 1, height: "100%", justifyContent: "center", alignItems: "center", textAlign: "left", fontSize: 10,
                                                    background: "#F7F8F8"
                                                }}>
                                                    Gallery
                                                </div>
                                            </div>
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
                    display: "flex", height: "25vw", width: "16vw", minWidth: 220, minHeight: 400, maxWidth: 230, margin: "3%",
                    backgroundColor: "white", flexDirection: "column"
                }}>
                    <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                        <div onClick={() => that.setModal2Visible(true)} className="btn btn-light" style={{ display: "flex", width: "35%", height: "19%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                            <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


function mapStateToProp(state) {
    return ({
        // bseUrl: state.root.bseUrl,
        userProfile: state.root.userProfile,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        updateStylistImg: (data1, id, userId) => {
            dispatch(updateStylistImg(data1, id, userId));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(StylistCard);
