import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/Home/HomeHeader";
class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    //JSX
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div>helo</div>;
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
