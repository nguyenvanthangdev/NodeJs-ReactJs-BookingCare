import React, { Component } from "react";
import { connect } from "react-redux";
import "./Dashboard.scss";
import {
  getCountClinicService,
  allClinicService,
  getAllUsers,
  getCountDoctorService,
  getCountUserService,
  getAllSpecialtyService,
  getCountSpecialtyService,
  getSumMoneyService,
  getCountBookingService,
  getCountBookingService1,
  getSumMoneyService1,
  getSumMoneyService2,
} from "../../../services/ApiService";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDoctor: 0,
      countPatient: 0,
      arrUser: [],
      countClinic: 0,
      arrClinic: [],
      countSpecialty: 0,
      arrSpecialty: [],
      sumMoney: 0,
      sumMoney1: 0,
      sumMoney2: 0,
      countBooking: 0,
      countBooking1: 0,
    };
  }

  async componentDidMount() {
    await this.getFromReact();
  }
  getFromReact = async () => {
    let res1 = await allClinicService("ALL");
    let res2 = await getAllUsers("ALL");
    let res3 = await getAllSpecialtyService("ALL");
    if (
      (res1 && res1.errCode === 0) ||
      (res2 && res2.errCode === 0) ||
      (res3 && res3.errCode === 0)
    ) {
      await this.getCount();
      this.setState({
        arrUser: res2.data,
        arrClinic: res1.data,
        arrSpecialty: res3.data,
      });
    }
  };
  getCount = async () => {
    try {
      let res1 = await getCountClinicService();
      let res2 = await getCountUserService();
      let res3 = await getCountDoctorService();
      let res4 = await getCountSpecialtyService();
      let res5 = await getSumMoneyService();
      let res8 = await getSumMoneyService1();
      let res9 = await getSumMoneyService2();
      let res6 = await getCountBookingService();
      let res7 = await getCountBookingService1();
      this.setState({
        countClinic: res1.count,
        countPatient: res2.count,
        countDoctor: res3.count,
        countSpecialty: res4.count,
        sumMoney: res5.sum,
        countBooking: res6.count,
        countBooking1: res7.count,
        sumMoney1: res8.sum,
        sumMoney2: res9.sum,
      });
    } catch (error) {
      console.error("Error ! ", error);
    }
  };
  render() {
    const data1 = [
      { name: "Người Dùng", value: this.state.countPatient },
      { name: "Bác Sĩ", value: this.state.countDoctor },
      { name: "Cơ sở", value: this.state.countClinic },
      { name: "Chuyên Khoa", value: this.state.countSpecialty },
      { name: "Đặt Lịch", value: this.state.countBooking },
      { name: "Khám Xong", value: this.state.countBooking1 },
    ];
    const data2 = [
      { name: "Tổng Tiền Đặt", value: this.state.sumMoney },
      { name: "Tổng Tiền Khám Xong", value: this.state.sumMoney1 },
      { name: "Tổng Tiền ", value: this.state.sumMoney2 },
    ];
    return (
      <>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4 my-4"></div>
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-danger mb-1 h4">
                        Người Dùng
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.countPatient}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success mb-1 h4">
                        Bác Sĩ
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.countDoctor}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning mb-1 h4">
                        Cơ sở
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.countClinic}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-house fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1 h4">
                        Chuyên Khoa
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.countSpecialty}
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fas fa-venus fa-2x text-gray-300"></i> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary mb-1 h4">
                        Đặt Lịch
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.countBooking}
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fas fa-venus fa-2x text-gray-300"></i> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold mb-1 h4 text-purple">
                        Khám Xong
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.countBooking1}
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fas fa-venus fa-2x text-gray-300"></i> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-muted mb-1 h4">
                        Tổng Tiền Đặt
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.sumMoney} VNĐ
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fa-2x text-gray-300 font-weight-bold"></i> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-muted mb-1 h4">
                        Tổng Tiền Khám Xong
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.sumMoney1} VNĐ
                      </div>
                    </div>
                    <div className="col-auto">
                      {/* <i className="fa-2x text-gray-300 font-weight-bold"></i> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-dashboard">
            <BarChart
              width={900}
              height={550}
              data={data1}
              className="card my-5 col-xl-12 col-md-6 mb-4 barchart-custom1"
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="value" fill="#29af33" />
            </BarChart>
            <BarChart
              width={550}
              height={550}
              data={data2}
              className="card my-5 col-xl-12 col-md-6 mb-4 barchart-custom2"
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="value" fill="#dc3545" />
            </BarChart>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
