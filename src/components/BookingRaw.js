import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { setUserCredentials } from "../store/action/action";
import {
    Link
} from 'react-router-dom';
import '../custom.css'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import swal from 'sweetalert2';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';
import Modal from 'react-responsive-modal';
import "antd/dist/antd.css";
import { DatePicker } from 'antd';
import { Table } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class BookingsRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { open, email } = this.state;
        const {
            time, lock, nameColor1, name1, name2, name3, name4,
            nameColor2, nameColor3, nameColor4,
        } = this.props;
        return (
            <tr style={{}}>
                <th scope="row">
                    <a style={{
                        fontWeight: "normal", height: 30,
                        width: 80, padding: 5, flexDirection: "row", display: "flex", color: "#4A4A4A",
                        justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                    }}>
                        <FaLock style={{ fontSize: 14, color: lock }} />
                        {time}
                    </a>
                </th>
                <td>
                    {name1 &&
                        <a style={{
                            minWidth: 80,
                            background: nameColor1, color: "#fff", fontWeight: "normal", height: 25,
                            width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                            justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                        }}>
                            <div>
                                {name1}
                            </div>
                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                />
                            </div>
                        </a>
                    }
                </td>
                <td>
                    {name2 &&

                        <a style={{
                            minWidth: 80,
                            background: nameColor2, color: "#fff", fontWeight: "normal", height: 25,
                            width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                            justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                        }}>
                            <div>
                                {name2}
                            </div>
                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                />
                            </div>
                        </a>
                    }
                </td>
                <td>
                    {name3 &&
                        <a style={{
                            minWidth: 80,
                            background: nameColor3, color: "#fff", fontWeight: "normal", height: 25,
                            width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                            justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                        }}>
                            <div>
                                {name3}
                            </div>
                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                />
                            </div>
                        </a>
                    }
                </td>
                <td>
                    {name4 &&
                        <a style={{
                            minWidth: 80,
                            background: nameColor4, color: "#fff", fontWeight: "normal", height: 25,
                            width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                            justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                        }}>
                            <div>
                                {name4}
                            </div>
                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                    style={{ width: 20, height: 20, borderRadius: 10 }}
                                />
                            </div>
                        </a>
                    }
                </td>
            </tr>
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
        // setUserCredentials: (user) => {
        //     dispatch(setUserCredentials(user));
        // },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(BookingsRaw);
