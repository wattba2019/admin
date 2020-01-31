import React, { Component, } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';

class SpecialOfferCard extends Component {

    render() {
        return (
            <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
                {/* card start */}
                {
                    (this.props.specialPackages.length > 0) ? (
                        this.props.specialPackages.map((specialPackage, index) => {
                            console.log(specialPackage, 'specialPackagespecialPackage')
                            return (
                                <div className="cardshadow" key={index} style={{
                                    display: "flex", height: "14vw", width: "16vw", minWidth: 230, minHeight: 240, margin: "3%",
                                    backgroundColor: "white", flexDirection: "column"
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

                                    <div style={{ flex: 1.5, }}>
                                        <button type="button" class="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={() => this.setModal2Visible(true)}>Edit Service</button>
                                    </div>
                                </div>
                            )
                        })

                    ) : null
                }

                {/* card End */}

                {/* add button */}
                <div className="cardshadow" style={{
                    display: "flex", height: "14vw", width: "16vw", minWidth: 230, minHeight: 240, margin: "3%",
                    backgroundColor: "white", flexDirection: "column"
                }}>
                    <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }} onClick={() => this.setModal2Visible(true)} >
                        <div class="btn btn-light" style={{ display: "flex", width: "35%", height: "35%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                            <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SpecialOfferCard;