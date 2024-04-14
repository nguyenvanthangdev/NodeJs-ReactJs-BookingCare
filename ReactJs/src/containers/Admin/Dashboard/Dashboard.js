import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

// import { LANGUAGES } from "../../../utils";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    // let language = this.props.language;
    return <div>Helo</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
