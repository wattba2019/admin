import React, { Component, } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import WorkingHoursCard from '../components/WorkingHoursCard';

class Workinghours extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { } = this.state
        return (

            <div style={{
                display: "flex", flexDirection: "column", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                // background: "yellow",
            }}>
                <div style={{
                    display: "flex", flex: 1, width: "90%", justifyContent: "space-between",
                    // backgroundColor: "#49BE56"
                }}>
                    <div style={{ minWidth: 150 }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Working Hours</span>
                    </div>
                    <button style={{ minWidth: 80 }} className="buttonAdd"
                    // onClick={() => this.setModal2Visible(true)}
                    >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Update Timing</span>
                    </button>
                </div>

                <div style={{
                    display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                    flexDirection: "column",
                    background: "#F7F8F8",
                }}>
                    <WorkingHoursCard />
                </div >

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

export default connect(mapStateToProp, mapDispatchToProp)(Workinghours);
