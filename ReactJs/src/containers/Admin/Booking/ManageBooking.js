import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBooking.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import {
  getListPatientForDoctorService,
  sendRemedyService,
} from "../../../services/ApiService";
import moment from "moment";
import { toast } from "react-toastify";
class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
    };
  }

  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  async componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getListPatientForDoctorService({
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleBtnConfirm = (item) => {
    let { setLoading } = this.props;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName + " " + item.patientData.lastName,
    };
    this.sendRemedy(data);
  };
  sendRemedy = async (dataChild) => {
    let res = await sendRemedyService(dataChild);
    if (res && res.errCode === 0) {
      toast.success("The patient is examination was successful !");
      await this.getDataPatient();
    } else {
      toast.error("Error !");
      console.log(res);
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { dataPatient } = this.state;
    console.log(dataPatient);
    return (
      <>
        <div className="detail-booking-container">
          <div className="content-title my-5">Quản Lý hóa đơn</div>
          <div className="booking-content">
            <div className="form-row">
              <div className="form-group col-md-3 mx-5">
                <label className="choose-day">Chọn Ngày</label>
                <DatePicker
                  className="form-control"
                  value={this.state.currentDate}
                  onChange={this.handleChangeDatePicker}
                />
              </div>
            </div>
            <CustomScrollbars className="scrollbars-custom">
              <div className="custom-table-booking">
                <table className="table px-3">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col text-center">STT</th>
                      <th className="customcolumn" scope="col">
                        Thời Gian Khám
                      </th>
                      <th className="customcolumn" scope="col">
                        Lý Do Khám
                      </th>
                      <th className="customcolumn" scope="col">
                        Giá Khám
                      </th>
                      <th className="customcolumn" scope="col">
                        Họ Tên
                      </th>
                      <th className="customcolumn" scope="col">
                        Email
                      </th>
                      <th className="customcolumn" scope="col">
                        Địa Chỉ
                      </th>
                      <th className="customcolumn" scope="col">
                        SĐT
                      </th>
                      <th className="customcolumn" scope="col">
                        Giới Tính
                      </th>
                      <th className="customcolumn" scope="col">
                        Thời gian đặt
                      </th>
                      <th className="customcolumn" scope="col">
                        Tên Bác Sĩ Khám
                      </th>
                      <th className="customcolumn" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPatient &&
                      dataPatient.length > 0 &&
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="customcolumn">
                              {item.timeTypeDataPatient.valueVi}
                            </td>
                            <td className="customcolumn">{item.reason}</td>
                            <td className="customcolumn">
                              {item.price + " VND"}
                            </td>
                            <td className="customcolumn">
                              {item.patientData.firstName +
                                " " +
                                item.patientData.lastName}
                            </td>
                            <td className="customcolumn">
                              {item.patientData.email}
                            </td>
                            <td className="customcolumn">
                              {item.patientData.address}
                            </td>
                            <td className="customcolumn">
                              {item.patientData.phonenumber}
                            </td>
                            <td className="customcolumn">
                              {item.patientData.genderData.valueVi}
                            </td>
                            <td className="customcolumn">
                              {moment(item.createdAt).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </td>
                            <td className="customcolumn">
                              {item.doctorDataBooking.lastName +
                                " " +
                                item.doctorDataBooking.firstName}
                            </td>
                            <td className="customcolumn">
                              <button
                                type="button"
                                className="btn btn-warning px-3 mx-2 customcolumn"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác Nhận
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CustomScrollbars>
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
  return {
    setLoading: (isLoading) => dispatch(actions.setLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
