import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import NumericFormat from "react-number-format";
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
    }
  }
  render() {
    let { dataProfile } = this.state;
    let { language } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    console.log("dhuajdsa", dataProfile);
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
                {dataProfile &&
                  dataProfile.Markdown &&
                  dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="price">
            <span>Giá Khám : </span>
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.VI && (
                <NumericFormat
                  className="currency"
                  value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              )}
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              language === LANGUAGES.EN && (
                <NumericFormat
                  className="currency"
                  value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"USD"}
                />
              )}
          </div>
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
