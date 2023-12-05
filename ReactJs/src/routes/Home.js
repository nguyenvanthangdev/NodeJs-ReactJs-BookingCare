import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { USER_ROLE } from "../utils";
import { withRouter } from "react-router";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }
  render() {
    const { isLoggedIn } = this.props;
    const userInfo = this.props.userInfo;

    if (isLoggedIn) {
      if (userInfo && userInfo.roleId === USER_ROLE.ADMIN) {
        return <Redirect to={"/system/user-manage"} />;
      } else if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
        return <Redirect to={"/system/manage-booking"} />;
      } else {
        return <Redirect to={"/home"} />;
      }
    } else return <Redirect to={"/home"} />;
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
