import React, { Component, } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdCheckmark } from 'react-icons/io';
class ServiceCard extends Component {
    render() {
        return (
            <div style={{ display: "flex", flex: 8, marginTop: "3%" }}>
                {/* card start */}

                {
                    this.props.services.map((service, index) => {
                        console.log(service, 'mapruning')
                        let indexedExtraServices = service.extraServices;
                        if (indexedExtraServices.length > 3) {
                            indexedExtraServices.splice(3);
                        }
                        return (
                            <div className="cardshadow" key={index} style={{
                                display: "flex", height: "20vw", width: "16vw", minWidth: 220, minHeight: 300, margin: "3%",
                                backgroundColor: "white", flexDirection: "column"
                            }}>

                                <div style={{ display: "flex", flex: 0.5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                    <div>
                                        {service.serviceName}
                                    </div>
                                    <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                        <IoMdCheckmark style={{ color: "white", }} />
                                    </div>
                                </div>

                                <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "-moz-initial", fontSize: 24 }}>
                                    ${service.price}
                                </div>

                                <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "bold", marginTop: 5, }}>
                                    Extra Services
                                </div>

                                <div style={{ display: "flex", flex: 5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>

                                    {
                                        indexedExtraServices.map((extraServices, esIndex) => {
                                            console.log(indexedExtraServices, 'indexedExtraServices')
                                            return (
                                                <div key={esIndex} style={{ display: "flex", width: "100%", margin: 10, justifyContent: "space-between", alignItems: "center", fontWeight: "normal", color: "#535353" }}>
                                                    <div>
                                                        {extraServices.serviceName}
                                                    </div>
                                                    <div style={{ marginLeft: "10%", color: "#535353" }}>
                                                        {extraServices.price}
                                                    </div>
                                                    <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                                        <IoMdCheckmark style={{ color: "white", }} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                                <div style={{ flex: 1.5, }}>
                                    <button type="button" className="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={this.signin}>Edit Service</button>
                                </div>
                            </div>
                        )
                    })
                }



                {/* <div className="cardshadow" style={{
                    display: "flex", height: "20vw", width: "16vw", minWidth: 220, minHeight: 300, margin: "3%",
                    backgroundColor: "white", flexDirection: "column"
                }}>

                    <div style={{ display: "flex", flex: 0.5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                        <div>
                            Shaving
                    </div>
                        <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                            <IoMdCheckmark style={{ color: "white", }} />
                        </div>
                    </div>

                    <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "-moz-initial", fontSize: 24 }}>
                        $50
                </div>

                    <div style={{ display: "flex", flex: 0.5, color: "black", fontWeight: "bold", marginTop: 5, }}>
                        Extra Services
                </div>

                    <div style={{ display: "flex", flex: 5, padding: 5, color: "black", fontWeight: "bold", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                        <div style={{ display: "flex", width: "100%", margin: 10, justifyContent: "space-between", alignItems: "center", fontWeight: "normal", color: "#535353" }}>
                            <div>
                                Extra Services 1
                        </div>
                            <div style={{ marginLeft: "10%", color: "#535353" }}>
                                $20
                        </div>
                            <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <IoMdCheckmark style={{ color: "white", }} />
                            </div>
                        </div>
                        <div style={{ display: "flex", width: "100%", margin: 10, justifyContent: "space-between", alignItems: "center", fontWeight: "normal", color: "#535353" }}>
                            <div>
                                Extra Services 2
                        </div>
                            <div style={{ marginLeft: "10%", color: "#535353" }}>
                                $20
                        </div>
                            <div style={{ display: "flex", backgroundColor: "#49BE56", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <IoMdCheckmark style={{ color: "white", }} />
                            </div>
                        </div>
                        <div style={{ display: "flex", width: "100%", margin: 10, justifyContent: "space-between", alignItems: "center", fontWeight: "normal", color: "#535353" }}>
                            <div>
                                Extra Services 3
                        </div>
                            <div style={{ marginLeft: "10%", color: "#535353" }}>
                                $20
                        </div>
                            <div style={{ display: "flex", backgroundColor: "#B5B6B7", borderRadius: 25, justifyContent: "center", alignItems: "center", padding: 5 }}>
                                <IoMdCheckmark style={{ color: "white", }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1.5, }}>
                        <button type="button" className="btn btn-light" style={{ width: "100%", borderWidth: 0.5, borderColor: "grey" }} onClick={this.signin}>Edit Service</button>
                    </div>
                </div> */}
                {/* card End */}

                {/* add button */}
                <div className="cardshadow" style={{
                    display: "flex", height: "20vw", width: "16vw", minWidth: 220, minHeight: 300, margin: "3%",
                    backgroundColor: "white", flexDirection: "column"
                }}>
                    <div style={{ display: "flex", flex: 1, color: "black", fontWeight: "bold", flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                        <div className="btn btn-light" onClick={() => this.setModal2Visible(true)} style={{ display: "flex", width: "35%", height: "24%", backgroundColor: "#E9E9EA", borderRadius: 50, justifyContent: "center", alignItems: "center", padding: 5 }}>
                            <AiOutlinePlus style={{ color: "#494949", fontSize: 25 }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ServiceCard;
