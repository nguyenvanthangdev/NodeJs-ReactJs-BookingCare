import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/Admin/User/UserManage";
import Dashboard from "../containers/System/Dashboard/Dashboard";
import UserRedux from "../containers/System/Admin/UserRedux/UserRedux";
import ManageDoctor from "../containers/System/Doctor/ManageDoctor/ManageDoctor";
import Header from "../containers/Header/Header";
import { USER_ROLE } from "../utils";
import { withRouter } from "react-router";

class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      isLoggedIn: false,
    };
  }

  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.isLoggedIn !== prevProps.isLoggedIn ||
  //     this.props.userInfo !== prevProps.userInfo
  //   ) {
  //     this.setState({
  //       isLoggedIn: this.props.isLoggedIn,
  //       userInfo: this.props.userInfo,
  //     });
  //   }
  // }
  render() {
    const { systemMenuPath, isLoggedIn, userInfo } = this.props;

    if (isLoggedIn && userInfo && userInfo.roleId === USER_ROLE.ADMIN) {
      return (
        <React.Fragment>
          <Header />
          <div className="system-container">
            <div className="system-list">
              <Switch>
                <Route path="/system/dashboard" component={Dashboard} />
                <Route path="/system/user-manage" component={UserManage} />
                <Route path="/system/user-redux" component={UserRedux} />
                <Route path="/system/manage-doctor" component={ManageDoctor} />
                <Route render={() => <Redirect to={systemMenuPath} />} />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (isLoggedIn && userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
      return <Redirect to="/doctor/manage-schedule" />;
    } else {
      return this.props.history.goBack();
    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(System));
