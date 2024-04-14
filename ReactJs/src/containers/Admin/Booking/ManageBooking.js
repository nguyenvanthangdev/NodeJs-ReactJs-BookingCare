import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageBooking.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";
import DatePicker from "../../../components/Input/DatePicker";
class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }
  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let arrUsers = this.state;
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
                  onChange={this.handleOnChangeDatePicker}
                />
              </div>
            </div>
            <CustomScrollbars>
              <div className="custom-table-booking">
                <table className="table px-3">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col text-center">Email</th>
                      <th className="customcolumn" scope="col">
                        First Name
                      </th>
                      <th className="customcolumn" scope="col">
                        Last Name
                      </th>
                      <th className="customcolumn" scope="col">
                        Address
                      </th>
                      <th className="customcolumn" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrUsers &&
                      arrUsers.length > 0 &&
                      arrUsers.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.email}</td>
                            <td className="customcolumn">{item.firstName}</td>
                            <td className="customcolumn">{item.lastName}</td>
                            <td className="customcolumn">{item.address}</td>
                            <td className="customcolumn">
                              <button
                                type="button"
                                className="btn btn-warning px-3 mx-2"
                                onClick={() => this.handEditUser(item)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger px-3"
                                onClick={() => this.handleDeleteUser(item)}
                              >
                                Delete
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
