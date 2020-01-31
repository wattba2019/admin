import React, { Component, } from 'react';
import '../custom.css'
import { Modal } from "antd";
import "antd/dist/antd.css";

class BookingDetailsModal extends Component {

    setModal2Visible(modal2Visible) {
        this.props.setModal2Visible(modal2Visible)
    }

    render() {
        const { modal2Visible, } = this.props.modalState;
        return (
            <div>
                <Modal
                    footer={null}
                    centered
                    visible={modal2Visible}
                    onOk={() => { this.props.setModal2Visible(false) }}
                    onCancel={() => this.setModal2Visible(false)}
                >
                    <div>
                        123456
                    </div>
                </Modal>
            </div>

        )
    }
}

export default BookingDetailsModal;
