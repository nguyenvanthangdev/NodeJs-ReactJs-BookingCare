import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/Home/HomeHeader";
import "./History.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";
import {
  getHistoryBookingService,
  handleDeleteBookingService,
} from "../../../services/ApiService";
import moment from "moment";
import { toast } from "react-toastify";
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHistoryBooking: [],
    };
  }
  async componentDidMount() {
    this.getAllHistoryBooking();
  }
  getAllHistoryBooking = async () => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getHistoryBookingService(id);
      if (res && res.errCode === 0) {
        this.setState({
          arrHistoryBooking: res.data,
        });
      }
    }

    // let { userInfo } = this.props;
    // if (userInfo && userInfo.id) {
    //   let res = await getHistoryBookingService(userInfo.id);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       arrHistoryBooking: res.data,
    //     });
    //   }
    // }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleCan = async (bookingId) => {
    try {
      let res = await handleDeleteBookingService(bookingId.id);
      if (res && res.errCode === 0) {
        await this.getAllHistoryBooking();
        toast.success(res.errMessage);
      } else {
        toast.error(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    //JSX
    let { arrHistoryBooking } = this.state;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="history-container">
          <div className="history-content">
            <CustomScrollbars>
              <div className="custom-table-booking">
                <table className="table px-3">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col text-center">STT</th>
                      <th className="customcolumn" scope="col">
                        Thời Gian Khám
                      </th>
                      <th className="customcolumn" scope="col">
                        Ngày Khám
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
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrHistoryBooking &&
                      arrHistoryBooking.length > 0 &&
                      arrHistoryBooking.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="customcolumn">
                              {item.timeTypeDataPatient.valueVi}
                            </td>
                            <td className="customcolumn-ngay">
                              {moment
                                .unix(+item.date / 1000)
                                .format("dddd - DD/MM/YYYY")}
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
                              {item.doctorDataBooking.firstName +
                                " " +
                                item.doctorDataBooking.lastName}
                            </td>
                            <td className="customcolumn">
                              {item.statusId === "S2" ? (
                                <button
                                  type="button"
                                  className="btn btn-danger px-3"
                                  onClick={() => this.handleCan(item)}
                                >
                                  Hủy Lịch
                                </button>
                              ) : (
                                "Đã Khám Xong"
                              )}
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
    userInfo: state.user.userInfo,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
