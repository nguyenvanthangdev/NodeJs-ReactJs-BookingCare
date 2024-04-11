import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/Home/HomeHeader";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    //console.log("state", this.state);

    return (
      <React.Fragment>
        <HomeHeader />
        <div>helo</div>
      </React.Fragment>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
