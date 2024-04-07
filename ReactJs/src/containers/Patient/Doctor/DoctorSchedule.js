import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
// eslint-disable-next-line
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModelBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState({
      allDays: allDays,
    });
  }
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }
      console.log("check", res);
    }
  };
  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModelBooking: true,
      dataScheduleTimeModal: time,
    });
  };
  closeBookingClose = () => {
    this.setState({
      isOpenModelBooking: false,
    });
  };
  render() {
    let {
      allDays,
      allAvalableTime,
      isOpenModelBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              className="my-3"
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="tex-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch Khám</span>
              </i>
            </div>
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                allAvalableTime.map((item, index) => {
                  let timeDisplay =
                    language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      className="btn custom-btn"
                      onClick={() => this.handleClickScheduleTime(item)}
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <div className="text">
                  Không có lịch hẹn trong thời gian này , vui lòng chọn thời
                  gian khác !
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModel={isOpenModelBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
