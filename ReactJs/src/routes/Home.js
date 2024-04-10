import { Component } from "react";
import { connect } from "react-redux";
import { USER_ROLE } from "../utils";
import { withRouter } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      isLoggedIn: false,
    };
  }

  render() {
    const { isLoggedIn, userInfo } = this.props;
    if (isLoggedIn) {
      if (userInfo && userInfo.roleId === USER_ROLE.ADMIN) {
        return <Route render={() => <Redirect to={"/system/dashboard"} />} />;
      } else if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
        return (
          <Route render={() => <Redirect to={"/doctor/manage-schedule"} />} />
        );
      } else {
        return (
          <Switch>
            <Route render={() => <Redirect to={"/home"} />} />
          </Switch>
        );
      }
    } else {
      return <Route render={() => <Redirect to={"/home"} />} />;
    }
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
