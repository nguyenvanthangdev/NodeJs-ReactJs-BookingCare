import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, USER_ROLE } from "../../../utils";
//dateFormat
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import CustomScrollbars from "../../../components/CustomScrollbars";
import {
  SaveBulkScheduleDoctor,
  getAllScheduleService,
  getDeleteScheduleService,
} from "../../../services/ApiService";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      listSchedule: [],
    };
  }

  async componentDidMount() {
    this.props.fetchALLDoctors();
    this.props.fetchALLScheduleTime();
  }
  getAllScheduleDoctor = async () => {
    let { isLoggedIn, userInfo } = this.props;
    if (
      isLoggedIn === true &&
      userInfo &&
      userInfo.roleId === USER_ROLE.DOCTOR
    ) {
      let { currentDate } = this.state;
      let formatedDateAll = new Date(currentDate).getTime();
      let res = await getAllScheduleService({
        doctorId: userInfo.id,
        date: formatedDateAll,
      });
      if (res && res.errCode === 0) {
        this.setState({
          listSchedule: res.data,
        });
      } else {
        this.setState({
          listSchedule: [],
        });
      }
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  builDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
        return null;
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () => {
      this.fetchSchedule(selectedDoctor, this.state.currentDate);
    });
  };

  handleChangeDatePicker = (date) => {
    let { isLoggedIn, userInfo } = this.props;
    if (
      isLoggedIn === true &&
      userInfo &&
      userInfo.roleId === USER_ROLE.DOCTOR
    ) {
      this.setState({ currentDate: date[0] }, () => {
        this.getAllScheduleDoctor();
      });
    }
    this.setState({ currentDate: date[0] }, () => {
      this.fetchSchedule(this.state.selectedDoctor, date[0]);
    });
  };

  fetchSchedule = async (selectedDoctor, currentDate) => {
    if (selectedDoctor && selectedDoctor.value && currentDate) {
      let formatedDateAll = new Date(currentDate).getTime();
      let res = await getAllScheduleService({
        doctorId: selectedDoctor.value,
        date: formatedDateAll,
      });
      if (res && res.errCode === 0) {
        this.setState({
          listSchedule: res.data,
        });
      } else {
        this.setState({
          listSchedule: [],
        });
      }
    }
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid Date !");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor !");
      return;
    }
    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
          return null;
        });
      } else {
        toast.error("Invalid selected time !");
        return;
      }
    }
    let res = await SaveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });
    if (res && res.errCode === 0) {
      await this.fetchSchedule(selectedDoctor, currentDate);
      toast.success("Selected time success !");
    } else {
      toast.success("Erorr selected time !");
      console.log("Erorr selected time !", res);
    }
  };

  handleDelete = async (schedule) => {
    try {
      let res = await getDeleteScheduleService(schedule.id);
      let selectedDoctor = this.state.selectedDoctor;
      let currentDate = this.state.currentDate;
      if (res && res.errCode === 0) {
        await this.fetchSchedule(selectedDoctor, currentDate);
        toast.success(res.errMessage);
      } else {
        toast.error(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { rangeTime, listSchedule } = this.state;
    let { language, isLoggedIn, userInfo } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log(this.props);
    console.log(this.state);
    console.log(this.props.allDoctors);
    return (
      <div className="manage-schedule-container">
        {isLoggedIn === true &&
        userInfo &&
        userInfo.roleId === USER_ROLE.ADMIN ? (
          <div className="m-s-title my-5">QUẢN LÝ LỊCH KHÁM</div>
        ) : (
          <div className="m-s-title my-5">LỊCH KHÁM CỦA BÁC SĨ</div>
        )}
        <div className="container-title">
          <div className="container container-body">
            <div className="row">
              <div className="form-row">
                <div className="col-12 form-group">
                  {isLoggedIn === true &&
                  userInfo &&
                  userInfo.roleId === USER_ROLE.ADMIN ? (
                    <>
                      <label className="title-custom1">Chọn Bác Sĩ</label>
                      <Select
                        className="select-doctor"
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                      />
                    </>
                  ) : (
                    <>
                      <label className="title-custom1">
                        Tên{" " + userInfo.lastName + " " + userInfo.firstName}
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom2">Chọn Ngày</label>
                  <DatePicker
                    onChange={this.handleChangeDatePicker}
                    className="form-control"
                    value={this.state.currentDate}
                    minDate={yesterday}
                  />
                </div>
              </div>
            </div>
            {isLoggedIn === true &&
            userInfo &&
            userInfo.roleId === USER_ROLE.ADMIN ? (
              <>
                <button
                  className="btn btn-primary btn-custom"
                  onClick={() => this.handleSaveSchedule()}
                >
                  Lưu Thông Tin
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="col-12 pick-hour-container">
            <div className="form-group-custom">
              {isLoggedIn === true &&
              userInfo &&
              userInfo.roleId === USER_ROLE.ADMIN ? (
                <>
                  <div className="title-custom3">Chọn Giờ</div>
                  {rangeTime &&
                    rangeTime.length > 0 &&
                    rangeTime.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={
                            item.isSelected === true
                              ? "btn custom-btn-active active"
                              : "btn custom-btn"
                          }
                          onClick={() => this.handleClickBtnTime(item)}
                        >
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </button>
                      );
                    })}
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="table-custom">
              <CustomScrollbars>
                <table className="table px-3">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col text-center">STT</th>
                      <th className="customcolumn" scope="col">
                        Thời Gian
                      </th>
                      <th className="customcolumn" scope="col">
                        Ngày
                      </th>
                      {isLoggedIn === true &&
                      userInfo &&
                      userInfo.roleId === USER_ROLE.ADMIN ? (
                        <>
                          <th className="customcolumn" scope="col">
                            Actions
                          </th>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {listSchedule &&
                      listSchedule.length > 0 &&
                      listSchedule.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="customcolumn">
                              {item.timeTypeData.valueVi}
                            </td>
                            <td className="customcolumn-ngay">
                              {moment
                                .unix(+item.date / 1000)
                                .format("dddd - DD/MM/YYYY")}
                            </td>
                            <td className="customcolumn">
                              {isLoggedIn === true &&
                              userInfo &&
                              userInfo.roleId === USER_ROLE.ADMIN ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-danger px-3 customcolumn"
                                    onClick={() => this.handleDelete(item)}
                                  >
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </CustomScrollbars>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    fetchALLScheduleTime: () => dispatch(actions.fetchALLScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
