import React, { Component, } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import { getWorkingHours } from '../store/action/action'
import WorkingHoursCard from '../components/WorkingHoursCard';

class Workinghours extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.props.getWorkingHours((this.props.uid) ? this.props.uid : '5dfb488f662af31be47f3254');
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
                    <WorkingHoursCard workingHours={this.props.workingHours} />
                </div >

            </div>

        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        uid: state.root.userProfile._id,
        workingHours: state.root.workingHours,


    })
}
function mapDispatchToProp(dispatch) {
    return ({
        getWorkingHours: (userId) => {
            dispatch(getWorkingHours(userId));
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Workinghours);
