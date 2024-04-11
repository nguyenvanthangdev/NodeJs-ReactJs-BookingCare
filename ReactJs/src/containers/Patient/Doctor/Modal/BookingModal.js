import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
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
import { toast } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//require("dotenv").config();
//const ID_PAYPAL_KEY = process.env.ID_PAYPAL_KEY;
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
      doctorId: "",
      timeType: "",
      price: "",
      extraInfor: {},
      genders: "",
      genderArr: [],
    };
  }
  async componentDidMount() {
    this.props.getGenders();
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getExtraInforDoctorByIdService(id);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        genders:
          arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
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
  isFormValid() {
    let {
      fullName,
      phoneNumber,
      email,
      address,
      reason,
      birthday,
      genders,
      doctorId,
      timeType,
      extraInfor,
    } = this.state;
    return (
      fullName &&
      phoneNumber &&
      email &&
      address &&
      reason &&
      birthday &&
      genders &&
      doctorId &&
      timeType &&
      extraInfor
    );
  }
  handleCheckLohin = async () => {
    let { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      if (this.props.history) {
        this.props.history.push(`/login`);
      }
    }
  };
  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let res = await postBookAppointmentService({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      genders: this.state.genders,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      price: this.state.extraInfor.priceTypeData?.valueVi,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed !");
      this.props.closeBookingClose();
    } else if (res && res.errCode === 1) {
      toast.error("Missing input parameters !");
    } else {
      toast.error("Booking a new appointment error !");
    }
  };
  render() {
    let { extraInfor } = this.state;
    let { isOpenModel, closeBookingClose, dataTime, language } = this.props;
    let genders = this.state.genderArr;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    let priceVND = this.state.extraInfor.priceTypeData?.valueVi;
    let priceUSD = this.state.extraInfor.priceTypeData?.valueEn;
    let exchangeRate = 25000;
    let priceVNDToUSD = priceVND / exchangeRate;
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    console.log(
      "this.state.extraInfor.priceTypeData",
      this.state.extraInfor.priceTypeData
    );
    //this.props.match.params.id
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
                    <select
                      className="form-select"
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "genders")
                      }
                      value={genders}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
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
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "Ac5ebgBXXf3Wb7Ve9IZMI7xf1mTVWvj-9z49U2eKESW4Qe0GjIRSiD2v-uF1cuRn2j9L510BVHTIRyQw",
                  }}
                >
                  <PayPalButtons
                    className="paypal-buttons"
                    disabled={!this.isFormValid()}
                    onClick={() => this.handleCheckLohin()}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value:
                                extraInfor &&
                                extraInfor.priceTypeData &&
                                language === LANGUAGES.VI
                                  ? priceVNDToUSD
                                  : priceUSD,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      await actions.order.capture();
                      this.handleConfirmBooking();
                    }}
                  />
                </PayPalScriptProvider>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
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
