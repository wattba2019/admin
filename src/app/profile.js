import React, { Component, } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import { MdLock } from 'react-icons/md';

class ShopProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        }
    }

    render() {
        const { password } = this.state;
        return (
            <div style={{
                display: "flex", width: "100%", justifyContent: "center", alignItems: "center",
                background: "#F7F8F8",
            }}>
                <div style={{ display: "flex", width: "55%", minWidth: 600, background: "#F7F8F8" }}>
                    123456
                </div>

                <div className="cardshadowcenter" style={{
                    display: "flex", width: "45%", minWidth: 400, flexDirection: "column", background: "white", justifyContent: "flex-end", alignItems: "flex-end",
                    height: window.innerHeight,
                }}>

                    <img alt="BackGroundImage" src={require('../assets/logo.png')} style={{ marginRight: "4%", marginTop: "0.5%" }}
                        width="140"
                        height="7%"
                    />
                    <div style={{
                        display: "flex", flex: 1,
                        width: "100%",
                        // background: "red"
                    }}>
                        <center>

                            <div style={{ width: "100%", marginLeft: "40%", marginTop: 20, justifyContent: "center", alignItems: "flex-start" }} className="center">
                                <h6 className="input-group mb-6 inputCenter" >Change Password</h6>

                                <div style={{ display: "flex", flex: 1, marginTop: 20, width: 250 }} >
                                    <input type="text" className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                </div>

                                <div style={{ display: "flex", flex: 1, marginTop: 15, width: 250 }} >
                                    <input type="text" className="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                </div>

                                <div style={{ display: "flex", flex: 1, marginTop: 15 }} >
                                    <button className="button" style={{ marginTop: 10, width: "70%" }} onClick={this.signup} >
                                        <span className="buttonmatter">Change Password</span>
                                    </button>
                                </div>
                            </div>

                        </center>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
    })
}

function mapDispatchToProp(dispatch) {
    return ({
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(ShopProfile);
