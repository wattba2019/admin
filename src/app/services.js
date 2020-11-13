import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { addService, getServices, updateService } from "../store/action/action";
import ServiceModal from '../components/ServiceModal';
import ServiceCard from '../components/ServiceCard';

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            showerror: false,
            email: "",
            categoryName: "",
            serviceName: "",
            price: "",
            modal2Visible: false,
            modal2VisibleEdit: false,
            editService: {},
            indexToEdit: undefined,
            extraService: [],
            extraServiceqty: 1,
        }
        this.state.extraServiceqtyArr = Array.apply(null, { length: this.state.extraServiceqty });
        this.setModal2Visible = this.setModal2Visible.bind(this);
        this.addExtraServiceField = this.addExtraServiceField.bind(this);
        this.delExtraService = this.delExtraService.bind(this);
        this.addExtraService = this.addExtraService.bind(this);
        this.saveService = this.saveService.bind(this);
        this.setModal2VisibleEdit = this.setModal2VisibleEdit.bind(this);
        this.props.getServices(this.props.uid);
    }

    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }

    setModal2VisibleEdit(modal2VisibleEdit, editService, indexToEdit) {
        if (modal2VisibleEdit) {
            let serviceName = editService.serviceName;
            let price = editService.price;
            let extraService = editService.extraServices;
            let extraServiceqty = editService.extraServices.length;
            let extraServiceqtyArr = Array.apply(null, { length: extraServiceqty });
            this.setState({ modal2VisibleEdit, editService, serviceName, price, extraService, extraServiceqty, extraServiceqtyArr, indexToEdit });
        }
        else {
            let serviceName = '';
            let price = '';
            let extraService = [];
            let extraServiceqty = 1;
            let extraServiceqtyArr = Array.apply(null, { length: extraServiceqty });
            let editService = {};
            let indexToEdit = undefined;
            this.setState({ modal2VisibleEdit });
            this.setState({ editService, serviceName, price, extraService, extraServiceqty, extraServiceqtyArr, indexToEdit });
        }
    }

    addExtraService = (input, type, index) => {
        // console.log(input, type, index, "DATA");
        let extraService = this.state.extraService;
        extraService[index] = (extraService[index]) ? extraService[index] : {};
        extraService[index][type] = input;
        // console.log(extraService, 'extraservice add');
        this.setState({ extraService });
    }

    addExtraServiceField = () => {
        let extraServiceqty = this.state.extraServiceqty
        extraServiceqty = ++extraServiceqty;
        let extraServiceqtyArr = Array.apply(null, { length: extraServiceqty });
        this.setState({ extraServiceqty, extraServiceqtyArr });
    }

    delExtraService = (index) => {
        if (index) {
            let extraService = this.state.extraService.slice(0)
            extraService.splice(index, 1)
            let extraServiceqty = this.state.extraServiceqty
            extraServiceqty = --extraServiceqty;
            let extraServiceqtyArr = Array.apply(null, { length: extraServiceqty });
            this.setState({ extraServiceqty, extraServiceqtyArr, extraService });
        }
    }

    saveService() {
        let service = {
            categoryName: this.state.categoryName,
            serviceName: this.state.serviceName,
            price: this.state.price,
            userId: this.props.uid,
            extraServices: this.state.extraService
        }
        console.log(service, 'saved_service_called');
        if (this.state.modal2Visible) {
            this.props.addService(service);
        }
        else {
            service._id = this.state.editService._id;
            this.props.updateService(service, this.state.indexToEdit);
        }
        let extraServiceqtyArr = Array.apply(null, { length: 1 });
        this.setState({
            categoryName: "",
            serviceName: "",
            price: "",
            extraService: [],
            extraServiceqty: 1,
            modal2Visible: false,
            modal2VisibleEdit: false,
            extraServiceqtyArr,
            editService: {},
            indexToEdit: undefined
        })
    }

    render() {
        const { services } = this.props;
        return (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", }}>
                <div style={{ display: "flex", flex: 1, width: "90%", justifyContent: "space-between" }}>
                    <div style={{ minWidth: 150 }}>
                        <span style={{ fontSize: 18, fontWeight: "bold" }}>Services Provided</span>
                    </div>
                    <button style={{ minWidth: 80 }} className="buttonAdd" onClick={() => this.setModal2Visible(true)} >
                        <span className="buttonmatter" style={{ fontSize: 12, }}>Add Service</span>
                    </button>
                </div>
                <div style={{ display: "flex", flex: 1, width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", background: "#F7F8F8", }}>
                    <ServiceCard services={services} setModal2Visible={this.setModal2Visible} setModal2VisibleEdit={this.setModal2VisibleEdit} />
                </div>
                <div>
                    <ServiceModal modalState={this.state} setModal2Visible={this.setModal2Visible} setModal2VisibleEdit={this.setModal2VisibleEdit} addExtraServiceField={this.addExtraServiceField} delExtraService={this.delExtraService} addExtraService={this.addExtraService} saveService={this.saveService} that={this} />
                </div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        bseUrl: state.root.bseUrl,
        uid: state.root.userProfile._id,
        services: state.root.services
    })
}

function mapDispatchToProp(dispatch) {
    return ({
        addService: (service) => {
            dispatch(addService(service));
        },
        getServices: (uid) => {
            dispatch(getServices(uid));
        },
        updateService: (service, indexToEdit) => {
            dispatch(updateService(service, indexToEdit));
        },
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Services);