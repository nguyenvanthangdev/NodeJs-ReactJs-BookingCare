import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
//Redirect
import { withRouter } from "react-router";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/Admin/Schedule/ManageSchedule";
import { USER_ROLE } from "../utils";
class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      isLoggedIn: false,
    };
  }

  render() {
    const { isLoggedIn, userInfo } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            {(isLoggedIn === true &&
              userInfo &&
              userInfo.roleId === USER_ROLE.DOCTOR) ||
            (isLoggedIn === true &&
              userInfo &&
              userInfo.roleId === USER_ROLE.ADMIN) ? (
              <Switch>
                <Route
                  path="/doctor/manage-schedule"
                  component={ManageSchedule}
                />
                <Route
                  component={() => {
                    return <Redirect to={"/doctor/manage-schedule"} />;
                  }}
                />
              </Switch>
            ) : (
              this.props.history.goBack()
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
