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
        const {
            time, lock, data, modalOpen
        } = this.props;
        return (
            <tr>
                <td scope="row">
                    <a style={{
                        fontWeight: "normal", height: 35,
                        width: 80, padding: 5, flexDirection: "row", display: "flex", color: "#4A4A4A",
                        justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                    }}>
                        <FaLock style={{ fontSize: 14, color: lock }} />
                        {time}
                    </a>
                </td>

                {
                    data != undefined ? (
                        // data.map((key, index) => {
                        //     console.log(key, index, "BOOKINGROW")
                        //     return (
                        //         <td scope="row" key={index} >
                        //             <a onClick={() => modalOpen(data[index])}
                        //                 style={{
                        //                     minWidth: 80,
                        //                     background: "#49BE56", color: "#fff", fontWeight: "normal", height: 30,
                        //                     width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                        //                     justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                        //                 }}>
                        //                 <div>
                        //                     {key.bookerId ? key.bookerId.fullName : "N/a"}
                        //                 </div>
                        //                 <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                        //                     {
                        //                         (key.coverImage) ? (
                        //                             <img src={key.coverImage}
                        //                                 style={{ width: 20, height: 20, borderRadius: 10 }}
                        //                             />
                        //                         ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                        //                             style={{ width: 20, height: 20, borderRadius: 10 }}
                        //                             />
                        //                     }
                        //                 </div>
                        //             </a>
                        //         </td>
                        //     )
                        // })
                        <>
                            {
                                (data[0] != undefined) ? (
                                    <td scope="row"  >
                                        <a onClick={() => modalOpen(data[0])}
                                            style={{
                                                minWidth: 80,
                                                background: "#49BE56", color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div>
                                                {data[0].bookerId ? data[0].bookerId.fullName : "N/a"}
                                            </div>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                                {
                                                    (data[0].coverImage) ? (
                                                        <img src={data[0].coverImage}
                                                            style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                    ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                }
                                            </div>
                                        </a>
                                    </td>
                                ) : <td scope="row"  >
                                        <a
                                            style={{
                                                minWidth: 80,
                                                color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                            </div>
                                        </a>
                                    </td>
                            }
                            {
                                (data[1] != undefined) ? (
                                    <td scope="row"  >
                                        <a onClick={() => modalOpen(data[1])}
                                            style={{
                                                minWidth: 80,
                                                background: "#49BE56", color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div>
                                                {data[1].bookerId ? data[1].bookerId.fullName : "N/a"}
                                            </div>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                                {
                                                    (data[1].coverImage) ? (
                                                        <img src={data[0].coverImage}
                                                            style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                    ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                }
                                            </div>
                                        </a>
                                    </td>
                                ) : <td scope="row"  >
                                        <a
                                            style={{
                                                minWidth: 80,
                                                color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                            </div>
                                        </a>
                                    </td>
                            }
                            {
                                (data[2] != undefined) ? (
                                    <td scope="row"  >
                                        <a onClick={() => modalOpen(data[2])}
                                            style={{
                                                minWidth: 80,
                                                background: "#49BE56", color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div>
                                                {data[2].bookerId ? data[2].bookerId.fullName : "N/a"}
                                            </div>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                                {
                                                    (data[2].coverImage) ? (
                                                        <img src={data[0].coverImage}
                                                            style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                    ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                }
                                            </div>
                                        </a>
                                    </td>
                                ) : <td scope="row"  >
                                        <a
                                            style={{
                                                minWidth: 80,
                                                color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                            </div>
                                        </a>
                                    </td>
                            }
                            {
                                (data[3] != undefined) ? (
                                    <td scope="row"  >
                                        <a onClick={() => modalOpen(data[3])}
                                            style={{
                                                minWidth: 80,
                                                background: "#49BE56", color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div>
                                                {data[3].bookerId ? data[3].bookerId.fullName : "N/a"}
                                            </div>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                                {
                                                    (data[3].coverImage) ? (
                                                        <img src={data[0].coverImage}
                                                            style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                    ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                }
                                            </div>
                                        </a>
                                    </td>
                                ) : <td scope="row">
                                        <a
                                            style={{
                                                minWidth: 80,
                                                color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                            </div>
                                        </a>
                                    </td>
                            }
                            {
                                (data[4] != undefined) ? (
                                    <td scope="row"  >
                                        <a onClick={() => modalOpen(data[4])}
                                            style={{
                                                minWidth: 80,
                                                background: "#49BE56", color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div>
                                                {data[4].bookerId ? data[4].bookerId.fullName : "N/a"}
                                            </div>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                                {
                                                    (data[4].coverImage) ? (
                                                        <img src={data[0].coverImage}
                                                            style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                    ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                }
                                            </div>
                                        </a>
                                    </td>
                                ) : <td scope="row" >
                                        <a
                                            style={{
                                                minWidth: 80,
                                                color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                            </div>
                                        </a>
                                    </td>
                            }
                            {
                                (data[5] != undefined) ? (
                                    <td scope="row"  >
                                        <a onClick={() => modalOpen(data[5])}
                                            style={{
                                                minWidth: 80,
                                                background: "#49BE56", color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div>
                                                {data[5].bookerId ? data[5].bookerId.fullName : "N/a"}
                                            </div>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                                {
                                                    (data[5].coverImage) ? (
                                                        <img src={data[0].coverImage}
                                                            style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                    ) : <img alt="BackGroundImage" src={require('../assets/noPhoto.jpg')}
                                                        style={{ width: 20, height: 20, borderRadius: 10 }}
                                                        />
                                                }
                                            </div>
                                        </a>
                                    </td>
                                ) : <td scope="row" >
                                        <a
                                            style={{
                                                minWidth: 80,
                                                color: "#fff", fontWeight: "normal", height: 30,
                                                width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                                justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                            }}>
                                            <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                            </div>
                                        </a>
                                    </td>
                            }
                        </>

                    ) :
                        [1, 2, 3, 4, 5, 6].map((key, index) => {
                            // console.log(key, index, "BOOKINGROW")
                            return (
                                <td scope="row" key={index} >
                                    <a
                                        style={{
                                            minWidth: 80,
                                            color: "#fff", fontWeight: "normal", height: 30,
                                            width: "80%", borderRadius: 4, padding: 5, flexDirection: "row", display: "flex",
                                            justifyContent: "space-between", fontSize: 9, alignItems: "center", paddingLeft: 10, paddingRight: 10
                                        }}>
                                        <div style={{ width: 20, height: 20, borderRadius: 10 }}>
                                        </div>
                                    </a>
                                </td>
                            )
                        })
                }
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
