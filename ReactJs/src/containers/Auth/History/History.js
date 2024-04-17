import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/Home/HomeHeader";
import "./History.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";
import { getHistoryBookingService } from "../../../services/ApiService";
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
    let { userInfo } = this.props;
    let res = await getHistoryBookingService(userInfo.id);
    if (res && res.errCode === 0) {
      this.setState({
        arrHistoryBooking: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    //JSX
    let arrHistoryBooking = this.state.arrHistoryBooking;
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
                        Giới Tính
                      </th>
                      <th className="customcolumn" scope="col">
                        Tên Bác Sĩ Khám
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
                              {item.timeTypeDataPatient?.valueVi}
                            </td>
                            <td className="customcolumn">{item.reason}</td>
                            <td className="customcolumn">
                              {item.price + " VND"}
                            </td>
                            <td className="customcolumn">
                              {item.patientData?.firstName +
                                " " +
                                item.patientData?.lastName}
                            </td>
                            <td className="customcolumn">
                              {item.patientData?.email}
                            </td>
                            <td className="customcolumn">
                              {item.patientData?.address}
                            </td>
                            <td className="customcolumn">
                              {item.patientData?.genderData?.valueVi}
                            </td>
                            <td className="customcolumn">
                              {item.doctorDataBooking?.firstName +
                                " " +
                                item.doctorDataBooking?.lastName}
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
    navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
