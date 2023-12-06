import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { withRouter } from "react-router";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      } else {
        this.props.history.push(`/home`);
        return;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  goToLogOut = () => {
    let { processLogout } = this.props;
    if (this.props.history) {
      this.props.history.push(`/login`);
      processLogout();
    }
  };
  render() {
    const { language, userInfo } = this.props;

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
          <Navigator menus={this.state.menuApp} />
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
            onClick={() => this.goToLogOut()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
