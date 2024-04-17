import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import "./App.scss";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login/Login";
import Signup from "./Auth/Signup/Signup";
import ManageAccount from "./Auth/ManageAccount/ManageAccount";
import History from "./Auth/History/History";
import System from "../routes/System";
import HomePage from "./HomePage/Home/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import MoreDoctor from "../containers/HomePage/Section/MoreDoctor/MoreDoctor";
import MoreSpecialty from "../containers/HomePage/Section/MoreSpecialty/MoreSpecialty";
import MoreClinic from "../containers/HomePage/Section/MoreClinic/MoreClinic";
import ScaleLoader from "react-spinners/ScaleLoader";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <Fragment>
        <BrowserRouter>
          <div className="main-container">
            <div className="content-container">
              <div className={`loader-container ${isLoading ? "show" : ""}`}>
                <ScaleLoader
                  color="#4fe12b"
                  height={50}
                  margin={2}
                  radius={2}
                  speedMultiplier={1}
                  width={4}
                />
              </div>
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.SIGNUP} exact component={Signup} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />

                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={path.DOCTOR}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    component={DetailSpecialty}
                  />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route path={path.MORE_DOCTOR} component={MoreDoctor} />
                  <Route path={path.MORE_SPECIALTY} component={MoreSpecialty} />
                  <Route path={path.MORE_CLINIC} component={MoreClinic} />
                  <Route path={path.ACCOUNT} component={ManageAccount} />
                  <Route path={path.HISTORY_BOOKING} component={History} />
                </Switch>
              </CustomScrollbars>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    isLoading: state.user.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
