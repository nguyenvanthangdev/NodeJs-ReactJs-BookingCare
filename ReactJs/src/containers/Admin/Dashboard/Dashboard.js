import React, { Component } from "react";
//import { FormattedMessage } from "react-intl";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";
import { connect } from "react-redux";
import "./Dashboard.scss";
// import { getAllUsers, countUser } from "../../../services/userService";
// // import { emitter } from "../../../utils/emitter";
// import { getAllPayRate, SumPayRates } from "../../../services/payRatesServices";
// import {
//   getAllPersonal,
//   CountPersonalGenderFemale,
//   CountPersonalGenderMale,
//   CountShareholderStatus,
// } from "../../../services/personalServices";
// import { getAll, SumVacationDays } from "../../../services/employeeServices";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // arrUsers: [],
      // arrPayRates: [],
      // arrPersonal: [],
      // userCount: 0,
      // sumPayRates: 0,
      // MaleCount: 0,
      // FemaleCount: 0,
      // shareholderStatusCount: 0,
      // arrVacationDays: [],
      // sumVacationDays: 0,
    };
  }

  async componentDidMount() {
    // await this.getAllUsersFromReact();
    // await this.getAllPayRatesFromReact();
    // await this.getAllPersonalFromReact();
    // await this.getAllEmployeeFromReact();
  }

  // getAllUsersFromReact = async () => {
  //   let response = await getAllUsers("ALL");
  //   if (response && response.errCode === 0) {
  //     await this.getCountUser();
  //     this.setState({
  //       arrUsers: response.users,
  //     });
  //   }
  // };
  // getCountUser = async () => {
  //   try {
  //     let response = await countUser();
  //     this.setState({
  //       userCount: response.count,
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // getAllPayRatesFromReact = async () => {
  //   let response = await getAllPayRate("ALL");
  //   if (response && response.errCode === 0) {
  //     await this.getSumPayRates();
  //     this.setState({
  //       arrPayRates: response.users,
  //     });
  //   }
  // };
  // getSumPayRates = async () => {
  //   try {
  //     let response = await SumPayRates();
  //     this.setState({
  //       sumPayRates: response.sum,
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // getAllPersonalFromReact = async () => {
  //   let response = await getAllPersonal("ALL");
  //   if (response && response.errCode === 0) {
  //     await this.getCountPersonalGenderFemale();
  //     await this.getCountPersonalGenderMale();
  //     await this.getCountShareholderStatus();

  //     this.setState({
  //       arrPersonal: response.users,
  //     });
  //   }
  // };
  // getCountPersonalGenderFemale = async () => {
  //   try {
  //     let response = await CountPersonalGenderFemale();
  //     this.setState({
  //       FemaleCount: response.count,
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // getCountPersonalGenderMale = async () => {
  //   try {
  //     let response = await CountPersonalGenderMale();
  //     this.setState({
  //       MaleCount: response.count,
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // getCountShareholderStatus = async () => {
  //   try {
  //     let response = await CountShareholderStatus();
  //     this.setState({
  //       shareholderStatusCount: response.count,
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // getAllEmployeeFromReact = async () => {
  //   let response = await getAll("ALL");
  //   if (response && response.errCode === 0) {
  //     await this.getSumVacationDays();
  //     this.setState({
  //       arrVacationDays: response.users,
  //     });
  //   }
  // };
  // getSumVacationDays = async () => {
  //   try {
  //     let response = await SumVacationDays();
  //     this.setState({
  //       sumVacationDays: response.sum,
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  render() {
    // const data = [
    //   { name: "Jan", value: 20 },
    //   { name: "Feb", value: 30 },
    //   { name: "Mar", value: 35 },
    //   { name: "Apr", value: 45 },
    //   { name: "May", value: 50 },
    //   { name: "Jun", value: 40 },
    //   { name: "Jul", value: 55 },
    //   { name: "Aug", value: 60 },
    //   { name: "Sep", value: 70 },
    //   { name: "Oct", value: 65 },
    //   { name: "Nov", value: 75 },
    //   { name: "Dec", value: 80 },
    // ];
    return (
      <>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4 my-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-danger mb-1 h4">
                        User
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* {this.state.userCount} */}
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
                        Pay Rates
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* $ {this.state.sumPayRates} */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
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
                        Male Gender
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* {this.state.MaleCount} */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-mars fa-2x text-gray-300"></i>
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
                        Female Gender
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* {this.state.FemaleCount} */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-venus fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-muted mb-1 h4">
                        Vacation Days
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* {this.state.sumVacationDays} */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa-2x text-gray-300 font-weight-bold">Zz</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-dark mb-1 h4">
                        Shareholder Status
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {/* {this.state.shareholderStatusCount} */}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-user fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <LineChart
            width={1850}
            height={400}
            data={data}
            className="card shadow my-5 col-xl-12 col-md-6 mb-4  "
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f72585"
              isFullWidth
            />
          </LineChart> */}
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
