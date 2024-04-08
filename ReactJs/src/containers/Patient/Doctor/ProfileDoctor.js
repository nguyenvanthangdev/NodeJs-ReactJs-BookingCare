import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProfileDoctor.scss";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    return <>helo</>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
