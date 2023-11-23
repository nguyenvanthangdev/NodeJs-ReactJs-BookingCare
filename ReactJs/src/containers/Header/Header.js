import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="oheader-tabs-container">
          <nav className="navbar navbar-light bg-light mx-3">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button">
                <i className="navbar-toggler-icon"></i>
              </button>
            </div>
          </nav>
          <Navigator menus={adminMenu} />
        </div>
        {/* nút logout */}
        <form className="d-flex">
          <input
            className="form-control me-2 my-3"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success mx-3 px-4" type="#">
            Search
          </button>
          <div className="languages">
            <span className="welcome">
              <span className="mx-2">
                <FormattedMessage id="home-header.welcome" />
              </span>
              <span className="text">
                {userInfo && userInfo.firstName ? userInfo.firstName : " "}
              </span>
            </span>
            <span
              className={
                language === LANGUAGES.VI ? "language-vi active" : "language-vi"
              }
              onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
            >
              VN
            </span>
            <span
              className={
                language === LANGUAGES.EN ? "language-en active" : "language-en"
              }
              onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>
          <div
            className="btn btn-outline-success mx-3 px-4 logout-button"
            onClick={processLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
