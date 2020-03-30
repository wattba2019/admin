import React, { Component, } from 'react';
import '../custom.css'
import { Modal } from "antd";
import "antd/dist/antd.css";

class NewGooeleMap extends Component {

    setModal2Visible(modal2Visible) {
        this.props.setModal2Visible(modal2Visible)
    }

    render() {
        const { setModalVisible, } = this.props.modalState;
        return (
            <div>
                <Modal
                    footer={null}
                    centered
                    visible={setModalVisible}
                    onOk={() => { this.state.setModal2Visible(false) }}
                    onCancel={() => this.setModal2Visible(false)}
                    bodyStyle={{ padding: 0, }}
                    width={"35%"}
                    minWidth={"35%"}
                >
                    <div style={{
                        display: "flex", flex: 1, flexDirection: "column",
                        // background: "red"
                    }}>


                    </div >
                </Modal>
            </div>

        )
    }
}

export default NewGooeleMap;
