import React, { Component, } from 'react';
import { connect } from 'react-redux';
import '../custom.css'
import "antd/dist/antd.css";
import { updateWorkingHours } from '../store/action/action'
import WorkingHoursCard from '../components/WorkingHoursCard';

class Workinghours extends Component {
    constructor(props) {
        super(props);
    }

    gettingUpdatedTimings(data) {
        this.setState({
            monday: data.monday,
            tuesday: data.tuesday,
            wednesday: data.wednesday,
            thursday: data.thursday,
            friday: data.friday,
            saturday: data.saturday,
            sunday: data.sunday,
        })
    }

    updateTimings() {
        let updateTimeObject = {};
        updateTimeObject.monday = this.state.monday;
        updateTimeObject.tuesday = this.state.tuesday;
        updateTimeObject.wednesday = this.state.wednesday;
        updateTimeObject.thursday = this.state.thursday;
        updateTimeObject.friday = this.state.friday;
        updateTimeObject.saturday = this.state.saturday;
        updateTimeObject.sunday = this.state.sunday;
        updateTimeObject.userID = this.props.uid;
        this.props.updateWorkingHours(updateTimeObject);
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                <div style={{ display: "flex", flex: 1, width: "90%", justifyContent: "space-between", }}>
                    <div style={{ minWidth: 150 }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Working Hours</span>
                    </div>
                    <button
                        onClick={this.updateTimings.bind(this)}
                        style={{ minWidth: 80 }}
                        className="buttonAdd">
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Save Timing</span>
                    </button>
                </div>
                <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", background: "#F7F8F8", }}>
                    <WorkingHoursCard workingHours={this.props.workingHours} func={(data) => this.gettingUpdatedTimings(data)} />
                </div>
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
        updateWorkingHours: (workingHours) => {
            dispatch(updateWorkingHours(workingHours));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Workinghours);
