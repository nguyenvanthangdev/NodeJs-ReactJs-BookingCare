import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorByIdService } from "../../../services/ApiService";
import { LANGUAGES } from "../../../utils";
import NumericFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorByIdService(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // let data = await this.getInforDoctor(this.props.doctorId);
      // this.setState({
      //   dataProfile: data,
      // });
    }
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("dddd - DD/MM/YYYY");
      return (
        <>
          <div>
            {time} {date}
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    let { dataProfile } = this.state;
    let {
      language,
      dataTime,
      isShowDescriptionDoctor,
      isShowPrice,
      isShowLinkDetail,
      doctorId,
    } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    //console.log("dhuajdsa", dataProfile);
    return (
      <>
        <div className="intro-doctor-modal">
          <div className="intro-doctor">
            <div
              className="content-left-doctor"
              style={{
                backgroundImage: `url(${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>
            <div className="content-right-doctor">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {dataProfile &&
                      dataProfile.Doctor_Expertise &&
                      dataProfile.Doctor_Expertise.description && (
                        <span>{dataProfile.Doctor_Expertise.description}</span>
                      )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataTime)}</>
                )}
              </div>
            </div>
          </div>
          {isShowLinkDetail === true && (
            <div className="view-datai-doctor">
              <Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
            </div>
          )}
          {isShowPrice === true ? (
            <div className="price">
              <span>Giá Khám : </span>
              {dataProfile &&
                dataProfile.Doctor_Detail &&
                language === LANGUAGES.VI && (
                  <NumericFormat
                    className="currency"
                    value={dataProfile.Doctor_Detail.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {dataProfile &&
                dataProfile.Doctor_Detail &&
                language === LANGUAGES.EN && (
                  <NumericFormat
                    className="currency"
                    value={dataProfile.Doctor_Detail.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"USD"}
                  />
                )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
