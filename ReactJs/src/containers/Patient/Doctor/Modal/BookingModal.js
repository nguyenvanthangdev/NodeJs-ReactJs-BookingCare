import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { withRouter } from "react-router";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import {
  postBookAppointmentService,
  getExtraInforDoctorByIdService,
} from "../../../../services/userService";
import NumericFormat from "react-number-format";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { toast } from "react-toastify";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      price: "",
      extraInfor: {},
    };
  }
  async componentDidMount() {
    this.props.getGenders();
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
        return null;
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        let res = await getExtraInforDoctorByIdService(
          this.props.dataTime.doctorId
        );
        if (res && res.errCode === 0) {
          this.setState({
            extraInfor: res.data,
          });
        }
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleOnChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  handleConfirmBooking = async () => {
    let { isLoggedIn } = this.props;
    if (isLoggedIn !== true) {
      if (this.props.history) {
        this.props.history.push(`/login`);
      }
    } else if (isLoggedIn === true) {
      let date = new Date(this.state.birthday).getTime();
      let res = await postBookAppointmentService({
        fullName: this.state.fullName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
        reason: this.state.reason,
        date: date,
        selectedGender: this.state.selectedGender?.value || "",
        doctorId: this.state.doctorId,
        timeType: this.state.timeType,
        price: this.state.extraInfor?.priceTypeData?.valueVi || "",
      });
      if (res && res.errCode === 0) {
        toast.success("Booking a new appointment succeed !");
        this.props.closeBookingClose();
      } else if (res && res.errCode === 1) {
        toast.error("Missing input parameters !");
      } else {
        toast.error("Booking a new appointment error !");
      }
    }
  };
  render() {
    let { extraInfor } = this.state;
    let { isOpenModel, closeBookingClose, dataTime, language } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    console.log("ashsf", this.props);
    console.log("ashsf", this.state);
    console.log("ashsf", this.state.extraInfor.priceTypeData);
    return (
      <>
        <Modal
          isOpen={isOpenModel}
          toggle={closeBookingClose}
          className="booking-modal-container"
          centered
          size="lg"
        >
          <ModalHeader
            className="modal-header-custom"
            toggle={closeBookingClose}
          >
            Thông tin đặt lịch khám bệnh
          </ModalHeader>
          <ModalBody>
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
              />
            </div>
            <div className="row ">
              <form className="ml-5 row g-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Họ tên</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Địa chỉ Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Địa chỉ liên hệ</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Lý do khám</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "reason")
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Ngày Sinh </label>
                    <DatePicker
                      className="form-control"
                      value={this.state.birthday}
                      onChange={this.handleOnChangeDatePicker}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giới tính</label>
                    <Select
                      value={this.state.selectedGender}
                      onChange={this.handleOnChangeSelect}
                      options={this.state.genders}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="price-custom">
                  <span className="price-custom-title">
                    Tổng tiền thanh toán :
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumericFormat
                          className="price-custom-body"
                          value={extraInfor.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumericFormat
                          className="price-custom-body"
                          value={extraInfor.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"USD"}
                        />
                      )}
                  </span>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn px-3"
              color="primary"
              onClick={() => this.handleConfirmBooking()}
            >
              Xác Nhận
            </Button>
            <Button
              className="btn px-3"
              color="secondary"
              onClick={closeBookingClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookingModal)
);
