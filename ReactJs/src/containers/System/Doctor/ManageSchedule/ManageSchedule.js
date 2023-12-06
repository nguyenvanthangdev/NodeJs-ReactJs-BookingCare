import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import DatePicker from "../../../../components/Input/DatePicker";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  async componentDidMount() {
    this.props.fetchALLDoctors();
    this.props.fetchALLScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({
        rangeTime: this.props.allScheduleTime,
      });
    }

    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.builDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
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
    this.setState({ selectedDoctor });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;

    return (
      <div className="manage-schedule-container">
        <div className="m-s-title my-5">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container-title">
          <div className="container container-body">
            <div className="row">
              <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom1">
                    <FormattedMessage id="manage-schedule.choose-doctor" />
                  </label>
                  <Select
                    className="select-doctor"
                    value={this.state.selectedDoctor}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctors}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-12 form-group">
                  <label className="title-custom2">
                    <FormattedMessage id="manage-schedule.select-date" />
                  </label>
                  <DatePicker
                    onChange={this.handleChangeDatePicker}
                    className="form-control"
                    value={this.state.currentDate}
                    minDate={new Date()}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-custom">
              <FormattedMessage id="manage-schedule.save-infor" />
            </button>
          </div>
          <div className="col-12 pick-hour-container">
            <div className="title-custom3">
              <FormattedMessage id="manage-schedule.select-hours" />
            </div>
            <div className="form-group-custom">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button key={index} className="btn custom-btn">
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchALLDoctors: () => dispatch(actions.fetchALLDoctors()),
    fetchALLScheduleTime: () => dispatch(actions.fetchALLScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
