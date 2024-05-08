import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
// eslint-disable-next-line
import { getExtraInforDoctorByIdService } from "../../../services/ApiService";
import NumericFormat from "react-number-format";
import { LANGUAGES } from "../../../utils";
class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">ĐỊA CHỈ KHÁM :</div>
            <div className="name-clinic">
              {extraInfor && extraInfor.addressClinic
                ? extraInfor.addressClinic
                : ""}
            </div>
            <div className="text-address">PHÒNG KHÁM : </div>
            <div className="detail-address">
              {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfor === false && (
              <div className="short-infor">
                GIÁ KHÁM :
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumericFormat
                      className="currency"
                      value={extraInfor.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" VND"}
                    />
                  )}
                {extraInfor &&
                  extraInfor.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumericFormat
                      className="currency"
                      value={extraInfor.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={" USD"}
                    />
                  )}
                <span
                  className="detail"
                  onClick={() => this.showHideDetailInfor(true)}
                >
                  Xem chi tiết
                </span>
              </div>
            )}
            {isShowDetailInfor === true && (
              <>
                <div className="title-price">GIÁ KHÁM</div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">Giá khám : </span>
                    <span className="right">
                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.VI && (
                          <NumericFormat
                            className="currency"
                            value={extraInfor.priceTypeData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" VND"}
                          />
                        )}
                      {extraInfor &&
                        extraInfor.priceTypeData &&
                        language === LANGUAGES.EN && (
                          <NumericFormat
                            className="currency"
                            value={extraInfor.priceTypeData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" USD"}
                          />
                        )}
                    </span>
                  </div>
                  <div className="note">
                    {extraInfor && extraInfor.note ? extraInfor.note : ""}
                  </div>
                </div>

                <div className="payment">
                  Người bệnh có thể thanh toán chi phí bằng hình thức :{" "}
                  {extraInfor &&
                  extraInfor.paymentTypeData &&
                  language === LANGUAGES.VI
                    ? extraInfor.paymentTypeData.valueVi
                    : ""}
                  {extraInfor &&
                  extraInfor.paymentTypeData &&
                  language === LANGUAGES.EN
                    ? extraInfor.paymentTypeData.valueEn
                    : ""}
                </div>
                <div className="hide-price">
                  <span onClick={() => this.showHideDetailInfor(false)}>
                    Ẩn bảng giá
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
