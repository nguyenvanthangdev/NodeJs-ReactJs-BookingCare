import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import HomeHeader from "../../HomePage/Home/HomeHeader";
import { LANGUAGES } from "../../../utils";
import { getDetailDoctorByIdService } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtrainfor from "./DoctorExtrainfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currenDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currenDoctorId: id,
      });
      let res = await getDetailDoctorByIdService(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    //console.log("state", this.state);
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <React.Fragment>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor-title">
            <div className="intro-doctor">
              <div
                className="content-left"
                style={{
                  backgroundImage: `url(${
                    detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                  })`,
                }}
              ></div>
              <div className="content-right">
                <div className="up">
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </div>
                <div className="down">
                  {detailDoctor &&
                    detailDoctor.DoctorDescription &&
                    detailDoctor.DoctorDescription.description && (
                      <span>{detailDoctor.DoctorDescription.description}</span>
                    )}
                </div>
              </div>
            </div>
            <div className="schelude-doctor">
              <div className="content-left">
                <DoctorSchedule
                  doctorIdFromParent={this.state.currenDoctorId}
                />
              </div>
              <div className="content-right">
                <DoctorExtrainfor
                  doctorIdFromParent={this.state.currenDoctorId}
                />
              </div>
            </div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.DoctorDescription &&
              detailDoctor.DoctorDescription.doctorDescriptionHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      detailDoctor.DoctorDescription.doctorDescriptionHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="customfooter"></div>
          <div className="comment-doctor"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
