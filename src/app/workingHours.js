import React, { Component, } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import { DatePicker } from 'antd';
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
                display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center",
                flexDirection: "column",
                background: "#F7F8F8",
            }}>
                <WorkingHoursCard />
            </div >
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
