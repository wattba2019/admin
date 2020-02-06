import React, { Component, } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';

class SpecialOfferCard extends Component {

    render() {
        return (
            // <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
            <div style={{
                display: "flex", flex: 8, width: "100%", flexDirection: "row", flexWrap: "wrap", marginTop: "3%",
                justifyContent: "center", alignItems: "center",
                // background: "red"
            }}>
                <div style={{
                    display: "flex", width: "80%", flexDirection: "row", flexWrap: "wrap",
                    alignItems: "center",
                    // background: "orange"
                }}>

                    {/* card start */}
                    {
                        (this.props.specialPackages.length > 0) ? (
                            this.props.specialPackages.map((specialPackage, index) => {
                                // console.log(specialPackage, 'specialPackagespecialPackage')
                                return (
                                    <div className="cardshadow" key={index} style={{
                                        display: "flex", height: "16vw", width: "15vw", minWidth: 230, minHeight: 240, margin: "3%",
                                        flexDirection: "column",
                                        backgroundColor: "white",
                                        // backgroundColor: "red",
                                    }}>

                                        <div style={{
                                            display: "flex", flex: 8, flexDirection: "column"
                                            // background: "orange"
                                        }}>
                                            <div style={{ display: "flex", flex: 0.5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                                <div>
                                                    {specialPackage.packageName}
                                                </div>
                                                <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                    <IoMdCheckmark style={{ color: "white", }} />
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "-moz-initial", fontSize: 24 }}>
                                                $ {specialPackage.price}
                                            </div>

                                            <div style={{ display: "flex", flex: 0.5, color: "#535353", marginTop: 5, textAlign: "left", marginTop: 10 }}>
                                                {specialPackage.packageDescription}
                                            </div>
                                        </div>

                                        <div style={{
                                            display: "flex", flex: 2,
                                            // background: "green"
                                        }}>
                                            <div style={{ flex: 1.5, marginTop: 10 }}>
                                                <button type="button" class="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={() => this.props.setModal2VisibleEdit(true, specialPackage, index)}>Edit Service</button>
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
                        display: "flex", height: "16vw", width: "15vw", minWidth: 230, minHeight: 240, margin: "3%",
                        backgroundColor: "white", flexDirection: "column"
                    }}>
                        <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }} onClick={() => this.props.setModal2Visible(true)} >
                            <div class="btn btn-light" style={{ display: "flex", width: "35%", height: "32%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SpecialOfferCard;